import Link from "next/link";
import { pets } from "@/app/_lib/mock-data";

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

      <div className="grid gap-6 md:grid-cols-3">
        {pets.map((pet) => (
          <div key={pet.id} className="card p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-lg font-semibold text-brand">
              {pet.name.slice(0, 1)}
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
            <Link className="mt-5 inline-flex text-sm font-semibold text-brand" href={`/app/pets/${pet.id}`}>
              Xem chi tiết &gt;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
