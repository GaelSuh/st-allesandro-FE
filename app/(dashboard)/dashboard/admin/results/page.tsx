"use client";

import { useState } from "react";
import { Check, Filter, Search, X } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { results as seed } from "@/data/academic";
import type { ResultRecord } from "@/types";

export default function AdminResultsPage() {
  const [items, setItems] = useState(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("submitted");
  const filtered = items.filter((r) => (status === "all" || r.status === status) && (!q || `${r.studentName} ${r.matricule} ${r.courseCode}`.toLowerCase().includes(q.toLowerCase())));
  const setAllStatus = (next: ResultRecord["status"]) => { setItems(items.map(r => r.status === status ? { ...r, status: next } : r)); toast.success(`Bulk action applied to ${filtered.length} records`); };

  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Academic operations" title="Result approval workflow" description="Review, approve and publish results submitted by lecturers." />
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{filtered.length} records</CardTitle><CardDescription>Filter by approval status</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student or course…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-72" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="submitted">Submitted</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 flex gap-2"><Button size="sm" onClick={() => setAllStatus("approved")} leftIcon={<Check className="h-4 w-4" />}>Approve all visible</Button><Button size="sm" variant="secondary" onClick={() => setAllStatus("published")}>Publish all approved</Button></div>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Student</th><th className="pb-3">Course</th><th className="pb-3">Total</th><th className="pb-3">Grade</th><th className="pb-3">Status</th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {filtered.slice(0, 25).map((r) => (
                <tr key={r.id}>
                  <td className="py-3"><div className="text-fg-primary text-xs font-medium">{r.studentName}</div><div className="text-[11px] font-mono text-fg-tertiary">{r.matricule}</div></td>
                  <td className="py-3"><div className="font-mono text-xs text-fg-primary">{r.courseCode}</div><div className="text-[11px] text-fg-tertiary truncate">{r.courseTitle}</div></td>
                  <td className="py-3 font-semibold">{r.total}</td>
                  <td className="py-3"><Badge size="sm" variant={r.grade === "A" || r.grade === "B+" ? "success" : r.grade === "F" ? "danger" : "brand"}>{r.grade}</Badge></td>
                  <td className="py-3"><Badge size="sm" variant={r.status === "published" ? "success" : r.status === "approved" ? "clinical" : r.status === "submitted" ? "gold" : "neutral"}>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
