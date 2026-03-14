import Link from "next/link";
import { BrandMark } from "@/app/_components/brand-mark";
import { LeadForm } from "@/app/_components/lead-form";

export default function Home() {
  return (
    <div className="bg-white text-ink">
      <header className="site-container flex h-20 items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
          <a href="#pillars" className="hover:text-ink">
            Trụ cột
          </a>
          <a href="#features" className="hover:text-ink">
            Tính năng
          </a>
          <a href="#insights" className="hover:text-ink">
            Tầm nhìn
          </a>
          <a href="#lead" className="hover:text-ink">
            Tham gia
          </a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link className="btn btn-ghost" href="/app">
            Trải nghiệm web app
          </Link>
          <a className="btn btn-primary" href="#lead">
            Tham gia early adopter
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" />
        <div className="site-container section grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-8">
            <div className="badge">Pet Health Companion Platform</div>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Nền tảng số hóa hệ sinh thái thú cưng tại Việt Nam
            </h1>
            <p className="text-lg text-ink/70 md:text-xl">
              PetOmni chuyển chăm sóc thú cưng từ bị động sang chủ động bằng AI
              sàng lọc sớm, hồ sơ sức khỏe số và nhắc lịch thông minh.
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="btn btn-primary" href="#lead">
                Tham gia early adopter
              </a>
              <Link className="btn btn-outline" href="/app">
                Trải nghiệm web app
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-ink/60">
              <div>
                <p className="text-2xl font-semibold text-ink">+30%</p>
                <p>Tăng tỷ lệ theo dõi sức khỏe</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink">24/7</p>
                <p>AI sàng lọc triage</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink">1 hồ sơ</p>
                <p>Dùng chung nhiều phòng khám</p>
              </div>
            </div>
          </div>
          <div className="card relative overflow-hidden p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between text-sm text-ink/60">
              <span>AI Triage Snapshot</span>
              <span className="badge">Normal</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border bg-surface-2 p-4 text-sm text-ink/70">
                “Bé cún nhà em bỏ ăn 2 ngày, có nên đi khám ngay không?”
              </div>
              <div className="rounded-2xl border border-brand/20 bg-brand/10 p-4 text-sm text-ink">
                AI: Theo dõi thêm 24h, kiểm tra nhiệt độ và mức nước uống. Nếu
                nôn hoặc lừ đừ, nên đi khám sớm.
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-xs text-ink/60">Intent</p>
                  <p className="font-semibold">Triệu chứng</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-xs text-ink/60">Recommendation</p>
                  <p className="font-semibold">Theo dõi tại nhà</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pillars" className="section bg-surface-2">
        <div className="site-container space-y-10">
          <div className="space-y-4">
            <p className="badge">4 trụ cột giải pháp</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Sổ sức khỏe + Trợ lý AI + Kết nối phòng khám + Quản lý chi phí
            </h2>
            <p className="text-lg text-ink/70">
              PetOmni xây dựng hệ sinh thái dùng chung, lấy chủ nuôi làm trung
              tâm, giúp phòng khám vận hành hiệu quả hơn.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Health Hub & OCR",
                desc: "Số hóa sổ tiêm, hóa đơn và đơn thuốc bằng AI OCR. Nhập nhanh, ít sai sót.",
              },
              {
                title: "AI Pet Assistant",
                desc: "AI hiểu ngữ cảnh hồ sơ, sàng lọc mức độ nguy hiểm và hướng dẫn hành động.",
              },
              {
                title: "Search Nearby & Trust",
                desc: "Tìm phòng khám, spa, pet shop uy tín với review xác thực.",
              },
              {
                title: "Payments & Cost Tracking",
                desc: "Ghi nhận chi phí chăm sóc, QR thanh toán và báo cáo minh bạch.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="site-container grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-4">
            <p className="badge">AI Pet Assistant</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Triage rõ ràng, quyết định nhanh hơn
            </h2>
            <p className="text-lg text-ink/70">
              AI không chẩn đoán bệnh. Hệ thống tập trung sàng lọc mức độ nguy
              hiểm, gợi ý hành động phù hợp và chuẩn bị thông tin cho bác sĩ.
            </p>
            <ul className="space-y-3 text-sm text-ink/70">
              <li>Low: Hướng dẫn chăm sóc tại nhà, gợi ý sản phẩm.</li>
              <li>Medium: Gợi ý chat bác sĩ hoặc đặt lịch khám.</li>
              <li>High/SOS: Gợi ý phòng khám gần nhất và hướng dẫn sơ cứu.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                label: "Low",
                title: "Theo dõi tại nhà",
                desc: "Checklist theo dõi, nhắc lịch tái kiểm tra.",
              },
              {
                label: "Medium",
                title: "Kết nối bác sĩ",
                desc: "Gợi ý tư vấn trực tuyến hoặc đặt lịch khám.",
              },
              {
                label: "High",
                title: "SOS khẩn cấp",
                desc: "Hiển thị phòng khám 24/7 gần nhất.",
              },
              {
                label: "Context-aware",
                title: "Đọc hồ sơ sẵn có",
                desc: "Không hỏi lại thông tin đã có, tăng độ chính xác.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <span className="badge">{item.label}</span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="insights" className="section bg-surface-2">
        <div className="site-container space-y-10">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="badge">Hệ sinh thái dùng chung</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                One Pet - One Shared Health Record
              </h2>
            </div>
            <p className="text-lg text-ink/70">
              Chủ nuôi sở hữu dữ liệu. Phòng khám chỉ truy cập khi được phân
              quyền. Hồ sơ sức khỏe được đồng bộ xuyên suốt hành trình chăm sóc.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Chuẩn hóa quy trình",
                desc: "Sổ tiêm, hồ sơ khám, đơn thuốc được số hóa và đồng bộ.",
              },
              {
                title: "Minh bạch chi phí",
                desc: "Bảng kê dịch vụ tự động, lịch sử chi phí rõ ràng.",
              },
              {
                title: "Tăng niềm tin",
                desc: "Đánh giá xác thực, kết nối phòng khám uy tín.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="card p-8">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Trải nghiệm web app ngay hôm nay
            </h2>
            <p className="mt-3 text-lg text-ink/70">
              Web app beta hỗ trợ quản lý thú cưng, chat AI và theo dõi vaccine.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/app">
                Mở web app
              </Link>
              <a className="btn btn-outline" href="#lead">
                Đăng ký early adopter
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <p className="text-sm text-ink/60">Tính năng đang có</p>
              <p className="mt-2 text-lg font-semibold">
                Pet profile - AI chat - Vaccine - Reminder
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-ink/60">Sắp ra mắt</p>
              <p className="mt-2 text-lg font-semibold">
                OCR hồ sơ · Map phòng khám · Theo dõi chi phí
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="lead" className="section bg-ink text-white">
        <div className="site-container grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="badge bg-white/10 text-white">Early Adopter</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Tham gia nhóm người dùng đầu tiên
            </h2>
            <p className="text-lg text-white/80">
              Nhận quyền truy cập sớm, góp ý tính năng và ưu đãi cho gói Premium.
            </p>
            <p className="text-sm text-white/70">
              AI không chẩn đoán bệnh và không thay thế bác sĩ thú y.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="site-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <BrandMark />
          <p className="text-sm text-ink/60">
            © 2026 AI PetOmni. Nền tảng số hóa hệ sinh thái thú cưng Việt Nam.
          </p>
        </div>
      </footer>
    </div>
  );
}
