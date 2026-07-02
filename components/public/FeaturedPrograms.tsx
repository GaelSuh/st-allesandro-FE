"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { programs } from "@/data/programs";
import { cn } from "@/lib/utils";

const accentStyles = {
  brand: {
    chip: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] ring-[var(--color-brand-200)]",
    glow: "from-[var(--color-brand-100)]/60",
  },
  clinical: {
    chip: "bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)] ring-[var(--color-clinical-200)]",
    glow: "from-[var(--color-clinical-100)]/60",
  },
  gold: {
    chip: "bg-[var(--color-gold-50)] text-[var(--color-gold-800)] ring-[var(--color-gold-200)]",
    glow: "from-[var(--color-gold-100)]/60",
  },
};

export function FeaturedPrograms() {
  const featured = programs.slice(0, 6);

  return (
    <Section
      eyebrow="Academic excellence"
      title="Programs designed to shape the next generation of caregivers"
      description="From foundational diplomas to advanced master's qualifications — every SAUI curriculum is competency-based, internationally aligned and built around real clinical experience."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => {
          const accent = accentStyles[p.accent ?? "brand"];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-default bg-surface-elevated p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className={cn("pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity", accent.glow)} />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="neutral" size="sm" className={accent.chip + " ring-1"}>
                    {p.level}
                  </Badge>
                  <span className="text-xs font-mono text-fg-tertiary">{p.code}</span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-fg-primary">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-fg-secondary line-clamp-3 text-pretty">{p.description}</p>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-surface-sunken p-2.5">
                    <dt className="text-fg-tertiary">Duration</dt>
                    <dd className="mt-0.5 inline-flex items-center gap-1 font-semibold text-fg-primary">
                      <Clock className="h-3 w-3" /> {p.duration}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-surface-sunken p-2.5">
                    <dt className="text-fg-tertiary">Intake</dt>
                    <dd className="mt-0.5 inline-flex items-center gap-1 font-semibold text-fg-primary">
                      <Users className="h-3 w-3" /> {p.intake} seats
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/programs/${p.id}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-700)] hover:gap-2 transition-all"
                >
                  Explore program <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 rounded-xl border border-default bg-surface-elevated px-5 py-2.5 text-sm font-semibold text-fg-primary shadow-soft transition-all hover:shadow-elevated"
        >
          View all {programs.length} programs <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
