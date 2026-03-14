import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const fallbackResponse = {
  text: "AI tạm thời chưa kết nối được. Vui lòng thử lại sau.",
  urgency: "normal",
  intent: "general",
  mock: true,
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.user_id || !body?.conversation_id || !body?.message) {
    return NextResponse.json(
      { error: "Thiếu dữ liệu chat" },
      { status: 400 }
    );
  }

  const baseUrl = process.env.AI_BASE_URL ?? "http://localhost:8000";
  const url = new URL("/internal/chat", baseUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(process.env.AI_API_KEY
          ? { Authorization: `Bearer ${process.env.AI_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        user_id: body.user_id,
        conversation_id: body.conversation_id,
        message: body.message,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "AI backend error", detail: errorText },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(fallbackResponse, { status: 200 });
    }
    return NextResponse.json(
      { error: "Không thể kết nối AI" },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
