import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white" | "mark";
  href?: string | null;
  showTagline?: boolean;
}

export function Logo({ className, variant = "default", href = "/", showTagline = false }: LogoProps) {
  const isWhite = variant === "white";
  const isMark = variant === "mark";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-xl shadow-soft",
          isWhite
            ? "bg-white/10 ring-1 ring-white/25"
            : "bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] ring-1 ring-[var(--color-brand-800)]"
        )}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden>
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.13 80)" />
              <stop offset="100%" stopColor="oklch(0.62 0.130 75)" />
            </linearGradient>
          </defs>
          {/* Heritage shield with cross + flame motif */}
          <path
            d="M16 2 L28 6 V16 C28 23 22.5 28.5 16 30 C9.5 28.5 4 23 4 16 V6 Z"
            fill="url(#lg)"
            stroke={isWhite ? "white" : "oklch(0.95 0.045 84)"}
            strokeOpacity={0.55}
            strokeWidth="0.5"
          />
          <path d="M16 9 V21 M11 15 H21" stroke="oklch(0.17 0.055 262)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="15" r="1.5" fill="oklch(0.17 0.055 262)" />
        </svg>
      </span>
      {!isMark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[15px] font-semibold tracking-tight",
              isWhite ? "text-white" : "text-fg-primary"
            )}
          >
            St Alessandro
          </span>
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.18em] font-medium mt-0.5",
              isWhite ? "text-white/70" : "text-fg-tertiary"
            )}
          >
            University Institute
          </span>
          {showTagline && (
            <span className={cn("mt-1 text-[10px]", isWhite ? "text-white/60" : "text-fg-tertiary")}>
              Empowering minds since 2022
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} className="inline-flex items-center focus-ring">
      {content}
    </Link>
  );
}
