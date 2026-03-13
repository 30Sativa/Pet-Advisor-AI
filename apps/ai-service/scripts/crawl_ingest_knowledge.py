import asyncio
import hashlib
import json
import os
import datetime
import re
import time
from typing import List

from crawl4ai import AsyncWebCrawler
from openai import OpenAI
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.models_gen import KnowledgeSources, KnowledgeChunks, CrawlLogs

from dotenv import load_dotenv


import httpx
from bs4 import BeautifulSoup
import tiktoken


# =============================
# LOAD ENV (Nạp biến môi trường)
# =============================

load_dotenv()

if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("❌ OPENAI_API_KEY not found in .env")

# Khởi tạo OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# =============================
# CONFIG (Các thông số cấu hình)
# =============================

EMBEDDING_MODEL = "text-embedding-3-small"          # Model tạo embedding
EMBEDDING_VERSION = 1                                # Phiên bản pipeline embedding (để sau này nâng cấp)
MAX_TOKENS = 800                                      # Số token tối đa cho mỗi chunk
OVERLAP_TOKENS = 100                                  # Số token chồng lấn giữa các chunk
BATCH_EMBED_SIZE = 100                                # Số lượng chunk gửi trong một lần gọi API embedding (OpenAI cho phép tối đa 2048)
CRAWL_CONCURRENCY = 10                                # Số URL crawl song song tối đa
EMBED_MAX_RETRIES = 3                                 # Số lần thử lại khi gọi API embedding thất bại
BROWSER_RESET_INTERVAL = 100                          # Sau mỗi 100 URL, khởi tạo lại trình duyệt để tránh rò rỉ bộ nhớ
CRAWL_TIMEOUT = 30                                    # Thời gian tối đa chờ crawl một URL (giây)

# Bộ mã hóa token dùng chung cho tất cả model OpenAI hiện đại (cl100k_base)
tokenizer = tiktoken.get_encoding("cl100k_base")


# =============================
# HÀM LẤY TẤT CẢ LINK BÀI VIẾT TỪ MERCK (ASYNC)
# =============================

def _extract_links_from_next_data(html: str, base_url: str) -> set:
    """
    Trích xuất link bài viết từ JSON __NEXT_DATA__ được nhúng trong HTML.
    Phương pháp này hoạt động vì Next.js luôn chèn dữ liệu trang vào thẻ <script id="__NEXT_DATA__">,
    ngay cả khi link không được render dưới dạng thẻ <a> trong HTML tĩnh.
    """
    soup = BeautifulSoup(html, "html.parser")
    script_tag = soup.find("script", {"id": "__NEXT_DATA__"})

    if not script_tag or not script_tag.string:
        return set()

    try:
        next_data = json.loads(script_tag.string)
    except json.JSONDecodeError:
        return set()

    # Đệ quy tìm tất cả chuỗi chứa đường dẫn bài viết
    links = set()
    # Xác định tiền tố path dựa vào base_url (dog-owners hay cat-owners)
    path_prefix = "/dog-owners/" if "dog-owners" in base_url else "/cat-owners/"

    def _walk(obj):
        if isinstance(obj, str):
            if path_prefix in obj and not obj.endswith(path_prefix.rstrip("/")):
                # Làm sạch đường dẫn
                path = obj.strip()
                if path.startswith("/"):
                    path = "https://www.merckvetmanual.com" + path
                if path.startswith("https://www.merckvetmanual.com"):
                    # Lọc bỏ quiz, video, anchor
                    if "quiz" not in path and "video" not in path and "#" not in path:
                        links.add(path)
        elif isinstance(obj, dict):
            for v in obj.values():
                _walk(v)
        elif isinstance(obj, list):
            for item in obj:
                _walk(item)

    _walk(next_data)
    return links


def _extract_links_from_html(html: str, base_url: str) -> set:
    """
    Phương án dự phòng: trích xuất link từ các thẻ <a> trong HTML đã được render.
    Dùng khi phương pháp __NEXT_DATA__ không hiệu quả.
    """
    soup = BeautifulSoup(html, "html.parser")
    links = set()
    path_prefix = "/dog-owners/" if "dog-owners" in base_url else "/cat-owners/"

    for a in soup.find_all("a"):
        href = a.get("href")
        if not href:
            continue

        if path_prefix in href:
            # Bỏ qua các link chỉ đến trang chủ của chuyên mục
            if href.endswith("dog-owners") or href.endswith("cat-owners"):
                continue

            if href.startswith("/"):
                href = "https://www.merckvetmanual.com" + href

            if (
                href.startswith("https://www.merckvetmanual.com")
                and "quiz" not in href
                and "video" not in href
                and "#" not in href
            ):
                links.add(href)

    return links


