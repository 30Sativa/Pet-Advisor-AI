"use client";

import { useMemo, useState } from "react";
import type { AdminUser } from "@/app/_lib/types";
import { formatDateTime } from "@/app/_lib/format";

const statusLabel: Record<string, string> = {
  active: "Đang hoạt động",
  trial: "Dùng thử",
  inactive: "Ngừng hoạt động",
};

const statusStyle: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600",
  trial: "bg-amber-500/10 text-amber-600",
  inactive: "bg-slate-200 text-slate-600",
};

type AdminUsersTableProps = {
  users: AdminUser[];
};

export function AdminUsersTable({ users }: AdminUsersTableProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<AdminUser | null>(users[0] ?? null);

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.phone.includes(query) ||
        user.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" ? true : user.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status, users]);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <div className="card p-6">
          <div className="flex flex-wrap items-center gap-4">
            <input
              className="input md:max-w-xs"
              placeholder="Tìm theo tên hoặc số"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              className="input md:max-w-xs"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="trial">Dùng thử</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] gap-4 border-b border-border bg-surface-2 px-6 py-4 text-xs font-semibold text-ink/60">
                <span>Người dùng</span>
                <span>Số điện thoại</span>
                <span>Pets</span>
                <span>Trạng thái</span>
                <span>Hoạt động gần nhất</span>
              </div>
              <div className="divide-y divide-border">
                {filtered.map((user) => (
                  <button
                    key={user.id}
                    className={`grid w-full grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] gap-4 px-6 py-4 text-left text-sm transition ${
                      selected?.id === user.id ? "bg-brand/5" : "hover:bg-surface-2"
                    }`}
                    onClick={() => setSelected(user)}
                  >
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-ink/60">{user.email}</p>
                    </div>
                    <span>{user.phone}</span>
                    <span>{user.pets}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[user.status]}`}
                    >
                      {statusLabel[user.status]}
                    </span>
                    <span className="text-ink/70">{formatDateTime(user.lastActive)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card h-fit p-6">
        <p className="text-sm text-ink/60">Chi tiết người dùng</p>
        {selected ? (
          <div className="mt-4 space-y-3 text-sm text-ink/70">
            <div>
              <p className="text-xs uppercase text-ink/50">Tên</p>
              <p className="font-semibold text-ink">{selected.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-ink/50">Liên hệ</p>
              <p>{selected.phone}</p>
              <p>{selected.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-ink/50">Số thú cưng</p>
              <p className="font-semibold text-ink">{selected.pets}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-ink/50">Hoạt động gần nhất</p>
              <p>{formatDateTime(selected.lastActive)}</p>
            </div>
            <button className="btn btn-outline mt-4 w-full">Mở hồ sơ</button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink/60">Chọn người dùng để xem chi tiết.</p>
        )}
      </div>
    </div>
  );
}
