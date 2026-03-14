import { NextResponse } from "next/server";
import { adminUsers } from "@/app/_lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ data: adminUsers });
}
