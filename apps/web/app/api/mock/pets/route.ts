import { NextResponse } from "next/server";
import { pets } from "@/app/_lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ data: pets });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  return NextResponse.json({
    data: { id: crypto.randomUUID(), ...payload },
  });
}
