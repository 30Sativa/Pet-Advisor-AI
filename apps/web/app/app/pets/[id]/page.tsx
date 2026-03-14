import Link from "next/link";
import { notFound } from "next/navigation";
import { pets, reminders, vaccines } from "@/app/_lib/mock-data";
import { formatDate, formatDateTime } from "@/app/_lib/format";

type PetDetailPageProps = {
  params: { id: string };
};

const DAY_MS = 24 * 60 * 60 * 1000;

export default function PetDetailPage({ params }: PetDetailPageProps) {
  const pet = pets.find((item) => item.id === params.id);

  if (!pet) {
    notFound();
  }

  const petReminders = reminders.filter((item) => item.petId === pet.id);
  const petVaccines = vaccines.filter((item) => item.petId === pet.id);

  const upcomingReminders = petReminders.filter((item) => {
    const diff = new Date(item.time).getTime() - new Date().getTime();
    return diff >= 0 && diff <= 30 * DAY_MS;
  });

  const timelineItems = [
    ...petVaccines.map((item) => ({
      id: item.id,
      type: "Vaccine",
      title: item.name,
      displayDate: formatDate(item.date),
      rawDate: item.date,
      note: item.note,
    })),
    ...petReminders.map((item) => ({
      id: item.id,
      type: "Reminder",
      title: item.title,
      displayDate: formatDateTime(item.time),
      rawDate: item.time,
      note: item.repeat,
    })),
  ].sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">Pet Profile</p>
          <h1 className="text-3xl font-semibold">{pet.name}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-outline" href="/app/pets">
            Quay lại danh sách
          </Link>
          <Link className="btn btn-primary" href="/app/consultation">
            Chat AI
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="card card-raise p-6">
            <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
            <div className="mt-4 grid gap-3 text-sm text-ink/70">
              <div className="flex justify-between">
                <span>Loài</span>
                <span className="font-semibold text-ink">{pet.species}</span>
              </div>
              <div className="flex justify-between">
                <span>Giống</span>
                <span className="font-semibold text-ink">{pet.breed}</span>
              </div>
              <div className="flex justify-between">
                <span>Tuổi</span>
                <span className="font-semibold text-ink">{pet.age}</span>
              </div>
              <div className="flex justify-between">
                <span>Giới tính</span>
                <span className="font-semibold text-ink">{pet.sex}</span>
              </div>
              <div className="flex justify-between">
                <span>Cân nặng</span>
                <span className="font-semibold text-ink">{pet.weightKg} kg</span>
              </div>
            </div>
          </div>

          <div className="card card-raise p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sự kiện sắp tới</h2>
              <Link className="text-sm font-semibold text-brand" href="/app/reminders">
                Quản lý
              </Link>
            </div>
            {upcomingReminders.length > 0 ? (
              <div className="mt-4 grid gap-3">
                {upcomingReminders.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border bg-surface-2 p-4 text-sm">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-ink/70">{formatDateTime(item.time)}</p>
                    <span className="mt-2 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
                      Sắp đến
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-ink/60">Chưa có lịch sắp tới trong 30 ngày.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card card-raise p-6">
            <h2 className="text-lg font-semibold">Ghi chú sức khỏe</h2>
            <p className="mt-3 text-sm text-ink/70">
              Chưa có dữ liệu bệnh nền. Bạn có thể cập nhật tiền sử bệnh, dị ứng,
              phác đồ điều trị và thông tin thú y tại đây.
            </p>
            <button className="btn btn-primary mt-6">Chỉnh sửa hồ sơ</button>
          </div>

          <div className="card card-raise p-6">
            <h2 className="text-lg font-semibold">Timeline chăm sóc</h2>
            {timelineItems.length > 0 ? (
              <div className="mt-4 space-y-3">
                {timelineItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-border bg-white p-4">
                    <div className="flex items-center justify-between text-xs text-ink/60">
                      <span>{item.type}</span>
                      <span>{item.displayDate}</span>
                    </div>
                    <p className="mt-2 font-semibold text-ink">{item.title}</p>
                    {item.note ? (
                      <p className="mt-1 text-sm text-ink/70">{item.note}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-ink/60">Chưa có dữ liệu timeline.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
