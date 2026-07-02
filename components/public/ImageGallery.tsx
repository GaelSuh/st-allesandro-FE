import Link from "next/link";
import { ArrowUpRight, GraduationCap, HeartPulse, Wine } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { photosByIndex } from "@/data/gallery";

/** A curated cross-section spanning the three pillars of the institute. */
const homepageSelection = photosByIndex(14, 9, 6, 21, 3, 19, 11, 20, 15, 1, 12, 16);

const pillars = [
  { Icon: GraduationCap, label: "University", body: "Nursing, midwifery, allied health & food science." },
  { Icon: HeartPulse, label: "Clinic", body: "St Alessandro Clinic — orthopaedic & surgical care." },
  { Icon: Wine, label: "Winery", body: "Floven wines, from our Food Technology unit." },
];

export function ImageGallery() {
  return (
    <Section
      eyebrow="One campus, three institutions"
      title="Life at St Alessandro, in pictures"
      description="A university, a clinic and a winery share a single Bonaberi-Douala campus — bound together by Italian orthopaedic heritage and a mission of innovative education for a healthier future."
    >
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.label}
            className="flex items-start gap-3 rounded-2xl border border-default bg-surface-elevated p-4 shadow-soft"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-900)] text-[var(--color-gold-400)]">
              <p.Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-fg-primary">{p.label}</div>
              <p className="mt-0.5 text-xs text-fg-secondary text-pretty">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <CampusPhotoGrid
        photos={homepageSelection}
        columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      />

      <div className="mt-10 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 rounded-xl border border-default bg-surface-elevated px-5 py-2.5 text-sm font-semibold text-fg-primary shadow-soft transition-all hover:shadow-elevated"
        >
          View the full gallery <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
