import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "white" | "mark";
  href?: string | null;
  showTagline?: boolean;
  /** Pixel size of the crest mark. Defaults to 36 (h-9 w-9). */
  size?: number;
}

export function Logo({ className, variant = "default", href = "/", showTagline = false, size = 36 }: LogoProps) {
  const isWhite = variant === "white";
  const isMark = variant === "mark";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-soft",
          isWhite ? "ring-1 ring-white/40" : "ring-1 ring-[var(--color-brand-200)]"
        )}
        style={{ height: size, width: size }}
      >
        <Image
          src="/logo/crest-192.png"
          alt="St Alessandro University Institute crest"
          width={192}
          height={192}
          priority
          className="h-full w-full object-contain p-0.5"
        />
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
