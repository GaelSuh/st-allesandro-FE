"use client";

import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Calendar, Hospital, MapPin, User } from "lucide-react";

export default function ParentClinicalPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Clinical training" title="Clinical progress" description="Hospital placements, hours logged and supervisor feedback." />
      <Card>
        <CardHeader><CardTitle>Current rotation</CardTitle><CardDescription>Active placement</CardDescription></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]"><Hospital className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold text-fg-primary">Laquintinie Hospital</div>
                <div className="text-xs text-fg-tertiary">Maternity ward · Morning shift</div>
                <div className="mt-1 inline-flex items-center gap-2 text-xs text-fg-secondary">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />6 May – 30 May 2026</span>
                  <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />Dr. Florence Mbongo</span>
                </div>
              </div>
            </div>
            <Badge size="sm" variant="clinical">In progress</Badge>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs"><span className="text-fg-tertiary">Hours logged</span><span className="font-mono font-semibold text-fg-primary">88/120</span></div>
            <Progress value={73} className="mt-1.5" indicatorClassName="bg-gradient-to-r from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" />
          </div>
          <div className="mt-4 rounded-lg border border-subtle bg-surface p-3 text-xs">
            <div className="text-fg-tertiary">Most recent supervisor note</div>
            <p className="mt-1 text-fg-primary">"Excellent patient communication and bedside manner. Refine sterile technique during catheter insertions."</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Procedure highlights</CardTitle><CardDescription>Approved logbook entries this rotation</CardDescription></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {["IV Cannulation (3 entries)", "Vital Signs Assessment (8)", "Wound Dressing (4)", "Patient Bed Bath (5)"].map((p) => (
              <li key={p} className="flex items-center justify-between rounded-lg border border-subtle p-2.5"><span className="text-fg-primary">{p}</span><Badge variant="success" size="sm">Signed</Badge></li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
