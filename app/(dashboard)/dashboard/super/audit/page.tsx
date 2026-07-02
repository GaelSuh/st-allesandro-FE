"use client";

import { ShieldCheck, Search, Filter } from "lucide-react";
import { useState } from "react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

const events = [
  { id: 1, who: "Alessandro Foncha", role: "Super Admin", action: "Updated role permissions", target: "school_admin · added announcements:write", at: "2 min ago", severity: "info" },
  { id: 2, who: "Pauline Bekolo", role: "School Admin", action: "Approved application", target: "SAUI-APP-26-1004 · Steve Atangana", at: "8 min ago", severity: "info" },
  { id: 3, who: "Hervé Ngono", role: "Finance Officer", action: "Issued invoice", target: "SAUI-INV-2026021 · 850,000 FCFA", at: "16 min ago", severity: "info" },
  { id: 4, who: "Dr. F. Mbongo", role: "Clinical Supervisor", action: "Signed logbook entry", target: "log_4_1 · IV Cannulation", at: "21 min ago", severity: "info" },
  { id: 5, who: "Sandrine Owono", role: "Lecturer", action: "Published results", target: "NUR-307 · S1 · 60 records", at: "1 hr ago", severity: "info" },
  { id: 6, who: "anonymous", role: "Public", action: "Failed login attempt", target: "admin@stalessandro.edu · 5 tries · IP 102.244.18.7", at: "2 hrs ago", severity: "warn" },
  { id: 7, who: "Yolande Mvondo", role: "Student", action: "Completed exam", target: "Pharmacology · 84/100", at: "3 hrs ago", severity: "info" },
  { id: 8, who: "System", role: "Cron", action: "Nightly backup completed", target: "saui-prod-db · 4.2 GB · 38s", at: "8 hrs ago", severity: "success" },
];

export default function AuditPage() {
  const [q, setQ] = useState("");
  const [sev, setSev] = useState("all");
  const filtered = events.filter((e) => {
    if (sev !== "all" && e.severity !== sev) return false;
    if (q && !`${e.who} ${e.action} ${e.target}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Compliance" title="Audit logs" description="Every administrative action is immutably recorded with actor, target, and timestamp." />
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{filtered.length} events</CardTitle><CardDescription>Last 24 hours · all actors</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search logs…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={sev} onValueChange={setSev}>
                <SelectTrigger className="w-40"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="info">Info</SelectItem><SelectItem value="warn">Warning</SelectItem><SelectItem value="success">Success</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {filtered.map((e) => (
              <li key={e.id} className="flex items-start gap-4 rounded-xl border border-subtle p-3">
                <Avatar name={e.who} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-fg-primary">{e.who}</span>
                    <Badge size="sm" variant="neutral">{e.role}</Badge>
                    <span className="text-sm text-fg-secondary">{e.action}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-[var(--color-brand-700)]">{e.target}</p>
                </div>
                <div className="text-right text-xs text-fg-tertiary whitespace-nowrap">
                  <ShieldCheck className={`h-3.5 w-3.5 inline mr-0.5 ${e.severity === "warn" ? "text-[oklch(0.55_0.205_25)]" : e.severity === "success" ? "text-[oklch(0.50_0.155_155)]" : "text-fg-tertiary"}`} />
                  {e.at}
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
