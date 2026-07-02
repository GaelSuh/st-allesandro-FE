"use client";

import { Award, Plus } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatTile } from "@/components/ui/StatTile";
import { formatCurrency } from "@/lib/utils";

const awards = [
  { name: "Rector's Excellence", awarded: 5, max: 5, value: 850_000 },
  { name: "Italian Cultural Exchange", awarded: 7, max: 8, value: 425_000 },
  { name: "Sister Cities Need-Based", awarded: 18, max: 20, value: 595_000 },
  { name: "Clinical Distinction Stipend", awarded: 9, max: 12, value: 280_000 },
  { name: "WHO Africa Public Health", awarded: 2, max: 3, value: 1_200_000 },
];

export default function ScholarshipsAdminPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Financial aid" title="Scholarships" description="Active awards and disbursement plans." actions={<Button leftIcon={<Plus className="h-4 w-4" />}>New scholarship</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Total awards" value={awards.length} icon={Award} accent="gold" />
        <StatTile label="Beneficiaries" value={awards.reduce((a, x) => a + x.awarded, 0)} accent="clinical" />
        <StatTile label="Disbursed (sem)" value={formatCurrency(awards.reduce((a, x) => a + x.awarded * x.value, 0))} accent="brand" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {awards.map((a) => (
          <Card key={a.name} hover><CardContent className="p-5">
            <div className="flex items-start justify-between"><div><h3 className="font-semibold text-fg-primary">{a.name}</h3><div className="text-xs text-fg-tertiary">{a.awarded}/{a.max} awarded · {formatCurrency(a.value)} each</div></div><Badge size="sm" variant={a.awarded === a.max ? "neutral" : "gold"}>{a.awarded === a.max ? "Full" : "Open"}</Badge></div>
            <div className="mt-3 h-2 rounded-full bg-surface-sunken overflow-hidden"><div className="h-full bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" style={{ width: `${(a.awarded / a.max) * 100}%` }} /></div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
