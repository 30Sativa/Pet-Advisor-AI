import { reminders } from "@/app/_lib/mock-data";
import { formatDateTime } from "@/app/_lib/format";

export default function RemindersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">Medication Reminder</p>
          <h1 className="text-3xl font-semibold">Nhắc lịch chăm sóc</h1>
        </div>
        <button className="btn btn-primary">Tạo reminder</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reminders.map((item) => (
          <div key={item.id} className="card card-raise p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <span className="badge">{item.repeat}</span>
            </div>
            <p className="mt-3 text-sm text-ink/70">
              Thời gian: {formatDateTime(item.time)}
            </p>
            <button className="btn btn-outline mt-4">Chỉnh sửa</button>
          </div>
        ))}
      </div>
    </div>
  );
}
