"use client";

import Link from "next/link";
import { Building2, ArrowUpRight } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { departments } from "@/data/departments";

const color = {
  brand: "from-[var(--color-brand-700)] to-[var(--color-brand-900)] text-[var(--color-gold-300)]",
  clinical: "from-[var(--color-clinical-600)] to-[var(--color-clinical-800)] text-white",
  gold: "from-[var(--color-gold-500)] to-[var(--color-gold-700)] text-[var(--color-brand-950)]",
};

export default function DepartmentsAdminPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Faculties" title="Departments" description="Two flagship schools — Nursing and Food & Nutrition Sciences — alongside allied health, administration and education faculties." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <Card key={d.id} hover className="overflow-hidden group">
            <Link href={`/dashboard/departments/${d.id}`} className="block">
            <div className={`bg-gradient-to-br ${color[d.color]} p-5`}>
              <div className="flex items-start justify-between"><Building2 className="h-6 w-6" /><ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" /></div>
              <h3 className="mt-3 font-display text-lg font-semibold">{d.name}</h3>
            </div>
            <CardContent className="p-5">
              <p className="text-sm text-fg-secondary line-clamp-3">{d.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                {[["Programs", d.programs],["Faculty", d.staff],["Students", d.students]].map(([k,v]) => (
                  <div key={k as string} className="rounded-lg bg-surface-sunken p-2 text-center"><div className="text-fg-tertiary">{k}</div><div className="font-display font-semibold text-fg-primary">{v}</div></div>
                ))}
              </div>
              <div className="mt-4 border-t border-subtle pt-3 text-xs"><div className="text-fg-tertiary">Head</div><div className="font-semibold text-fg-primary">{d.head}</div></div>
            </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
