"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

type NavLinksProps = {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
};

export function NavLinks({ items, orientation = "vertical" }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav
      className={
        orientation === "vertical"
          ? "flex flex-col gap-1"
          : "flex flex-wrap items-center gap-3"
      }
    >
      {items.map((item) => {
        const isRootMatch =
          item.href === "/app" || item.href === "/admin"
            ? pathname === item.href
            : false;
        const isActive =
          isRootMatch || pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-brand/10 text-brand"
                : "text-ink/70 hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
