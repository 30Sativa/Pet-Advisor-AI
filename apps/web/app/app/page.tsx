import Link from "next/link";

export default function AppOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="card card-raise p-8">
        <p className="text-sm text-ink/60">Tổng quan</p>
        <h1 className="mt-2 text-3xl font-semibold">Xin chào!</h1>
        <p className="mt-3 text-lg text-ink/70">
          Web app beta giúp bạn quản lý thú cưng, theo dõi lịch vaccine và nhận
          tư vấn AI nhanh hơn.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/app/consultation">
            Bắt đầu chat AI
          </Link>
          <Link className="btn btn-outline" href="/app/pets">
            Quản lý hồ sơ thú cưng
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "AI Consultation",
            desc: "Tư vấn nhanh dựa trên hồ sơ và triệu chứng.",
            href: "/app/consultation",
          },
          {
            title: "Vaccine History",
            desc: "Theo dõi mũi tiêm, lịch nhắc và ghi chú.",
            href: "/app/vaccines",
          },
          {
            title: "Medication Reminder",
            desc: "Nhắc lịch tái khám, chăm sóc định kỳ.",
            href: "/app/reminders",
          },
        ].map((item) => (
          <div key={item.title} className="card card-raise p-6">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{item.desc}</p>
            <Link className="mt-4 inline-flex text-sm font-semibold text-brand" href={item.href}>
              Mở &gt;
            </Link>
          </div>
        ))}
      </div>

      <div className="card card-raise grid gap-4 p-6 md:grid-cols-3">
        {[
          { label: "Hồ sơ thú cưng", value: "3" },
          { label: "Vaccine sắp tới", value: "2" },
          { label: "Reminder đang hoạt động", value: "5" },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-sm text-ink/60">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
