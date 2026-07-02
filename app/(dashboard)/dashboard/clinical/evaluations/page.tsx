"use client";

import { Award, Filter, Search } from "lucide-react";
import { useState } from "react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useClinicalStore } from "@/stores";
import { Button } from "@/components/ui/Button";

export default function EvaluationsPage() {
  const rotations = useClinicalStore((s) => s.rotations);
  const [q, setQ] = useState("");
  const ready = rotations.filter((r) => r.status === "completed" || r.status === "evaluated");
  const filtered = ready.filter((r) => !q || `${r.studentName} ${r.matricule}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Clinical supervision" title="Evaluations" description="Score students whose rotations have completed." />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle>{filtered.length} ready for evaluation</CardTitle><CardDescription>Completed rotations awaiting score</CardDescription></div>
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students…" leftIcon={<Search className="h-4 w-4" />} className="max-w-xs" />
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-xl border border-subtle p-4">
              <Avatar name={r.studentName} size="md" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-fg-primary">{r.studentName}</div>
                <div className="text-xs text-fg-tertiary">{r.matricule} · {r.hospitalName} · {r.ward}</div>
              </div>
              {r.evaluation ? (
                <div className="flex items-center gap-3"><Badge variant="success" dot>Evaluated</Badge><div className="text-right"><div className="text-xs text-fg-tertiary">Score</div><div className="font-display text-xl font-semibold text-[var(--color-clinical-700)]">{r.evaluation.score}/100</div></div></div>
              ) : (
                <Button variant="primary" size="sm" leftIcon={<Award className="h-4 w-4" />}>Evaluate</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
