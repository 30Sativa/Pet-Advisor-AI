import { NextResponse } from "next/server";
import { pets } from "@/app/_lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const pet = pets.find((item) => item.id === params.id);
  if (!pet) {
    return NextResponse.json({ error: "Không tìm thấy thú cưng" }, { status: 404 });
  }
  return NextResponse.json({ data: pet });
}
