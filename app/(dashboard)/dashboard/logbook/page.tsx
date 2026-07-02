"use client";

import { useMemo, useState } from "react";
import { Activity, ClipboardCheck, FilePlus2, Search, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { useClinicalStore } from "@/stores";
import { currentStudent } from "@/data/people";
import { formatDate, relativeTime, cn } from "@/lib/utils";

const procedures = [
  "IV Cannulation", "Wound Dressing — clean", "Intramuscular Injection", "Urinary Catheterization (Female)",
  "Vital Signs Assessment", "Nasogastric Tube Insertion", "Blood Glucose Monitoring", "Neonatal Resuscitation",
  "CPR — Adult", "Patient Bed Bath",
];

const competencies = [
  { id: "observed", label: "Observed" },
  { id: "assisted", label: "Assisted" },
  { id: "performed_supervised", label: "Performed (supervised)" },
  { id: "performed_independent", label: "Performed (independent)" },
] as const;

export default function StudentLogbookPage() {
  const allEntries = useClinicalStore((s) => s.entries);
  const addEntry = useClinicalStore((s) => s.addEntry);
  const mine = useMemo(() => allEntries.filter((e) => e.studentId === currentStudent.id || e.matricule === currentStudent.matricule), [allEntries]);
  // For demo, also surface a chunk of seeded entries under demo student's name
  const visible = mine.length > 0 ? mine : allEntries.slice(0, 8);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [form, setForm] = useState({
    procedure: "", procedureCode: "P-001", patient: "", ward: "Maternity",
    observations: "", competency: "performed_supervised" as typeof competencies[number]["id"],
  });

  const filtered = visible.filter((e) => {
    if (status !== "all" && e.status !== status) return false;
    if (q && !`${e.procedure} ${e.patient} ${e.ward}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const totals = {
    total: visible.length,
    approved: visible.filter((e) => e.status === "approved").length,
    pending: visible.filter((e) => e.status === "pending").length,
    revision: visible.filter((e) => e.status === "revision").length,
  };

  const save = () => {
    if (!form.procedure || !form.patient || form.observations.length < 20) {
      toast.error("Please complete the form", { description: "Procedure, patient and at least 20 characters of observation are required." });
      return;
    }
    addEntry({
      studentId: currentStudent.id,
      matricule: currentStudent.matricule,
      studentName: currentStudent.name,
      procedureCode: form.procedureCode,
      procedure: form.procedure,
      patient: form.patient,
      ward: form.ward,
      observations: form.observations,
      competency: form.competency,
    });
    toast.success("Logbook entry submitted", { description: "Your clinical supervisor has been notified." });
    setOpen(false);
    setForm({ procedure: "", procedureCode: "P-001", patient: "", ward: "Maternity", observations: "", competency: "performed_supervised" });
  };

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Clinical practice"
        title="Practical logbook"
        description="Capture every procedure you observe, assist or perform. Entries are reviewed by your clinical supervisor."
        actions={<Button onClick={() => setOpen(true)} leftIcon={<FilePlus2 className="h-4 w-4" />}>New entry</Button>}
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Total entries" value={totals.total} accent="brand" />
        <Stat label="Approved" value={totals.approved} accent="clinical" />
        <Stat label="Pending review" value={totals.pending} accent="gold" />
        <Stat label="Revision needed" value={totals.revision} accent="danger" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>Entries</CardTitle><CardDescription>Most recent first</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search procedure or patient…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="revision">Revision</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<ClipboardCheck className="h-6 w-6" />}
              title="No entries yet"
              description="Start logging procedures from your current rotation."
              action={<Button onClick={() => setOpen(true)}>Add your first entry</Button>}
            />
          ) : (
            <ul className="space-y-3">
              {filtered.map((e) => (
                <li key={e.id} className="rounded-xl border border-subtle p-4 bg-surface-sunken/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-fg-primary">{e.procedure}</span>
                          <span className="font-mono text-[10px] text-fg-tertiary">{e.procedureCode}</span>
                        </div>
                        <div className="mt-0.5 text-xs text-fg-tertiary">Ward: {e.ward} · Patient: {e.patient} · {formatDate(e.date)}</div>
                        <p className="mt-2 text-sm text-fg-secondary line-clamp-2 max-w-2xl">{e.observations}</p>
                      </div>
                    </div>
                    <Badge size="sm" variant={e.status === "approved" ? "success" : e.status === "pending" ? "gold" : e.status === "revision" ? "danger" : "neutral"} dot>{e.status}</Badge>
                  </div>
                  {e.supervisorNotes && (
                    <div className="mt-3 rounded-lg border border-subtle bg-surface px-3 py-2 text-xs text-fg-secondary">
                      <span className="font-semibold text-fg-primary">Supervisor: </span>{e.supervisorNotes}
                    </div>
                  )}
                  {e.supervisorSignature && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[var(--color-clinical-700)]">
                      <ClipboardCheck className="h-3 w-3" /> Signed by {e.supervisorSignature}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* New entry dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>New logbook entry</DialogTitle>
            <DialogDescription>Be specific. Your supervisor will use this entry to assess competency progression.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <Label required>Procedure</Label>
              <Select value={form.procedure} onValueChange={(v) => setForm({ ...form, procedure: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select procedure" /></SelectTrigger>
                <SelectContent>{procedures.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label required>Patient ID</Label><Input className="mt-1.5" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} placeholder="Patient A.123" /></div>
              <div>
                <Label required>Ward</Label>
                <Select value={form.ward} onValueChange={(v) => setForm({ ...form, ward: v })}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{["Maternity","Pediatrics","Med-Surg","Emergency","ICU","Cardiology"].map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label required>Competency level</Label>
              <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {competencies.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setForm({ ...form, competency: c.id })}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                      form.competency === c.id ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)] text-[var(--color-brand-800)]" : "border-default text-fg-secondary hover:bg-surface-sunken"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label required>Observations</Label>
              <Textarea className="mt-1.5 min-h-[120px]" value={form.observations} onChange={(e) => setForm({ ...form, observations: e.target.value })} placeholder="Describe what you did, your role, the patient outcome and any learning points…" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Submit for review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: "brand" | "clinical" | "gold" | "danger" }) {
  const map = {
    brand: "from-[var(--color-brand-50)] text-[var(--color-brand-700)]",
    clinical: "from-[var(--color-clinical-50)] text-[var(--color-clinical-700)]",
    gold: "from-[var(--color-gold-50)] text-[var(--color-gold-800)]",
    danger: "from-[oklch(0.96_0.04_25)] text-[oklch(0.55_0.205_25)]",
  };
  return (
    <Card>
      <CardContent className={cn("relative overflow-hidden p-5 bg-gradient-to-b to-transparent", map[accent].split(" ")[0])}>
        <p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">{label}</p>
        <p className="mt-2 font-display text-3xl font-semibold text-fg-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
