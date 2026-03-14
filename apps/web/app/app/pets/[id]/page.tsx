import Link from "next/link";
import { notFound } from "next/navigation";
import { pets } from "@/app/_lib/mock-data";

type PetDetailPageProps = {
  params: { id: string };
};

export default function PetDetailPage({ params }: PetDetailPageProps) {
  const pet = pets.find((item) => item.id === params.id);

  if (!pet) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink/60">Pet Profile</p>
          <h1 className="text-3xl font-semibold">{pet.name}</h1>
        </div>
        <Link className="btn btn-outline" href="/app/pets">
          Quay lại danh sách
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
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
          <h2 className="text-lg font-semibold">Ghi chú sức khỏe</h2>
          <p className="mt-3 text-sm text-ink/70">
            Chưa có dữ liệu bệnh nền. Bạn có thể cập nhật tiền sử bệnh, dị ứng,
            phác đồ điều trị và thông tin thú y tại đây.
          </p>
          <button className="btn btn-primary mt-6">Chỉnh sửa hồ sơ</button>
        </div>
      </div>
    </div>
  );
}
