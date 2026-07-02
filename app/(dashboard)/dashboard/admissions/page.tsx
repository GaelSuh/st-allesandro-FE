"use client";

import { useMemo, useState } from "react";
import { Check, FileText, Filter, Inbox, Search, Send, X } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { applications as seed } from "@/data/admissions";
import { formatDate, relativeTime } from "@/lib/utils";
import type { Application } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";

const STATUS_LABELS: Record<Application["status"], string> = {
  draft: "Draft", submitted: "Submitted", under_review: "Under review", interview: "Interview", accepted: "Accepted", rejected: "Rejected", waitlisted: "Waitlisted",
};

export default function AdmissionsPage() {
  const [apps, setApps] = useState(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Application | null>(null);

  const filtered = useMemo(() => apps.filter((a) => {
    if (status !== "all" && a.status !== status) return false;
    if (q && !`${a.applicantName} ${a.email} ${a.programName} ${a.applicationNumber}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [apps, q, status]);

  const updateStatus = (id: string, next: Application["status"]) => {
    setApps((a) => a.map((x) => (x.id === id ? { ...x, status: next } : x)));
    setSelected((s) => (s && s.id === id ? { ...s, status: next } : s));
    toast.success(`Application moved to "${STATUS_LABELS[next]}"`);
  };

  const counts = {
    submitted: apps.filter((a) => a.status === "submitted").length,
    review: apps.filter((a) => a.status === "under_review").length,
    interview: apps.filter((a) => a.status === "interview").length,
    accepted: apps.filter((a) => a.status === "accepted").length,
  };

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Registry"
        title="Admissions"
        description="Review applications, request documents, schedule interviews and issue offers."
        actions={<Button leftIcon={<Send className="h-4 w-4" />}>Export weekly digest</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="New submissions" value={counts.submitted} accent="brand" />
        <Stat label="Under review" value={counts.review} accent="gold" />
        <Stat label="Interview scheduled" value={counts.interview} accent="clinical" />
        <Stat label="Accepted" value={counts.accepted} accent="success" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>Application inbox</CardTitle><CardDescription>{filtered.length} of {apps.length} applications</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applicants…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-44"><Filter className="h-3.5 w-3.5 mr-1.5 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                  <th className="pb-3">Applicant</th><th className="pb-3">Application №</th><th className="pb-3">Program</th><th className="pb-3">Docs</th><th className="pb-3">Submitted</th><th className="pb-3">Status</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filtered.map((a) => {
                  const docsOk = a.documents.filter((d) => d.uploaded).length;
                  return (
                    <tr key={a.id} className="hover:bg-surface-sunken/40 cursor-pointer" onClick={() => setSelected(a)}>
                      <td className="py-3"><div className="flex items-center gap-3"><Avatar name={a.applicantName} size="sm" /><div><div className="font-medium text-fg-primary">{a.applicantName}</div><div className="text-xs text-fg-tertiary">{a.email}</div></div></div></td>
                      <td className="py-3 font-mono text-xs text-fg-secondary">{a.applicationNumber}</td>
                      <td className="py-3 text-fg-secondary">{a.programName}</td>
                      <td className="py-3"><Badge size="sm" variant={docsOk === a.documents.length ? "success" : "warning"}>{docsOk}/{a.documents.length}</Badge></td>
                      <td className="py-3 text-xs text-fg-tertiary">{relativeTime(a.submittedAt)}</td>
                      <td className="py-3"><Badge size="sm" variant={a.status === "accepted" ? "success" : a.status === "rejected" ? "danger" : a.status === "interview" ? "gold" : "brand"}>{STATUS_LABELS[a.status]}</Badge></td>
                      <td className="py-3 text-right"><button className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline">Open →</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Drawer / dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DialogTitle>{selected.applicantName}</DialogTitle>
                    <DialogDescription>{selected.applicationNumber} · {selected.programName}</DialogDescription>
                  </div>
                  <Badge variant={selected.status === "accepted" ? "success" : selected.status === "rejected" ? "danger" : "brand"} dot>{STATUS_LABELS[selected.status]}</Badge>
                </div>
              </DialogHeader>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email"><span className="text-fg-primary">{selected.email}</span></Field>
                <Field label="Phone"><span className="text-fg-primary">{selected.phone}</span></Field>
                <Field label="Submitted"><span className="text-fg-primary">{formatDate(selected.submittedAt)}</span></Field>
                <Field label="Application fee"><Badge size="sm" variant={selected.paymentMade ? "success" : "warning"}>{selected.paymentMade ? "Paid" : "Not paid"}</Badge></Field>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary mb-2">Documents</h4>
                <ul className="space-y-1.5">
                  {selected.documents.map((d, i) => (
                    <li key={i} className="flex items-center justify-between rounded-lg border border-subtle px-3 py-2 text-sm">
                      <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-fg-tertiary" />{d.name}</span>
                      {d.uploaded ? <Badge variant="success" size="sm">Uploaded</Badge> : <Badge variant="warning" size="sm">Missing</Badge>}
                    </li>
                  ))}
                </ul>
              </div>

              {selected.notes && (
                <div className="mt-4 rounded-lg border border-subtle bg-surface-sunken/40 p-3 text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary">Notes</div>
                  <p className="mt-1 text-fg-primary">{selected.notes}</p>
                </div>
              )}

              <DialogFooter>
                <Button variant="ghost" onClick={() => updateStatus(selected.id, "rejected")} className="text-[oklch(0.55_0.205_25)]" leftIcon={<X className="h-4 w-4" />}>Reject</Button>
                <Button variant="secondary" onClick={() => updateStatus(selected.id, "interview")}>Schedule interview</Button>
                <Button variant="primary" onClick={() => updateStatus(selected.id, "accepted")} leftIcon={<Check className="h-4 w-4" />}>Accept applicant</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="text-sm"><div className="text-xs text-fg-tertiary">{label}</div><div className="mt-0.5">{children}</div></div>;
}

function Stat({ label, value, accent }: { label: string; value: number; accent: "brand" | "clinical" | "gold" | "success" }) {
  const map = {
    brand: "text-[var(--color-brand-700)]",
    clinical: "text-[var(--color-clinical-700)]",
    gold: "text-[var(--color-gold-700)]",
    success: "text-[oklch(0.50_0.155_155)]",
  };
  return (
    <Card><CardContent className="p-5">
      <p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">{label}</p>
      <p className={`mt-2 font-display text-3xl font-semibold ${map[accent]}`}>{value}</p>
    </CardContent></Card>
  );
}
