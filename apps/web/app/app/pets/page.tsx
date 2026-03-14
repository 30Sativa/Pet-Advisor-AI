import Link from "next/link";
import { pets, reminders, vaccines } from "@/app/_lib/mock-data";

const DAY_MS = 24 * 60 * 60 * 1000;

const getPetStatus = (petId: string) => {
  const now = new Date();
  const petReminders = reminders.filter((item) => item.petId === petId);
  const petVaccines = vaccines.filter((item) => item.petId === petId);

  const hasOverdueReminder = petReminders.some((item) => new Date(item.time).getTime() < now.getTime());
  if (hasOverdueReminder) {
    return {
      label: "Cần xử lý",
      style: "bg-red-500/10 text-red-600",
      dot: "bg-red-500",
    };
  }

  const hasUpcomingVaccine = petVaccines.some((item) => {
    const diff = new Date(item.date).getTime() - now.getTime();
    return diff >= 0 && diff <= 30 * DAY_MS;
  });
  if (hasUpcomingVaccine) {
    return {
      label: "Sắp tới",
      style: "bg-amber-500/10 text-amber-600",
      dot: "bg-amber-500",
    };
  }

  return {
    label: "Bình thường",
    style: "bg-emerald-500/10 text-emerald-600",
    dot: "bg-emerald-500",
  };
};

export default function PetsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">Pet Profile System</p>
          <h1 className="text-3xl font-semibold">Hồ sơ thú cưng</h1>
        </div>
        <button className="btn btn-primary">Tạo hồ sơ mới</button>
      </div>

      {pets.length === 0 ? (
        <div className="card card-raise p-10 text-center">
          <img
            src="/empty-state-pet.svg"
            alt="Empty pet profile"
            className="mx-auto h-40 w-auto"
          />
          <p className="mt-6 text-lg font-semibold">Chưa có hồ sơ thú cưng</p>
          <p className="mt-2 text-sm text-ink/60">
            Bắt đầu bằng cách thêm thú cưng và lịch tiêm cơ bản.
          </p>
          <p className="text-sm text-ink/60">Tiếp theo, hãy bật reminder để không bỏ lỡ lịch chăm sóc.</p>
          <button className="btn btn-primary mt-6">Tạo hồ sơ mới</button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {pets.map((pet) => {
            const status = getPetStatus(pet.id);
            return (
              <div key={pet.id} className="card card-raise p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-lg font-semibold text-brand">
                    {pet.name.slice(0, 1)}
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}>
                    <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{pet.name}</h2>
                <p className="mt-1 text-sm text-ink/70">
                  {pet.species} - {pet.breed}
                </p>
                <div className="mt-4 grid gap-2 text-sm text-ink/60">
                  <span>Tuổi: {pet.age}</span>
                  <span>Giới tính: {pet.sex}</span>
                  <span>Cân nặng: {pet.weightKg} kg</span>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link className="text-sm font-semibold text-brand" href={`/app/pets/${pet.id}`}>
                    Xem chi tiết &gt;
                  </Link>
                  <Link className="text-sm font-semibold text-ink/60" href="/app/consultation">
                    Chat AI
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
