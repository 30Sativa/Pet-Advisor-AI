import { vaccines } from "@/app/_lib/mock-data";
import { formatDate } from "@/app/_lib/format";

const DAY_MS = 24 * 60 * 60 * 1000;

const getVaccineStatus = (date: string) => {
  const target = new Date(date);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff < 0) {
    return {
      label: "Đã tiêm",
      style: "bg-slate-200 text-slate-600",
      dot: "bg-slate-500",
    };
  }
  if (diff <= 30 * DAY_MS) {
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

export default function VaccinesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">Vaccine History</p>
          <h1 className="text-3xl font-semibold">Lịch sử vaccine</h1>
        </div>
        <button className="btn btn-primary">Thêm mũi vaccine</button>
      </div>

      {vaccines.length === 0 ? (
        <div className="card card-raise p-10 text-center">
          <img
            src="/empty-state-pet.svg"
            alt="Empty vaccine"
            className="mx-auto h-36 w-auto"
          />
          <p className="mt-6 text-lg font-semibold">Chưa có dữ liệu vaccine</p>
          <p className="mt-2 text-sm text-ink/60">
            Thêm mũi vaccine đầu tiên và đặt lịch nhắc tự động.
          </p>
          <p className="text-sm text-ink/60">Có thể nhập nhanh từ sổ tiêm sau này.</p>
          <button className="btn btn-primary mt-6">Thêm mũi vaccine</button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:hidden">
            {vaccines.map((item) => {
              const status = getVaccineStatus(item.date);
              return (
                <div key={item.id} className="card card-raise p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}>
                      <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink/70">Ngày tiêm: {formatDate(item.date)}</p>
                  <p className="mt-2 text-sm text-ink/60">{item.note ?? "-"}</p>
                </div>
              );
            })}
          </div>

          <div className="card hidden overflow-hidden md:block">
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-4 border-b border-border bg-surface-2 px-6 py-4 text-xs font-semibold text-ink/60">
                  <span>Loại vaccine</span>
                  <span>Ngày tiêm</span>
                  <span>Ghi chú</span>
                  <span>Trạng thái</span>
                </div>
                <div className="divide-y divide-border">
                  {vaccines.map((item) => {
                    const status = getVaccineStatus(item.date);
                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 text-sm"
                      >
                        <span className="font-semibold">{item.name}</span>
                        <span>{formatDate(item.date)}</span>
                        <span className="text-ink/70">{item.note ?? "-"}</span>
                        <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}>
                          <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
