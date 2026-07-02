"use client";

import { useState } from "react";
import { Check, ClipboardCheck, Filter, Search, Stethoscope, X } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Avatar } from "@/components/ui/Avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { useClinicalStore } from "@/stores";
import type { LogbookEntry } from "@/types";
import { formatDate, cn } from "@/lib/utils";

export default function LogbookReviewPage() {
  const entries = useClinicalStore((s) => s.entries);
  const approve = useClinicalStore((s) => s.approveEntry);
  const reject = useClinicalStore((s) => s.rejectEntry);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("pending");
  const [selected, setSelected] = useState<LogbookEntry | null>(null);
  const [notes, setNotes] = useState("");

  const filtered = entries
    .filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (q && !`${e.studentName} ${e.procedure} ${e.ward} ${e.matricule}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    })
    .slice(0, 30);

  const stats = {
    pending: entries.filter((e) => e.status === "pending").length,
    approved: entries.filter((e) => e.status === "approved").length,
    revision: entries.filter((e) => e.status === "revision").length,
  };

  const doApprove = () => {
    if (!selected) return;
    approve(selected.id, notes || undefined);
    toast.success("Entry approved", { description: `${selected.procedure} signed for ${selected.studentName}.` });
    setSelected(null); setNotes("");
  };
  const doReject = () => {
    if (!selected) return;
    if (notes.length < 10) {
      toast.error("Please add revision notes (10+ characters)");
      return;
    }
    reject(selected.id, notes);
    toast.success("Sent back for revision");
    setSelected(null); setNotes("");
  };

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Clinical supervision"
        title="Logbook review queue"
        description="Verify procedures performed by your students. Approve, request revision or sign off competency."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Pending review" value={stats.pending} accent="gold" />
        <Stat label="Approved (all-time)" value={stats.approved} accent="success" />
        <Stat label="Revisions requested" value={stats.revision} accent="danger" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>Entries</CardTitle><CardDescription>{filtered.length} items</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search procedure or student…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="revision">Revision</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((e) => (
            <button key={e.id} onClick={() => { setSelected(e); setNotes(""); }} className="w-full text-left rounded-xl border border-subtle p-4 hover:bg-surface-sunken transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <Avatar name={e.studentName} size="sm" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-fg-primary">{e.procedure}</span>
                      <span className="font-mono text-[10px] text-fg-tertiary">{e.procedureCode}</span>
                    </div>
                    <div className="text-xs text-fg-tertiary">{e.studentName} · {e.matricule} · {e.ward} · {formatDate(e.date)}</div>
                    <p className="mt-1.5 text-xs text-fg-secondary line-clamp-1 max-w-2xl">{e.observations}</p>
                  </div>
                </div>
                <Badge size="sm" variant={e.status === "approved" ? "success" : e.status === "pending" ? "gold" : "danger"} dot>{e.status}</Badge>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-[var(--color-clinical-700)]" />{selected.procedure}</DialogTitle>
                <DialogDescription>{selected.procedureCode} · {selected.studentName} · {selected.matricule}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <Row label="Ward" value={selected.ward} />
                <Row label="Patient" value={selected.patient} />
                <Row label="Competency" value={selected.competency.replaceAll("_", " ")} />
                <Row label="Date" value={formatDate(selected.date)} />
              </div>
              <div className="rounded-xl border border-subtle bg-surface-sunken/40 p-3 text-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary">Student observations</div>
                <p className="mt-1 text-fg-primary">{selected.observations}</p>
              </div>
              <div>
                <Label>Supervisor notes</Label>
                <Textarea className="mt-1.5" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional for approve · Required for revision (10+ characters)" />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setSelected(null)}>Cancel</Button>
                <Button variant="secondary" onClick={doReject} className="text-[oklch(0.55_0.205_25)]" leftIcon={<X className="h-4 w-4" />}>Request revision</Button>
                <Button onClick={doApprove} leftIcon={<Check className="h-4 w-4" />}>Approve & sign</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-subtle py-1.5 last:border-0">
      <span className="text-xs text-fg-tertiary">{label}</span>
      <span className="font-medium text-fg-primary">{value}</span>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: "brand" | "gold" | "success" | "danger" }) {
  const map = { brand: "text-[var(--color-brand-700)]", gold: "text-[var(--color-gold-700)]", success: "text-[oklch(0.50_0.155_155)]", danger: "text-[oklch(0.55_0.205_25)]" };
  return <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">{label}</p><p className={`mt-2 font-display text-3xl font-semibold ${map[accent]}`}>{value}</p></CardContent></Card>;
}
