"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChatMessage, Triage } from "@/app/_lib/types";

type ChatSession = {
  user_id: string;
  conversation_id: string;
};

const SESSION_KEY = "petomni_session_v1";

const DEFAULT_MESSAGE: ChatMessage = {
  id: "intro",
  role: "assistant",
  text: "Chào bạn! Hãy mô tả triệu chứng của thú cưng nhé.",
  ts: new Date().toISOString(),
};

const urgencyLabel: Record<Triage["urgency"], string> = {
  critical: "Khẩn cấp",
  high: "Cần chú ý",
  normal: "Bình thường",
};

const urgencyStyle: Record<Triage["urgency"], string> = {
  critical: "bg-red-500/10 text-red-600",
  high: "bg-amber-500/10 text-amber-600",
  normal: "bg-emerald-500/10 text-emerald-600",
};

const intentLabel: Record<Triage["intent"], string> = {
  nutrition: "Dinh dưỡng",
  symptom: "Triệu chứng",
  vaccine: "Tiêm phòng",
  general: "Chung",
  emergency: "Khẩn cấp",
};

const vetRecLabel: Record<NonNullable<Triage["vet_recommendation"]>, string> = {
  critical: "Gặp bác sĩ trong 24h",
  high: "Khám trong 48-72h",
  monitor: "Theo dõi tại nhà",
  none: "Không cần khám",
};

const quickChips = [
  "Bỏ ăn",
  "Nôn",
  "Tiêu chảy",
  "Sốt",
  "Ngứa / rụng lông",
  "Mệt mỏi",
];

const nextSteps: Record<Triage["urgency"], string[]> = {
  critical: [
    "Liên hệ phòng khám 24/7 gần nhất",
    "Chuẩn bị lịch sử bệnh và mũi tiêm",
    "Theo dõi dấu hiệu nguy hiểm liên tục",
  ],
  high: [
    "Đặt lịch khám trong 48-72h",
    "Ghi lại triệu chứng và thời điểm",
    "Giảm hoạt động, theo dõi thêm",
  ],
  normal: [
    "Theo dõi tại nhà trong 24-48h",
    "Đảm bảo uống nước và ăn nhẹ",
    "Tái đánh giá nếu có dấu hiệu mới",
  ],
};

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  const [session, setSession] = useState<ChatSession | null>(null);
  const [triage, setTriage] = useState<Triage | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cached = window.localStorage.getItem(SESSION_KEY);
    if (cached) {
      try {
        setSession(JSON.parse(cached));
        return;
      } catch {
        window.localStorage.removeItem(SESSION_KEY);
      }
    }

    const bootstrap = async () => {
      try {
        const response = await fetch("/api/ai/session", { method: "POST" });
        const data = await response.json();
        setSession(data);
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(data));
      } catch {
        setError("Không thể khởi tạo phiên chat. Vui lòng thử lại.");
      }
    };

    void bootstrap();
  }, []);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const sendMessage = async () => {
    if (!session || !canSend) return;
    setError("");
    const trimmed = input.trim();
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
      ts: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsSending(true);
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session.user_id,
          conversation_id: session.conversation_id,
          message: trimmed,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "AI error");
      }
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data.text ?? "AI đang chuẩn bị phản hồi.",
        ts: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, reply]);
      setTriage({
        urgency: data.urgency ?? "normal",
        intent: data.intent ?? "general",
        vet_recommendation: data.vet_recommendation,
      });
    } catch {
      setError("Không thể kết nối AI. Vui lòng thử lại.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="card flex min-h-[520px] flex-col">
        <div className="border-b border-border px-6 py-4">
          <p className="text-sm text-ink/60">AI Consultation</p>
          <h2 className="text-xl font-semibold">Hỏi AI về tình trạng thú cưng</h2>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                message.role === "user"
                  ? "ml-auto bg-brand text-white"
                  : "bg-surface-2 text-ink"
              }`}
            >
              {message.text}
            </div>
          ))}
          {isSending ? (
            <div className="max-w-[60%] rounded-2xl bg-surface-2 px-4 py-3 text-sm text-ink/60">
              AI đang phản hồi...
            </div>
          ) : null}
        </div>
        <div className="border-t border-border px-6 py-4">
          {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}
          <div className="mb-3 flex flex-wrap gap-2">
            {quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-border bg-white px-3 py-1 text-xs text-ink/70 hover:border-brand/40 hover:text-brand"
                onClick={() => setInput((prev) => (prev ? `${prev}, ${chip}` : chip))}
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              className="input"
              placeholder="Nhập mô tả triệu chứng..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
            />
            <button
              className="btn btn-primary whitespace-nowrap"
              onClick={() => void sendMessage()}
              disabled={!canSend || !session}
            >
              Gửi
            </button>
          </div>
        </div>
      </div>

      <div className="card h-full p-6">
        <p className="text-sm text-ink/60">Triage</p>
        <h3 className="mt-2 text-lg font-semibold">Đánh giá mức độ</h3>
        {triage ? (
          <div className="mt-6 space-y-4">
            <div className={`rounded-2xl px-4 py-3 text-sm font-semibold ${urgencyStyle[triage.urgency]}`}>
              {urgencyLabel[triage.urgency]}
            </div>
            <div className="rounded-2xl border border-border bg-surface-2 px-4 py-3">
              <p className="text-xs text-ink/60">Intent</p>
              <p className="text-sm font-semibold">{intentLabel[triage.intent]}</p>
            </div>
            {triage.vet_recommendation ? (
              <div className="rounded-2xl border border-border bg-white px-4 py-3">
                <p className="text-xs text-ink/60">Khuyến nghị</p>
                <p className="text-sm font-semibold">
                  {vetRecLabel[triage.vet_recommendation]}
                </p>
              </div>
            ) : null}
            <div className="rounded-2xl border border-border bg-white px-4 py-3">
              <p className="text-xs text-ink/60">Việc nên làm</p>
              <ul className="mt-2 grid gap-2 text-sm text-ink/70">
                {nextSteps[triage.urgency].map((step) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink/60">
            Bắt đầu chat để xem mức độ sàng lọc.
          </p>
        )}
        <div className="mt-8 rounded-2xl bg-ink px-4 py-4 text-xs text-white/80">
          AI không chẩn đoán bệnh và không thay thế bác sĩ thú y.
        </div>
      </div>
    </div>
  );
}
