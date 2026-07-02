"use client";

import { Cloud, Cpu, Database, HardDrive, HeartPulse, Network, Power, ShieldCheck } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const services = [
  { name: "API Gateway", icon: Network, status: "operational", latency: "42 ms" },
  { name: "Postgres · primary", icon: Database, status: "operational", latency: "8 ms" },
  { name: "Postgres · replica", icon: Database, status: "operational", latency: "12 ms" },
  { name: "Redis cache", icon: Cpu, status: "operational", latency: "1 ms" },
  { name: "Object storage", icon: HardDrive, status: "operational", latency: "120 ms" },
  { name: "Notification worker", icon: Cloud, status: "degraded", latency: "1.2 s" },
  { name: "Payment webhooks", icon: ShieldCheck, status: "operational", latency: "180 ms" },
];

const backups = [
  { name: "saui-prod-db", at: "Today 02:00", size: "4.2 GB", status: "success" },
  { name: "saui-prod-storage", at: "Today 02:14", size: "120 GB", status: "success" },
  { name: "saui-prod-db", at: "Yesterday 02:00", size: "4.1 GB", status: "success" },
];

export default function SystemPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Infrastructure" title="System monitoring" description="Service health, infrastructure metrics and backup status." actions={<Button leftIcon={<Power className="h-4 w-4" />} variant="secondary">Run health check</Button>} />

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { Icon: HeartPulse, label: "Overall", value: "Healthy", color: "text-[oklch(0.50_0.155_155)]" },
          { Icon: Cpu, label: "CPU avg.", value: "32%", color: "text-fg-primary" },
          { Icon: Database, label: "DB latency", value: "8 ms", color: "text-fg-primary" },
          { Icon: HardDrive, label: "Disk usage", value: "62%", color: "text-fg-primary" },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-5 flex items-center gap-4"><s.Icon className={`h-7 w-7 ${s.color}`} /><div><div className="text-xs text-fg-tertiary">{s.label}</div><div className={`font-display text-xl font-semibold ${s.color}`}>{s.value}</div></div></CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Services</CardTitle><CardDescription>Real-time service status</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-lg border border-subtle p-3">
                <div className="flex items-center gap-3">
                  <div className={`grid h-9 w-9 place-items-center rounded-lg ${s.status === "operational" ? "bg-[oklch(0.96_0.05_155)] text-[oklch(0.36_0.13_155)]" : "bg-[oklch(0.97_0.05_75)] text-[oklch(0.42_0.13_75)]"}`}>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-fg-primary">{s.name}</div>
                    <div className="text-[11px] text-fg-tertiary">avg. latency {s.latency}</div>
                  </div>
                </div>
                <Badge size="sm" variant={s.status === "operational" ? "success" : "warning"} dot>{s.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Backups</CardTitle><CardDescription>Automated nightly · 30-day retention</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {backups.map((b, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-subtle p-3">
                <div>
                  <div className="font-mono text-sm font-medium text-fg-primary">{b.name}</div>
                  <div className="text-[11px] text-fg-tertiary">{b.at} · {b.size}</div>
                </div>
                <Badge size="sm" variant="success" dot>{b.status}</Badge>
              </div>
            ))}
            <Button variant="secondary" size="sm" className="w-full mt-2">Trigger backup now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