async def get_merck_all_links(base_url: str):
    """
    Lấy tất cả link bài viết từ chuyên mục của Merck Vet Manual.
    Chiến lược:
      1. Dùng httpx lấy HTML tĩnh → parse __NEXT_DATA__ JSON (nhanh, không cần trình duyệt)
      2. Nếu thất bại, dùng crawl4ai render bằng trình duyệt → parse thẻ <a>
    """
    print(f"🔎 Scanning: {base_url}")

    links = set()

    # --- Chiến lược 1: Parse __NEXT_DATA__ từ HTML tĩnh ---
    try:
        async with httpx.AsyncClient(
            timeout=30,
            follow_redirects=True,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        ) as client_http:
            res = await client_http.get(base_url)

        links = _extract_links_from_next_data(res.text, base_url)

        if links:
            print(f"✅ Found {len(links)} articles (via __NEXT_DATA__)")
            return list(links)
        else:
            print("⚠️ __NEXT_DATA__ yielded 0 links, trying fallback...")

    except Exception as e:
        print(f"⚠️ httpx fetch failed: {e}, trying fallback...")

    # --- Chiến lược 2: Dùng crawl4ai render bằng trình duyệt ---
    try:
        async with AsyncWebCrawler() as crawler:
            result = await crawler.arun(url=base_url)

            if result and result.html:
                links = _extract_links_from_html(result.html, base_url)

        if links:
            print(f"✅ Found {len(links)} articles (via crawl4ai browser)")
        else:
            print("❌ Could not find any article links even with browser rendering")

    except Exception as e:
        print(f"❌ crawl4ai fallback also failed: {e}")

    return list(links)


# =============================
# CÁC HÀM TIỆN ÍCH XỬ LÝ VĂN BẢN
# =============================

