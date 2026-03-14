from fastapi import APIRouter
from app.schemas.chat import ChatRequest
from app.services.urgency import check_urgency
from app.services.intent import detect_intent
from app.services.backend_client import get_basic_info
from app.services.context_checker import check_context
from app.services.rag_service import retrieve_chunks
from app.services.prompt_builder import build_prompt
from app.services.gpt_service import ask_gpt

router = APIRouter()

@router.post("/internal/chat")
async def chat(req: ChatRequest):

    # 1️ urgency
    urgency, skip = check_urgency(req.message)

    if skip:
        return {"text": "🚨 TRIỆU CHỨNG KHẨN CẤP", "urgency": urgency}

    # 2️ intent
    intent = detect_intent(req.message)

    #  chỉ vài intent mới cần context
    need_context = intent in ["nutrition", "symptom", "vaccine"]

    basic = None

    if need_context:

        # 3️ load BASIC
        basic = await get_basic_info(req.conversation_id)

        context_ok, missing = check_context(intent, basic)

        if not context_ok:
            return {
                "text": f"Mình cần thêm thông tin: {', '.join(missing)}",
                "intent": intent,
                "need_more_info": True
            }

    # 4️ RAG
    chunks = retrieve_chunks(req.message)

    # 5️ GPT
    prompt = build_prompt(req.message, chunks, basic)

    answer = ask_gpt(prompt)

    return {
        "text": answer,
        "urgency": urgency,
        "intent": intent
    }