"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CampusPhoto, PhotoCategory } from "@/data/gallery";

const categoryStyle: Record<PhotoCategory, string> = {
  University: "bg-[var(--color-brand-600)]",
  Clinic: "bg-[var(--color-clinical-600)]",
  Winery: "bg-[oklch(0.45_0.15_15)]",
  Partnership: "bg-[var(--color-gold-700)]",
  Campus: "bg-[var(--color-brand-800)]",
};

interface CampusPhotoGridProps {
  photos: CampusPhoto[];
  /** Responsive column classes for the grid. */
  columns?: string;
  /** Aspect ratio of each tile. */
  aspect?: string;
  /** Show the coloured category chip. */
  showCategory?: boolean;
  className?: string;
}

/**
 * Responsive, captioned photo grid used across the public site. Mobile-first:
 * defaults to 2 columns, scaling up on larger viewports. Every tile keeps a
 * legible caption scrim and an optional category chip.
 */
export function CampusPhotoGrid({
  photos,
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  aspect = "aspect-[4/3]",
  showCategory = true,
  className = "",
}: CampusPhotoGridProps) {
  return (
    <div className={`grid gap-3 sm:gap-4 ${columns} ${className}`}>
      {photos.map((p, i) => (
        <motion.figure
          key={p.n}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
          className={`group relative ${aspect} overflow-hidden rounded-2xl border border-default bg-surface-sunken shadow-soft transition-shadow hover:shadow-elevated`}
        >
          <Image
            src={p.src}
            alt={p.caption}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-brand-950)]/95 from-15% via-[var(--color-brand-950)]/55 via-45% to-transparent" />

          {showCategory && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-soft ${categoryStyle[p.category]}`}
            >
              {p.category}
            </span>
          )}

          <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-[11px] leading-snug sm:text-sm font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            <span className="line-clamp-3">{p.caption}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
