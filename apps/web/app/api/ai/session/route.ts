import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({
    user_id: crypto.randomUUID(),
    conversation_id: crypto.randomUUID(),
  });
}
