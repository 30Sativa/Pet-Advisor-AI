import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={`inline-flex items-center justify-center rounded-[14px] bg-brand text-white ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
        aria-hidden
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="48" height="48" rx="16" fill="#14B8A6" />
          <circle cx="24" cy="28" r="8" fill="white" />
          <circle cx="14" cy="18" r="3" fill="white" />
          <circle cx="24" cy="14" r="3" fill="white" />
          <circle cx="34" cy="18" r="3" fill="white" />
          <circle cx="24" cy="20" r="2.5" fill="white" />
        </svg>
      </span>
      <div className="hidden flex-col leading-tight sm:flex">
        <span className="text-sm font-semibold text-ink">AI PetOmni</span>
        <span className="text-xs text-ink/60">Pet Health Companion</span>
      </div>
    </Link>
  );
}
