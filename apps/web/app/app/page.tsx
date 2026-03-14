import Link from "next/link";
import { pets, reminders, vaccines } from "@/app/_lib/mock-data";

const DAY_MS = 24 * 60 * 60 * 1000;

const isOverdue = (date: Date) => date.getTime() < new Date().getTime();
const isUpcoming = (date: Date, days: number) => {
  const diff = date.getTime() - new Date().getTime();
  return diff >= 0 && diff <= days * DAY_MS;
};

export default function AppOverviewPage() {
  const overdueReminders = reminders.filter((item) => isOverdue(new Date(item.time)));
  const upcomingReminders = reminders.filter((item) => isUpcoming(new Date(item.time), 7));
  const upcomingVaccines = vaccines.filter((item) => isUpcoming(new Date(item.date), 30));

  return (
    <div className="space-y-8">
      <div className="card card-raise p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-ink/60">Ưu tiên hôm nay</p>
            <h2 className="mt-1 text-xl font-semibold">Việc cần xử lý ngay</h2>
          </div>
          <Link className="btn btn-outline" href="/app/reminders">
            Xem tất cả
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-semibold text-red-600">Quá hạn</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{overdueReminders.length}</p>
            <p className="text-sm text-ink/70">Reminder cần xử lý</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold text-amber-600">7 ngày tới</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{upcomingReminders.length}</p>
            <p className="text-sm text-ink/70">Reminder sắp đến</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-semibold text-emerald-600">30 ngày tới</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{upcomingVaccines.length}</p>
            <p className="text-sm text-ink/70">Vaccine cần theo dõi</p>
          </div>
        </div>
      </div>

      <div className="card card-raise p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold">Tình trạng nhanh</p>
          <Link className="text-sm font-semibold text-brand" href="/app/pets">
            Quản lý hồ sơ
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Pets: {pets.length}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Quá hạn: {overdueReminders.length}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            7 ngày tới: {upcomingReminders.length}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Vaccine 30 ngày: {upcomingVaccines.length}
          </span>
        </div>
      </div>

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
          { label: "Hồ sơ thú cưng", value: String(pets.length) },
          { label: "Vaccine sắp tới", value: String(upcomingVaccines.length) },
          { label: "Reminder đang hoạt động", value: String(reminders.length) },
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
