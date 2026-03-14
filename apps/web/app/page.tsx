import type { CSSProperties } from "react";
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
        <div className="absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-brand/10 blur-[90px]" />
        <div className="site-container section grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-8 reveal-up">
            <div className="badge">Pet Health Companion Platform</div>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Nền tảng số hóa hệ sinh thái thú cưng tại Việt Nam
            </h1>
            <p className="text-lg text-ink/70 md:text-xl">
              PetOmni giúp chuyển chăm sóc thú cưng từ bị động sang chủ động bằng AI triage,
              hồ sơ sức khỏe số và nhắc lịch thông minh.
            </p>
            <ul className="grid gap-3 text-sm text-ink/70 md:text-base">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Cảnh báo sớm rủi ro sức khỏe
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Hồ sơ dùng chung đa phòng khám
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Nhắc lịch vaccine và điều trị
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a className="btn btn-primary" href="#lead">
                Tham gia early adopter
              </a>
              <Link className="btn btn-outline" href="/app">
                Trải nghiệm web app
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-ink/60">
              <span className="rounded-full border border-border bg-white px-3 py-1">
                24/7 AI triage
              </span>
              <span className="rounded-full border border-border bg-white px-3 py-1">
                Dữ liệu thuộc chủ nuôi
              </span>
              <span className="rounded-full border border-border bg-white px-3 py-1">
                Phù hợp mobile-first
              </span>
            </div>
          </div>
          <div className="relative reveal-up" style={{ "--delay": "120ms" } as CSSProperties}>
            <div className="absolute -top-6 right-6 hidden rounded-2xl border border-border bg-white px-4 py-3 text-xs text-ink/60 shadow-sm md:block">
              Đang phân tích triệu chứng...
            </div>
            <div className="absolute -bottom-8 left-6 hidden rounded-2xl border border-border bg-white px-4 py-3 text-xs text-ink/60 shadow-sm md:block">
              Gợi ý: theo dõi 24h
            </div>
            <div className="absolute inset-6 -z-10 rounded-[28px] bg-white/70 shadow-[0_30px_80px_rgba(15,118,110,0.18)] backdrop-blur" />
            <div className="card card-raise overflow-hidden p-4 shadow-[var(--shadow-soft)]">
              <img
                src="/hero-pet-health.svg"
                alt="Pet health assistant illustration"
                className="h-auto w-full rounded-[20px] bg-white"
              />
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
              PetOmni xây dựng hệ sinh thái dùng chung, lấy chủ nuôi làm trung tâm,
              giúp phòng khám vận hành hiệu quả hơn.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card card-raise md:col-span-2 p-6">
              <div className="flex flex-wrap items-center gap-4">
                <img src="/icon-pet-profile.svg" alt="Pet profile" className="h-14 w-14" />
                <div>
                  <h3 className="text-xl font-semibold">Health Hub + AI Triage</h3>
                  <p className="mt-2 text-sm text-ink/70">
                    Hồ sơ sức khỏe số tập trung, AI đọc ngữ cảnh để gợi ý hành động phù hợp.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface-2 p-4 text-sm text-ink/70">
                  OCR sổ tiêm nhanh
                </div>
                <div className="rounded-2xl border border-border bg-surface-2 p-4 text-sm text-ink/70">
                  Lịch nhắc cá nhân hóa
                </div>
                <div className="rounded-2xl border border-border bg-surface-2 p-4 text-sm text-ink/70">
                  Thông tin sẵn sàng cho bác sĩ
                </div>
              </div>
            </div>

            <div className="card card-raise p-6">
              <img src="/icon-health-ocr.svg" alt="Health OCR" className="h-14 w-14" />
              <h3 className="mt-4 text-lg font-semibold">Health Hub & OCR</h3>
              <p className="mt-2 text-sm text-ink/70">
                Số hóa sổ tiêm, hóa đơn và đơn thuốc bằng AI OCR.
              </p>
            </div>

            <div className="card card-raise p-6">
              <img src="/icon-trust-heart.svg" alt="Trust and reviews" className="h-14 w-14" />
              <h3 className="mt-4 text-lg font-semibold">Search Nearby & Trust</h3>
              <p className="mt-2 text-sm text-ink/70">
                Tìm phòng khám uy tín với review xác thực.
              </p>
            </div>

            <div className="card card-raise p-6">
              <img src="/icon-payment.svg" alt="Payments" className="h-14 w-14" />
              <h3 className="mt-4 text-lg font-semibold">Payments & Cost Tracking</h3>
              <p className="mt-2 text-sm text-ink/70">
                Ghi nhận chi phí chăm sóc, QR thanh toán, báo cáo minh bạch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="site-container grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-4 reveal-up">
            <p className="badge">AI Pet Assistant</p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Triage rõ ràng, quyết định nhanh hơn
            </h2>
            <p className="text-lg text-ink/70">
              AI không chẩn đoán bệnh. Hệ thống tập trung sàng lọc mức độ nguy hiểm,
              gợi ý hành động phù hợp và chuẩn bị thông tin cho bác sĩ.
            </p>
            <ul className="grid gap-3 text-sm text-ink/70">
              <li>Low: chăm sóc tại nhà, gợi ý theo dõi.</li>
              <li>Medium: gợi ý chat bác sĩ hoặc đặt lịch.</li>
              <li>High/SOS: hiển thị phòng khám 24/7 gần nhất.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: "/icon-triage.svg",
                label: "Low",
                title: "Theo dõi tại nhà",
                desc: "Checklist theo dõi, nhắc lịch tái kiểm tra.",
              },
              {
                icon: "/icon-telemed.svg",
                label: "Medium",
                title: "Kết nối bác sĩ",
                desc: "Gợi ý tư vấn trực tuyến hoặc đặt lịch khám.",
              },
              {
                icon: "/icon-sos.svg",
                label: "High",
                title: "SOS khẩn cấp",
                desc: "Hiển thị phòng khám 24/7 gần nhất.",
              },
              {
                icon: "/icon-context.svg",
                label: "Context-aware",
                title: "Đọc hồ sơ sẵn có",
                desc: "Không hỏi lại thông tin đã có, tăng độ chính xác.",
              },
            ].map((item) => (
              <div key={item.title} className="card card-raise p-5">
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={item.title} className="h-10 w-10" />
                  <span className="badge">{item.label}</span>
                </div>
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
              Chủ nuôi sở hữu dữ liệu. Phòng khám chỉ truy cập khi được phân quyền.
              Hồ sơ sức khỏe được đồng bộ xuyên suốt hành trình chăm sóc.
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
              <div key={item.title} className="card card-raise p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="card card-raise p-8">
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
            <div className="card card-raise p-6">
              <p className="text-sm text-ink/60">Tính năng đang có</p>
              <p className="mt-2 text-lg font-semibold">
                Pet profile - AI chat - Vaccine - Reminder
              </p>
            </div>
            <div className="card card-raise p-6">
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
