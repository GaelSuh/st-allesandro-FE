"use client";

import { useState } from "react";
import { Check, Save, Search } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { students } from "@/data/people";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";

export default function LecturerGradingPage() {
  const [course, setCourse] = useState("NUR-307");
  const [q, setQ] = useState("");
  const [grades, setGrades] = useState(() => students.slice(0, 18).map((s) => ({ id: s.id, name: s.name, matricule: s.matricule, avatar: s.avatar, ca: 18 + ((s.id.length * 3) % 12), exam: 38 + ((s.id.length * 7) % 24) })));
  const filtered = grades.filter((g) => !q || g.name.toLowerCase().includes(q.toLowerCase()) || g.matricule.includes(q));

  const update = (id: string, key: "ca" | "exam", val: number) => setGrades((gs) => gs.map((g) => (g.id === id ? { ...g, [key]: val } : g)));

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Assessment"
        title="Grade book"
        description="Record CA and exam scores. Submit for departmental approval."
        actions={<Button leftIcon={<Save className="h-4 w-4" />} onClick={() => toast.success("Grades saved as draft")}>Save draft</Button>}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>Grades · Semester 1</CardTitle><CardDescription>Enter scores out of 30 (CA) and 70 (Exam)</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find student…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-56" />
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="NUR-307">NUR-307 · OB-GYN</SelectItem><SelectItem value="NUR-205">NUR-205 · Foundations II</SelectItem><SelectItem value="NUR-405">NUR-405 · Maternal</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                  <th className="pb-3">Student</th><th className="pb-3 w-28">CA (30)</th><th className="pb-3 w-28">Exam (70)</th><th className="pb-3">Total</th><th className="pb-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filtered.map((g) => {
                  const total = g.ca + g.exam;
                  const grade = total >= 80 ? "A" : total >= 75 ? "B+" : total >= 70 ? "B" : total >= 65 ? "C+" : total >= 60 ? "C" : total >= 50 ? "D" : "F";
                  return (
                    <tr key={g.id}>
                      <td className="py-2.5"><div className="flex items-center gap-3"><Avatar src={g.avatar} name={g.name} size="xs" /><div><div className="text-fg-primary text-xs font-medium">{g.name}</div><div className="text-[11px] font-mono text-fg-tertiary">{g.matricule}</div></div></div></td>
                      <td className="py-2.5"><Input type="number" max={30} value={g.ca} onChange={(e) => update(g.id, "ca", parseInt(e.target.value || "0"))} className="h-9 w-20" /></td>
                      <td className="py-2.5"><Input type="number" max={70} value={g.exam} onChange={(e) => update(g.id, "exam", parseInt(e.target.value || "0"))} className="h-9 w-20" /></td>
                      <td className="py-2.5 font-mono font-semibold text-fg-primary">{total}</td>
                      <td className="py-2.5"><Badge size="sm" variant={grade === "A" || grade === "B+" ? "success" : grade === "F" ? "danger" : grade === "B" ? "brand" : "warning"}>{grade}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end gap-2 border-t border-subtle pt-4">
            <Button variant="ghost">Discard</Button>
            <Button onClick={() => toast.success("Grades submitted for approval")} leftIcon={<Check className="h-4 w-4" />}>Submit for approval</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
