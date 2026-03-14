import { NextResponse } from "next/server";
import { reminders } from "@/app/_lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ data: reminders });
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  return NextResponse.json({
    data: { id: crypto.randomUUID(), ...payload },
  });
}
