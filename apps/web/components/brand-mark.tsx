import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <img
        src="/brand/logo.svg"
        alt="AI PetOmni"
        className={compact ? "h-9 w-auto" : "h-11 w-auto"}
      />
      <div className="hidden flex-col leading-tight sm:flex">
        <span className="text-sm font-semibold text-ink">AI PetOmni</span>
        <span className="text-xs text-ink/60">Pet Health Companion</span>
      </div>
    </Link>
  );
}
