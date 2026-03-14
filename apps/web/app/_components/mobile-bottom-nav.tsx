"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

type MobileBottomNavProps = {
  items: NavItem[];
};

const getIcon = (href: string) => {
  switch (href) {
    case "/app":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 11.5L12 5l8 6.5v6a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "/app/pets":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8.2 8.8c1.2-1.7 4.4-1.7 5.6 0l2.5 3.4c1 1.4 0 3.3-1.8 3.3H7.5c-1.8 0-2.8-1.9-1.8-3.3l2.5-3.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="6.2" r="1.2" fill="currentColor" />
          <circle cx="16" cy="6.2" r="1.2" fill="currentColor" />
        </svg>
      );
    case "/app/consultation":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6.5h12a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2H10l-4 3v-3H6a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "/app/vaccines":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 17l10-10M9.5 5.5l9 9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect x="5" y="15" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "/app/reminders":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 8a6 6 0 0 1 12 0v4l2 3H4l2-3V8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return null;
  }
};

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white/95 backdrop-blur md:hidden">
      <div className="site-container grid grid-cols-5 gap-2 py-3 text-xs">
        {items.map((item) => {
          const isRootMatch = item.href === "/app" ? pathname === item.href : false;
          const isActive = isRootMatch || pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-center font-semibold transition ${
                isActive ? "bg-brand/10 text-brand" : "text-ink/70"
              }`}
            >
              {getIcon(item.href)}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
