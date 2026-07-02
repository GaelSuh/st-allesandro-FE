"use client";

import { CalendarDays, Check, Plus, Sparkles } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

const programs = [
  { name: "B.Sc. Nursing · Year 1", status: "Published", progress: 100, conflicts: 0 },
  { name: "B.Sc. Nursing · Year 2", status: "Published", progress: 100, conflicts: 0 },
  { name: "B.Sc. Nursing · Year 3", status: "Published", progress: 100, conflicts: 0 },
  { name: "B.Sc. Nursing · Year 4", status: "Draft", progress: 82, conflicts: 2 },
  { name: "HND Midwifery · all years", status: "Published", progress: 100, conflicts: 0 },
  { name: "HND Pharmacy Tech", status: "Draft", progress: 64, conflicts: 4 },
];

export default function AdminTimetablesPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Academic ops" title="Timetables" description="Generate, edit and publish weekly schedules per program." actions={<><Button variant="secondary" leftIcon={<Sparkles className="h-4 w-4" />}>Auto-generate</Button><Button leftIcon={<Plus className="h-4 w-4" />}>New schedule</Button></>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <Card key={p.name} hover>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2"><h3 className="font-semibold text-fg-primary">{p.name}</h3><Badge size="sm" variant={p.status === "Published" ? "success" : "gold"}>{p.status}</Badge></div>
              <div className="mt-3"><div className="flex justify-between text-xs"><span className="text-fg-tertiary">Schedule built</span><span className="font-mono text-fg-primary font-semibold">{p.progress}%</span></div><Progress value={p.progress} className="mt-1.5" /></div>
              <div className="mt-3 flex items-center justify-between text-xs"><span className={`inline-flex items-center gap-1 ${p.conflicts > 0 ? "text-[oklch(0.55_0.205_25)]" : "text-fg-tertiary"}`}>{p.conflicts > 0 ? `${p.conflicts} conflicts` : "No conflicts"}</span><Button size="xs" variant="ghost">Open editor →</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
