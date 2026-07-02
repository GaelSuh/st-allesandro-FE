"use client";

import { useState } from "react";
import { Check, QrCode, Search, X } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Avatar } from "@/components/ui/Avatar";
import { students } from "@/data/people";
import { toast } from "sonner";

type Status = "present" | "absent" | "late" | "excused";

export default function LecturerAttendancePage() {
  const [course, setCourse] = useState("NUR-307");
  const [roster, setRoster] = useState(() => students.slice(0, 24).map((s) => ({ ...s, attendance: "present" as Status })));
  const [q, setQ] = useState("");

  const filtered = roster.filter((r) => !q || r.name.toLowerCase().includes(q.toLowerCase()) || r.matricule.includes(q));
  const counts = roster.reduce((acc, r) => ({ ...acc, [r.attendance]: (acc as any)[r.attendance] + 1 }), { present: 0, absent: 0, late: 0, excused: 0 } as Record<Status, number>);

  const setStatus = (id: string, s: Status) => setRoster((r) => r.map((x) => (x.id === id ? { ...x, attendance: s } : x)));

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Class attendance"
        title="Record today's attendance"
        description="QR scan, biometric or manual — pick what fits your classroom."
        actions={<Button leftIcon={<QrCode className="h-4 w-4" />}>Generate class QR</Button>}
      />

      <div className="grid gap-3 sm:grid-cols-4">
        {([["present","success"],["late","warning"],["absent","danger"],["excused","brand"]] as const).map(([k, v]) => (
          <Card key={k}><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-fg-tertiary font-medium">{k}</p><p className="mt-2 font-display text-3xl font-semibold text-fg-primary">{(counts as any)[k]}</p><Badge size="sm" variant={v as any} className="mt-2">{Math.round((counts as any)[k] / roster.length * 100)}%</Badge></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>Roster · {course}</CardTitle><CardDescription>27 May 2026 · {roster.length} students</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="NUR-307">NUR-307 · OB-GYN</SelectItem><SelectItem value="NUR-205">NUR-205 · Foundations II</SelectItem><SelectItem value="NUR-405">NUR-405 · Maternal</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {filtered.map((s) => (
              <li key={s.id} className="flex items-center gap-3 rounded-lg border border-subtle p-3">
                <Avatar src={s.avatar} name={s.name} size="sm" />
                <div className="min-w-0 flex-1"><div className="text-sm font-medium text-fg-primary truncate">{s.name}</div><div className="text-xs text-fg-tertiary font-mono">{s.matricule}</div></div>
                <div className="flex gap-1">
                  {(["present","late","absent","excused"] as Status[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatus(s.id, st)}
                      className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${s.attendance === st ? "bg-[var(--color-brand-700)] text-white" : "bg-surface-sunken text-fg-secondary hover:bg-surface"}`}
                    >
                      {st[0].toUpperCase()}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => toast.success("Attendance saved")} leftIcon={<Check className="h-4 w-4" />}>Save attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
