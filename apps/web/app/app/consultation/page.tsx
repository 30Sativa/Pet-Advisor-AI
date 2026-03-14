import { ChatPanel } from "@/app/_components/chat-panel";

export default function ConsultationPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink/60">AI Consultation</p>
        <h1 className="text-3xl font-semibold">Tư vấn sức khỏe thú cưng</h1>
      </div>
      <ChatPanel />
    </div>
  );
}
