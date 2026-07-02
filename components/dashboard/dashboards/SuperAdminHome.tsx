"use client";

import Link from "next/link";
import { Activity, AlertTriangle, GraduationCap, HeartPulse, Server, ShieldCheck, Users, Wallet } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores";
import { formatCurrency } from "@/lib/utils";
import { financeKPIs } from "@/data/finance";
import { students } from "@/data/people";

export function SuperAdminHome() {
  const user = useAuthStore((s) => s.user)!;

  const systemMetrics = [
    { label: "API uptime", value: "99.98%", state: "ok" },
    { label: "Database latency (avg)", value: "42 ms", state: "ok" },
    { label: "Queued jobs", value: "12", state: "ok" },
    { label: "Failed payments (24h)", value: "3", state: "warn" },
    { label: "Open security findings", value: "0", state: "ok" },
  ];
  const audit = [
    { who: "Pauline Bekolo", action: "approved application", target: "SAUI-APP-26-1004", at: "2 min ago" },
    { who: "Hervé Ngono", action: "issued invoice", target: "SAUI-INV-2026021", at: "8 min ago" },
    { who: "Dr. F. Mbongo", action: "signed logbook", target: "log_4_1 (Yolande Mvondo)", at: "21 min ago" },
    { who: "Sandrine Owono", action: "published results", target: "NUR-307 · S1", at: "1 hr ago" },
    { who: "Yolande Mvondo", action: "completed exam", target: "Pharmacology · 84/100", at: "3 hrs ago" },
  ];

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="System control"
        title="St Alessandro · platform overview"
        description="Real-time health of the institute's digital backbone — people, payments, clinical operations and infrastructure."
        actions={
          <>
            <Button asChild variant="secondary"><Link href="/dashboard/super/audit"><ShieldCheck className="h-4 w-4" />Audit logs</Link></Button>
            <Button asChild><Link href="/dashboard/super/analytics"><Activity className="h-4 w-4" />Analytics</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total users" value="2,847" icon={Users} accent="brand" delta={{ value: 6, positive: true, label: "this month" }} />
        <StatTile label="Active students" value={students.length.toLocaleString()} icon={GraduationCap} accent="clinical" />
        <StatTile label="Revenue (MTD)" value={formatCurrency(financeKPIs.collectedThisMonth)} icon={Wallet} accent="gold" delta={{ value: 14, positive: true }} />
        <StatTile label="System health" value="Excellent" icon={HeartPulse} accent="clinical" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent audit activity</CardTitle>
            <CardDescription>The last 5 administrative actions across all roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-default ml-3">
              {audit.map((a, i) => (
                <li key={i} className="ml-5 mb-4 last:mb-0">
                  <span className="absolute -left-1.5 grid h-3 w-3 place-items-center rounded-full bg-[var(--color-brand-600)] ring-4 ring-[var(--surface-elevated)]" />
                  <div className="text-sm">
                    <span className="font-semibold text-fg-primary">{a.who}</span>
                    <span className="text-fg-secondary"> {a.action} </span>
                    <span className="font-mono text-xs text-[var(--color-brand-700)]">{a.target}</span>
                  </div>
                  <p className="text-[11px] text-fg-tertiary">{a.at}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>System monitoring</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {systemMetrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-lg border border-subtle px-3 py-2">
                <div className="text-sm text-fg-primary">{m.label}</div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${m.state === "ok" ? "bg-[oklch(0.55_0.155_155)]" : "bg-[oklch(0.78_0.155_75)]"}`} />
                  <span className="font-mono text-sm font-semibold text-fg-primary">{m.value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
