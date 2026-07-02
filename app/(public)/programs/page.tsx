"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/public/PageHeader";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { programs } from "@/data/programs";
import { getFeeTier } from "@/data/feeTiers";
import { departments } from "@/data/departments";
import { formatCurrency } from "@/lib/utils";
import { BRAND } from "@/lib/brand";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { photosByIndex } from "@/data/gallery";

const accentChip = {
  brand: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] ring-[var(--color-brand-200)]",
  clinical: "bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)] ring-[var(--color-clinical-200)]",
  gold: "bg-[var(--color-gold-50)] text-[var(--color-gold-800)] ring-[var(--color-gold-200)]",
};

export default function ProgramsPage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");
  const [dept, setDept] = useState("all");

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (q && !`${p.name} ${p.code} ${p.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (level !== "all" && p.level !== level) return false;
      if (dept !== "all" && p.department !== dept) return false;
      return true;
    });
  }, [q, level, dept]);

  return (
    <>
      <PageHeader
        eyebrow="Academics"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
        title="Programs that prepare you for what care actually demands."
        description="From foundational diplomas to specialist master's qualifications, every program is competency-based and underwritten by real clinical exposure."
      />

      <Container className="-mt-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-default bg-surface-elevated px-5 py-3 text-center text-xs text-fg-secondary shadow-soft sm:text-sm">
          <span>Authorization {BRAND.authorization}</span>
          <span className="hidden sm:inline text-fg-tertiary">•</span>
          <span>Mentored by {BRAND.mentors.join(", ")}</span>
        </div>
      </Container>

      <Container className="-mt-8 relative">
        <div className="rounded-2xl border border-default bg-surface-elevated p-4 shadow-elevated">
          <div className="grid gap-3 sm:grid-cols-[1fr_180px_220px]">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search programs by name or code…"
              leftIcon={<Search className="h-4 w-4" />}
            />
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger><SelectValue placeholder="All levels" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                {["Certificate", "Diploma", "HND", "Bachelor", "Master"].map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger><SelectValue placeholder="All departments" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Container>

      <Section>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-default bg-surface-sunken/40 py-16 text-center">
            <p className="font-display text-xl font-semibold text-fg-primary">No programs match those filters</p>
            <p className="mt-2 text-sm text-fg-secondary">Try widening your search or contact our admissions team.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-default bg-surface-elevated shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <Badge size="sm" className={`ring-1 ${accentChip[p.accent ?? "brand"]}`}>{p.level}</Badge>
                    <span className="text-xs font-mono text-fg-tertiary">{p.code}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-fg-primary">{p.name}</h3>
                  <p className="mt-1 text-xs font-medium text-fg-tertiary">{p.department}</p>
                  <p className="mt-3 text-sm text-fg-secondary line-clamp-3 text-pretty">{p.description}</p>

                  <dl className="mt-5 grid grid-cols-3 gap-2 text-xs">
                    <Stat label="Duration" value={p.duration} />
                    <Stat label="Credits" value={p.credits.toString()} />
                    <Stat label="Total cost" value={formatCurrency(getFeeTier(p.feeTierId).totalCost)} />
                  </dl>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-subtle bg-surface-sunken/40 px-6 py-3">
                  <Link href={`/programs/${p.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-700)] hover:gap-2 transition-all">
                    Program details <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/apply" className="text-xs font-semibold text-fg-secondary hover:text-fg-primary">
                    Apply →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      <Section
        eyebrow="School of Agriculture & Food Science"
        title="Floven wines — made on campus"
        description="Our Food Technology department turns equatorial terroir and Italian oenology into Floven wines — a hands-on flagship where students take a product from grape to glass."
        align="left"
        className="bg-surface-elevated/40"
      >
        <CampusPhotoGrid
          photos={photosByIndex(21, 23, 24, 25)}
          showCategory={false}
        />
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-sunken p-2">
      <dt className="text-fg-tertiary">{label}</dt>
      <dd className="mt-0.5 font-semibold text-fg-primary truncate">{value}</dd>
    </div>
  );
}
