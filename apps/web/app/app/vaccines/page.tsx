import { vaccines } from "@/app/_lib/mock-data";
import { formatDate } from "@/app/_lib/format";

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

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 border-b border-border bg-surface-2 px-6 py-4 text-xs font-semibold text-ink/60">
              <span>Loại vaccine</span>
              <span>Ngày tiêm</span>
              <span>Ghi chú</span>
            </div>
            <div className="divide-y divide-border">
              {vaccines.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1.5fr_1fr_1fr] gap-4 px-6 py-4 text-sm"
                >
                  <span className="font-semibold">{item.name}</span>
                  <span>{formatDate(item.date)}</span>
                  <span className="text-ink/70">{item.note ?? "-"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
