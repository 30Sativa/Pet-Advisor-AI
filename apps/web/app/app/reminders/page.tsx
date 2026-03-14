import { reminders } from "@/app/_lib/mock-data";
import { formatDateTime } from "@/app/_lib/format";

const DAY_MS = 24 * 60 * 60 * 1000;

const getReminderStatus = (time: string) => {
  const target = new Date(time);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff < -DAY_MS) {
    return {
      label: "Quá hạn",
      style: "bg-red-500/10 text-red-600",
      dot: "bg-red-500",
    };
  }
  if (diff <= DAY_MS) {
    return {
      label: "Sắp đến",
      style: "bg-amber-500/10 text-amber-600",
      dot: "bg-amber-500",
    };
  }
  return {
    label: "Đã lên lịch",
    style: "bg-emerald-500/10 text-emerald-600",
    dot: "bg-emerald-500",
  };
};

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

      {reminders.length === 0 ? (
        <div className="card card-raise p-10 text-center">
          <img
            src="/empty-state-pet.svg"
            alt="Empty reminder"
            className="mx-auto h-36 w-auto"
          />
          <p className="mt-6 text-lg font-semibold">Chưa có reminder</p>
          <p className="mt-2 text-sm text-ink/60">
            Tạo reminder theo lịch tiêm hoặc chăm sóc định kỳ.
          </p>
          <p className="text-sm text-ink/60">Chúng tôi sẽ nhắc trước để bạn chuẩn bị.</p>
          <button className="btn btn-primary mt-6">Tạo reminder</button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reminders.map((item) => {
            const status = getReminderStatus(item.time);
            return (
              <div key={item.id} className="card card-raise p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}>
                    <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink/70">
                  Thời gian: {formatDateTime(item.time)}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="badge">{item.repeat}</span>
                  <button className="btn btn-outline">Chỉnh sửa</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
