"use client";

import { Calendar, FileText, Plus, Users } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

const assignments = [
  { id: 1, title: "Case Study #4 — Pre-eclampsia", course: "NUR-307", due: "30 May 2026", submitted: 38, total: 60, status: "Active" },
  { id: 2, title: "Reflective journal — Maternity rotation", course: "NUR-307", due: "5 Jun 2026", submitted: 24, total: 60, status: "Active" },
  { id: 3, title: "Mid-term essay — Pharmacology", course: "NUR-205", due: "10 Jun 2026", submitted: 0, total: 84, status: "Draft" },
  { id: 4, title: "Care plan #3", course: "NUR-405", due: "28 May 2026", submitted: 32, total: 32, status: "Closed" },
];

export default function LecturerAssignmentsPage() {
  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Coursework"
        title="Assignments"
        description="Create assignments, track submissions and release grades."
        actions={<Button leftIcon={<Plus className="h-4 w-4" />}>New assignment</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {assignments.map((a) => (
          <Card key={a.id} hover>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"><FileText className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold text-fg-primary">{a.title}</h3>
                    <div className="mt-0.5 text-xs text-fg-tertiary"><span className="font-mono">{a.course}</span> · <Calendar className="inline h-3 w-3" /> Due {a.due}</div>
                  </div>
                </div>
                <Badge size="sm" variant={a.status === "Active" ? "success" : a.status === "Closed" ? "neutral" : "gold"}>{a.status}</Badge>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs"><span className="text-fg-tertiary inline-flex items-center gap-1"><Users className="h-3 w-3" />Submissions</span><span className="font-mono font-semibold text-fg-primary">{a.submitted}/{a.total}</span></div>
                <Progress value={(a.submitted / a.total) * 100} className="mt-1.5" />
              </div>
              <div className="mt-4 flex gap-2"><Button variant="secondary" size="sm" className="flex-1">View submissions</Button><Button variant="ghost" size="sm">Edit</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