def compute_hash(text: str) -> str:
    """Tạo SHA-256 hash của văn bản để phát hiện trùng lặp."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def clean_text(text: str) -> str:
    """
    Loại bỏ các phần nhiễu (references, disclaimer, footer, ...) khỏi markdown đã crawl
    để nâng cao chất lượng RAG.
    """
    # Các pattern nhiễu phổ biến (không phân biệt hoa thường, multiline)
    noise_patterns = [
        r"(?i)#+\s*references.*?(?=\n#+|\Z)",
        r"(?i)#+\s*disclaimer.*?(?=\n#+|\Z)",
        r"(?i)#+\s*copyright.*?(?=\n#+|\Z)",
        r"(?i)#+\s*also see.*?(?=\n#+|\Z)",
        r"(?i)#+\s*for more information.*?(?=\n#+|\Z)",
        r"(?i)#+\s*resources.*?(?=\n#+|\Z)",
        r"(?i)© \d{4}.*?(?:\n|$)",
        r"(?i)all rights reserved\.?",
        r"(?i)merck & co\.,.*?(?:\n|$)",
    ]

    for pattern in noise_patterns:
        text = re.sub(pattern, "", text, flags=re.DOTALL)

    # Xóa dòng trống quá nhiều
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def _classify_topic_from_url(url: str) -> str:
    """
    Tự động phân loại chủ đề bài viết dựa trên đường dẫn URL.
    Ví dụ: /dog-owners/digestive-disorders-of-dogs/vomiting-in-dogs → 'digestive-disorders'
    """
    topic_mapping = {
        "nutrition": "nutrition",
        "diet": "nutrition",
        "feeding": "nutrition",
        "food": "nutrition",
        "symptom": "symptoms",
        "sign": "symptoms",
        "treatment": "treatment",
        "therap": "treatment",
        "drug": "drugs",
        "medication": "drugs",
        "vaccine": "prevention",
        "prevent": "prevention",
        "diagnosis": "diagnosis",
        "test": "diagnosis",
        "surgery": "surgery",
        "emergency": "emergency",
        "poison": "emergency",
        "toxic": "emergency",
        "behavior": "behavior",
        "train": "behavior",
        "breed": "breeds",
        "groom": "grooming",
        "dental": "dental",
        "teeth": "dental",
        "skin": "skin-disorders",
        "ear": "ear-disorders",
        "eye": "eye-disorders",
        "heart": "heart-disorders",
        "lung": "respiratory",
        "respirat": "respiratory",
        "kidney": "kidney-urinary",
        "urinar": "kidney-urinary",
        "liver": "liver-disorders",
        "bone": "musculoskeletal",
        "joint": "musculoskeletal",
        "muscle": "musculoskeletal",
        "brain": "neurological",
        "nerv": "neurological",
        "seizure": "neurological",
        "cancer": "cancer",
        "tumor": "cancer",
        "disorder": "disorders",
        "disease": "disorders",
        "infect": "infections",
        "parasit": "parasites",
        "worm": "parasites",
        "flea": "parasites",
        "tick": "parasites",
    }

    url_lower = url.lower()

    # Sắp xếp keyword theo độ dài giảm dần để keyword dài hơn được ưu tiên (ví dụ 'heartworm' trước 'heart')
    for keyword, topic in sorted(topic_mapping.items(), key=lambda x: -len(x[0])):
        if keyword in url_lower:
            return topic

    return "general"


def chunk_text_smart(
    text: str,
    max_tokens: int = MAX_TOKENS,
    overlap_tokens: int = OVERLAP_TOKENS
) -> List[dict]:
    """
    Chia văn bản thành các chunk với số token chính xác, có overlap và cố gắng cắt tại biên câu.
    Trả về list các dict chứa: index, content, token_count, hash.
    """
    tokens = tokenizer.encode(text)
    chunks = []

    start = 0
    idx = 0

    while start < len(tokens):
        end = min(start + max_tokens, len(tokens))
        chunk_tokens = tokens[start:end]

        chunk_text = tokenizer.decode(chunk_tokens)

        # ===== Cố gắng cắt tại biên câu =====
        if end < len(tokens):
            # Lấy ~120 token cuối của chunk để tìm dấu câu
            search_text = tokenizer.decode(chunk_tokens[-120:])

            for punct in [". ", "! ", "? ", "\n\n", "\n"]:
                pos = search_text.rfind(punct)
                if pos > len(search_text) // 2:  # Chỉ chấp nhận nếu dấu câu nằm ở nửa sau
                    trunc = search_text[:pos + len(punct)]
                    # Giữ lại phần đầu của chunk và thêm phần đã cắt
                    chunk_text = tokenizer.decode(chunk_tokens[:-120]) + trunc
                    chunk_tokens = tokenizer.encode(chunk_text)
                    end = start + len(chunk_tokens)
                    break

        chunks.append({
            "index": idx,
            "content": chunk_text.strip(),
            "token_count": len(chunk_tokens),
            "hash": compute_hash(chunk_text),
        })

        idx += 1
        # Dịch start về sau, trừ đi overlap (nếu chưa phải chunk cuối)
        start = end - overlap_tokens if end < len(tokens) else end

    return chunks


def is_cookie_blocked(text: str) -> bool:
    """Kiểm tra xem nội dung có phải là trang chặn cookie không."""
    lower = text.lower()

    indicators = [
        "accept cookies",
        "cookie preferences",
        "your privacy choices",
        "manage cookies",
        "we use cookies",
    ]

    score = sum(1 for i in indicators if i in lower)
    return score >= 2


# =============================
# HÀM CORE: CRAWL VÀ XỬ LÝ TỪNG URL
# =============================

def _batch_embed(texts: List[str]) -> List[list]:
    """
    Gửi nhiều văn bản cùng lúc tới OpenAI API để lấy embedding.
    Tự động chia batch theo BATCH_EMBED_SIZE và thử lại khi gặp lỗi (rate limit, network).
    """
    all_embeddings = []

    for i in range(0, len(texts), BATCH_EMBED_SIZE):
        batch = texts[i:i + BATCH_EMBED_SIZE]

        for attempt in range(EMBED_MAX_RETRIES):
            try:
                response = client.embeddings.create(
                    model=EMBEDDING_MODEL,
                    input=batch
                )
                # OpenAI trả về embedding theo đúng thứ tự đầu vào
                all_embeddings.extend([item.embedding for item in response.data])
                break
            except Exception as e:
                if attempt == EMBED_MAX_RETRIES - 1:
                    raise  # Lần thử cuối vẫn lỗi thì raise
                wait_time = 2 ** attempt
                print(f"⚠️ Embed retry {attempt + 1}/{EMBED_MAX_RETRIES} after {wait_time}s: {e}")
                time.sleep(wait_time)

    return all_embeddings


async def crawl_and_process_url(crawler: AsyncWebCrawler, url: str):
    """
    Crawl một URL, làm sạch nội dung, chunk, tạo embedding và lưu vào DB.
    Mỗi lần gọi tạo một session DB riêng để an toàn với asyncio.

    Chiến lược commit:
      1. Commit source NGAY sau khi tạo → đảm bảo source tồn tại dù embedding có thất bại
      2. Batch embedding tất cả chunk trong 1 lần gọi API → nhanh hơn 10-20 lần
      3. Commit các chunk → lưu tiến trình từng phần (partial progress)
    """
    db = SessionLocal()
    print(f"🚀 Crawling: {url}")

    try:
        # Crawl với timeout
        result = await asyncio.wait_for(
            crawler.arun(url=url),
            timeout=CRAWL_TIMEOUT
        )

        if not result or not result.markdown:
            raise ValueError("Empty crawl result")

        # Làm sạch nội dung
        raw_text = clean_text(result.markdown.strip())

        if len(raw_text) < 200:
            raise ValueError("Content too short")

        if is_cookie_blocked(raw_text):
            raise ValueError("Blocked by cookie banner")

        # ===== Kiểm tra trùng lặp nội dung (dùng hash toàn văn bản) =====
        content_hash = compute_hash(raw_text)

        existing = db.query(KnowledgeSources).filter_by(content_hash=content_hash).first()

        if existing:
            print(f"⚠️ Duplicate: {url}")
            db.add(CrawlLogs(url=url, status="skipped", source_id=existing.id))
            db.commit()
            return

        # ===== Tạo và commit source NGAY (dù các bước sau có lỗi, source vẫn được lưu) =====
        source = KnowledgeSources(
            title=result.metadata.get("title", url.split("/")[-1].replace("-", " ").title()),
            source_type="article",
            url=url,
            content_hash=content_hash,
            metadata={
                "crawled_at": datetime.datetime.now().isoformat(),
                "crawler": "crawl4ai",
            },
        )

        try:
            db.add(source)
            db.commit()
            db.refresh(source)
        except IntegrityError:
            # Trường hợp race condition: worker khác đã chèn content_hash này trước đó
            db.rollback()
            print(f"⚠️ Duplicate (race): {url}")
            try:
                db.add(CrawlLogs(url=url, status="skipped"))
                db.commit()
            except Exception:
                db.rollback()
            return

        # ===== Chunk và phân loại chủ đề =====
        topic = _classify_topic_from_url(url)
        chunks_data = chunk_text_smart(raw_text)

        # ===== Batch embedding: 1 lần gọi API cho tất cả chunk =====
        chunk_texts = [c["content"] for c in chunks_data]
        embeddings = _batch_embed(chunk_texts)

        # ===== Lưu các chunk, bỏ qua những chunk đã tồn tại (dựa trên chunk_hash) =====
        # Truy vấn một lần tất cả hash của các chunk đã có từ URL này
        existing_hashes = {
            row[0]
            for row in db.query(KnowledgeChunks.chunk_hash)
            .filter(KnowledgeChunks.source_url == url)
            .all()
        }

        saved_count = 0
        for chunk_data, embedding in zip(chunks_data, embeddings):
            if chunk_data["hash"] in existing_hashes:
                continue  # chunk đã tồn tại, bỏ qua

            chunk = KnowledgeChunks(
                source_id=source.id,
                chunk_index=chunk_data["index"],
                chunk_hash=chunk_data["hash"],
                content=chunk_data["content"],
                embedding=embedding,
                embedding_model=EMBEDDING_MODEL,
                embedding_version=EMBEDDING_VERSION,
                token_count=chunk_data["token_count"],
                source_url=url,
                is_active=True,
                metadata={"topic": topic},
            )
            db.add(chunk)
            saved_count += 1

        # ===== Cập nhật số lượng chunk cho source và tạo log thành công =====
        source.chunk_count = saved_count

        db.add(CrawlLogs(url=url, status="success", source_id=source.id))
        db.commit()

        skipped = len(chunks_data) - saved_count
        skip_msg = f", {skipped} duplicate skipped" if skipped else ""
        print(f"✅ Success: {saved_count} chunks (batch embedded{skip_msg})")

    except Exception as e:
        # Nếu có lỗi, rollback mọi thay đổi (source đã commit trước đó vẫn giữ)
        db.rollback()

        error_msg = str(e)[:500]

        print(f"❌ Error: {url} - {error_msg}")

        try:
            # Ghi log lỗi (không liên kết source_id vì source có thể chưa được tạo)
            db.add(CrawlLogs(url=url, status="failed", error=error_msg))
            db.commit()
        except Exception:
            db.rollback()

    finally:
        db.close()


# =============================
# HÀM CHẠY CHÍNH (RUNNER)
# =============================

def _get_already_crawled_urls() -> set:
    """
    Truy vấn DB để lấy các URL đã crawl thành công (chunk_count > 0).
    Các URL có chunk_count = 0 hoặc NULL được coi là chưa hoàn chỉnh (embedding lỗi) và sẽ được thử lại.
    """
    db = SessionLocal()
    try:
        existing = (
            db.query(KnowledgeSources.url)
            .filter(KnowledgeSources.chunk_count > 0)
            .all()
        )
        return {row[0] for row in existing}
    finally:
        db.close()


async def main():
    # Bước 1: Lấy tất cả link từ chuyên mục dog và cat
    urls = []
    urls += await get_merck_all_links("https://www.merckvetmanual.com/dog-owners")
    urls += await get_merck_all_links("https://www.merckvetmanual.com/cat-owners")

    urls = list(set(urls))  # Loại bỏ trùng lặp

    print(f"🔥 TOTAL URLS found: {len(urls)}")

    # Bước 2: Lọc ra những URL chưa được crawl (hoặc crawl chưa hoàn chỉnh)
    already_crawled = _get_already_crawled_urls()
    urls = [u for u in urls if u not in already_crawled]

    print(f"🆕 NEW URLS to crawl: {len(urls)} (skipped {len(already_crawled)} already crawled)")

    if not urls:
        print("✅ All URLs already crawled. Nothing to do.")
        return

    # Bước 3: Crawl song song, giới hạn số lượng đồng thời bằng semaphore
    sem = asyncio.Semaphore(CRAWL_CONCURRENCY)
    completed = 0
    failed = 0
    total = len(urls)

    async def safe_crawl(crawler: AsyncWebCrawler, url: str):
        """Bọc crawl_and_process_url với semaphore và cập nhật tiến độ."""
        nonlocal completed, failed
        async with sem:
            await crawl_and_process_url(crawler, url)
            completed += 1
            if completed % 50 == 0 or completed == total:
                print(f"📊 Progress: {completed}/{total} (failed: {failed})")

    # Chia URL thành các batch, sau mỗi batch khởi tạo lại trình duyệt để tránh rò rỉ bộ nhớ
    for batch_start in range(0, len(urls), BROWSER_RESET_INTERVAL):
        batch = urls[batch_start:batch_start + BROWSER_RESET_INTERVAL]
        batch_num = batch_start // BROWSER_RESET_INTERVAL + 1
        total_batches = (len(urls) + BROWSER_RESET_INTERVAL - 1) // BROWSER_RESET_INTERVAL

        print(f"\n🔄 Browser batch {batch_num}/{total_batches} ({len(batch)} URLs)")

        async with AsyncWebCrawler() as crawler:
            tasks = [safe_crawl(crawler, url) for url in batch]
            # Dùng gather để chạy đồng thời các task trong batch
            results = await asyncio.gather(*tasks, return_exceptions=True)

            # Ghi nhận các task bị lỗi (exception) từ gather
            for i, result in enumerate(results):
                if isinstance(result, Exception):
                    failed += 1
                    print(f"⚠️ Task exception for {batch[i]}: {result}")

    print(f"\n🎉 Done! Completed: {completed}, Failed: {failed}, Total: {total}")


if __name__ == "__main__":
    asyncio.run(main())