"use client";

import { Lock, Plus, ShieldCheck } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ROLE_LABEL } from "@/components/dashboard/nav-config";

const PERMS = [
  { group: "Academic", items: ["courses:read", "courses:write", "results:read", "results:write", "results:approve"] },
  { group: "Admissions", items: ["applications:read", "applications:review", "applications:decision"] },
  { group: "Finance", items: ["invoices:read", "invoices:issue", "payments:reconcile", "scholarships:manage"] },
  { group: "Clinical", items: ["rotations:read", "rotations:assign", "logbook:sign", "evaluations:write"] },
  { group: "System", items: ["users:read", "users:invite", "roles:manage", "audit:view", "backups:run"] },
];

const ROLE_DEFAULTS: Record<string, string[]> = {
  super_admin: PERMS.flatMap((g) => g.items),
  school_admin: ["courses:read","courses:write","results:read","results:approve","applications:read","applications:review","applications:decision","users:read","users:invite"],
  finance_officer: ["invoices:read","invoices:issue","payments:reconcile","scholarships:manage"],
  lecturer: ["courses:read","courses:write","results:read","results:write"],
  clinical_supervisor: ["rotations:read","logbook:sign","evaluations:write"],
  student: ["courses:read","results:read"],
  parent: ["results:read","invoices:read"],
};

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Access control" title="Roles & permissions" description="Fine-grained capability assignments per role. Changes are tracked in audit logs." actions={<Button leftIcon={<Plus className="h-4 w-4" />}>New role</Button>} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader><CardTitle>Roles</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {Object.entries(ROLE_LABEL).map(([k, label], i) => (
              <button key={k} className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${i === 0 ? "bg-[var(--color-brand-50)] text-[var(--color-brand-800)]" : "text-fg-secondary hover:bg-surface-sunken"}`}>
                <span className="font-medium">{label}</span>
                <span className="text-[10px] font-mono text-fg-tertiary">{ROLE_DEFAULTS[k]?.length ?? 0}</span>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Super Admin · permissions</CardTitle>
              <Lock className="h-4 w-4 text-fg-tertiary" />
            </div>
            <CardDescription>Full institutional access. Limit assignment to no more than 2 users in production.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {PERMS.map((g) => (
              <div key={g.group}>
                <div className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary mb-2">{g.group}</div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {g.items.map((p) => (
                    <li key={p} className="flex items-center gap-2 rounded-lg border border-subtle px-3 py-2 text-sm">
                      <Checkbox defaultChecked />
                      <span className="font-mono text-xs text-fg-primary">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex justify-end gap-2 border-t border-subtle pt-4">
              <Button variant="ghost">Reset to defaults</Button>
              <Button leftIcon={<ShieldCheck className="h-4 w-4" />}>Save permissions</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
