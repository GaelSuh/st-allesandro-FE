"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Filter, GraduationCap, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { students } from "@/data/people";
import { formatCurrency, percent } from "@/lib/utils";

export default function StudentsAdminPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [dept, setDept] = useState("all");
  const [view, setView] = useState<"grid" | "table">("table");

  const deptOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.department))).sort(),
    []
  );

  const filtered = useMemo(() => students.filter((s) => {
    if (status !== "all" && s.status !== status) return false;
    if (dept !== "all" && s.department !== dept) return false;
    if (q && !`${s.name} ${s.matricule} ${s.email} ${s.programName} ${s.department}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, status, dept]);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Registry"
        title="Students"
        description={`${students.length} active learners across all programs.`}
        actions={
          <>
            <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
            <Button leftIcon={<UserPlus className="h-4 w-4" />}>Register student</Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList><TabsTrigger value="table">Table</TabsTrigger><TabsTrigger value="grid">Grid</TabsTrigger></TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, matricule…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-72" />
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger className="w-48"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All departments</SelectItem>
                  {deptOptions.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On leave</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                    <th className="pb-3">Student</th><th className="pb-3">Matricule</th><th className="pb-3">Program · Level</th><th className="pb-3">Department</th><th className="pb-3">CGPA</th><th className="pb-3">Fees</th><th className="pb-3">Status</th><th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {filtered.slice(0, 25).map((s) => (
                    <tr key={s.id} className="hover:bg-surface-sunken/40">
                      <td className="py-3"><Link href={`/dashboard/students/${s.id}`} className="flex items-center gap-3 group"><Avatar src={s.avatar} name={s.name} size="sm" /><div><div className="font-medium text-fg-primary truncate max-w-[14rem] group-hover:text-[var(--color-brand-600)]">{s.name}</div><div className="text-xs text-fg-tertiary truncate max-w-[16rem]">{s.email}</div></div></Link></td>
                      <td className="py-3 font-mono text-xs text-fg-secondary">{s.matricule}</td>
                      <td className="py-3"><div className="text-fg-primary">{s.programName}</div><div className="text-xs text-fg-tertiary">{s.level}</div></td>
                      <td className="py-3"><Badge size="sm" variant={s.department.includes("Nutrition") ? "gold" : s.department.includes("Nursing") ? "clinical" : "neutral"}>{s.department.replace("School of ", "").replace(" Sciences", "")}</Badge></td>
                      <td className="py-3 font-mono font-semibold text-fg-primary">{s.cgpa.toFixed(2)}</td>
                      <td className="py-3">
                        <div className="text-xs text-fg-secondary">{percent(s.feesPaid, s.feesTotal)}% paid</div>
                        <div className="mt-0.5 h-1 w-24 rounded-full bg-surface-sunken overflow-hidden"><div className="h-full bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" style={{ width: `${percent(s.feesPaid, s.feesTotal)}%` }} /></div>
                      </td>
                      <td className="py-3"><Badge size="sm" variant={s.status === "active" ? "success" : s.status === "on_leave" ? "warning" : "danger"} dot>{s.status.replace("_", " ")}</Badge></td>
                      <td className="py-3 text-right"><button className="grid h-7 w-7 place-items-center rounded-md text-fg-tertiary hover:bg-surface-sunken hover:text-fg-primary"><MoreHorizontal className="h-4 w-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.slice(0, 16).map((s) => (
                <Link key={s.id} href={`/dashboard/students/${s.id}`} className="block rounded-xl border border-subtle bg-surface-sunken/30 p-4 hover:bg-surface-sunken hover:border-strong transition-colors">
                  <Avatar src={s.avatar} name={s.name} size="lg" ring />
                  <div className="mt-3 truncate text-sm font-semibold text-fg-primary">{s.name}</div>
                  <div className="text-xs text-fg-tertiary font-mono">{s.matricule}</div>
                  <div className="mt-2 text-xs text-fg-secondary">{s.programName} · {s.level}</div>
                  <div className="mt-3 flex items-center justify-between border-t border-subtle pt-2 text-xs">
                    <Badge size="sm" variant={s.status === "active" ? "success" : "warning"}>{s.status}</Badge>
                    <span className="font-mono font-semibold text-fg-primary">{s.cgpa.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
