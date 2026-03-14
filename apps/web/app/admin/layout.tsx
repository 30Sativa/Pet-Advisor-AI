import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/app/_components/brand-mark";
import { NavLinks } from "@/app/_components/nav-links";

const adminNavItems = [{ label: "User Management", href: "/admin/users" }];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-2 text-ink">
      <div className="md:flex">
        <aside className="hidden min-h-screen w-64 flex-col border-r border-border bg-white md:flex">
          <div className="p-6">
            <BrandMark compact />
          </div>
          <div className="px-4">
            <NavLinks items={adminNavItems} />
          </div>
          <div className="mt-auto px-6 py-6 text-xs text-ink/50">
            Admin Console
          </div>
        </aside>

        <div className="flex-1">
          <div className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur md:hidden">
            <div className="site-container flex h-16 items-center justify-between">
              <BrandMark compact />
              <Link className="btn btn-outline text-xs" href="/">
                Trang chủ
              </Link>
            </div>
            <div className="site-container pb-3">
              <NavLinks items={adminNavItems} orientation="horizontal" />
            </div>
          </div>
          <main className="site-container py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
