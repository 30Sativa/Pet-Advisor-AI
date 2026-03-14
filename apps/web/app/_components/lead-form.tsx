"use client";

import { useState } from "react";

type LeadFormState = {
  name: string;
  phone: string;
  email: string;
  petType: string;
};

const initialState: LeadFormState = {
  name: "",
  phone: "",
  email: "",
  petType: "",
};

export function LeadForm() {
  const [form, setForm] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const updateField = (key: keyof LeadFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.phone.trim() || !form.email.trim() || !form.petType.trim()) {
      setMessage("Vui lòng nhập đầy đủ sđt, email và loại thú cưng.");
      return false;
    }
    return true;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/mock/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Lead submit failed");
      }
      setStatus("success");
      setMessage("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[32px] bg-white p-8 text-ink shadow-[var(--shadow-soft)]"
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink/60">
            Họ và tên
          </label>
          <input
            type="text"
            className="input mt-2"
            placeholder="Nguyễn Văn A"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink/60">
            Số điện thoại
          </label>
          <input
            type="tel"
            className="input mt-2"
            placeholder="09xx xxx xxx"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink/60">
            Email
          </label>
          <input
            type="email"
            className="input mt-2"
            placeholder="email@domain.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink/60">
            Loại thú cưng
          </label>
          <input
            className="input mt-2"
            placeholder="Chó / Mèo / Khác"
            value={form.petType}
            onChange={(event) => updateField("petType", event.target.value)}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-6 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Đang gửi..." : "Đăng ký ngay"}
      </button>
      {message ? (
        <p
          className={`mt-4 text-sm ${
            status === "success" ? "text-brand" : "text-red-500"
          }`}
        >
          {message}
        </p>
      ) : null}
      <p className="mt-4 text-xs text-ink/60">
        Bằng việc đăng ký, bạn đồng ý để PetOmni liên hệ và cập nhật thông tin
        sớm nhất.
      </p>
    </form>
  );
}
