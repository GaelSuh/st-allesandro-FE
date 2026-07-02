"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap, Wallet,
  ClipboardList, Activity, Stethoscope, Pencil, MessageSquare, ShieldAlert,
} from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { students, currentStudent } from "@/data/people";
import { results } from "@/data/academic";
import { attendanceRecords } from "@/data/academic";
import { invoices } from "@/data/finance";
import { rotations } from "@/data/clinical";
import { formatCurrency, formatDate, percent } from "@/lib/utils";

const deptVariant = (d: string) =>
  d.includes("Nutrition") ? "gold" : d.includes("Nursing") ? "clinical" : "neutral";

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const student = useMemo(
    () => (id === "stu_me" ? currentStudent : students.find((s) => s.id === id)),
    [id]
  );

  if (!student) return notFound();

  const myResults = results.filter((r) => r.studentId === student.id);
  const myAttendance = attendanceRecords.filter((a) => a.studentId === student.id);
  const myInvoices = invoices.filter((i) => i.studentId === student.id);
  const myRotations = rotations.filter((r) => r.studentId === student.id);
  const isNutrition = student.department.includes("Nutrition");
  const isClinical = student.department.includes("Nursing") || isNutrition;

  const attendanceRate = myAttendance.length
    ? Math.round((myAttendance.filter((a) => a.status === "present").length / myAttendance.length) * 100)
    : null;
  const balance = student.feesTotal - student.feesPaid;

  return (
    <div className="space-y-6">
      <Link href="/dashboard/students" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
        <ArrowLeft className="h-4 w-4" /> Back to students
      </Link>

      <DashHeader
        eyebrow="Student record"
        title={student.name}
        description={`${student.matricule} · ${student.programName}`}
        actions={
          <>
            <Button variant="secondary" leftIcon={<MessageSquare className="h-4 w-4" />} onClick={() => toast.success(`Message drafted to ${student.name}`)}>Message</Button>
            <Button leftIcon={<Pencil className="h-4 w-4" />} onClick={() => toast.success("Edit mode (demo)")}>Edit record</Button>
          </>
        }
      />

      {/* Identity card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar name={student.name} src={student.avatar} size="2xl" ring />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-xl font-semibold text-fg-primary">{student.name}</span>
                <Badge size="sm" variant={student.status === "active" ? "success" : student.status === "on_leave" ? "warning" : "danger"} dot>{student.status.replace("_", " ")}</Badge>
                <Badge size="sm" variant={deptVariant(student.department)}>{student.department.replace("School of ", "")}</Badge>
              </div>
              <div className="mt-3 grid gap-1.5 text-sm text-fg-secondary sm:grid-cols-2">
                <div className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{student.email}</div>
                <div className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{student.phone}</div>
                <div className="inline-flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5" />{student.programName} · {student.level}</div>
                <div className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Enrolled {formatDate(student.enrolledAt, { year: "numeric", month: "long" })}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={<GraduationCap className="h-4 w-4" />} label="CGPA" value={student.cgpa.toFixed(2)} hint="out of 4.00" />
        <StatTile icon={<Wallet className="h-4 w-4" />} label="Fees paid" value={`${percent(student.feesPaid, student.feesTotal)}%`} hint={balance > 0 ? `${formatCurrency(balance)} outstanding` : "Fully paid"} tone={balance > 0 ? "warn" : "ok"} />
        <StatTile icon={<Activity className="h-4 w-4" />} label="Attendance" value={attendanceRate !== null ? `${attendanceRate}%` : "—"} hint={attendanceRate !== null ? `${myAttendance.length} sessions` : "No records"} />
        <StatTile icon={<ClipboardList className="h-4 w-4" />} label="Semester" value={`S${student.semester}`} hint={`${myResults.length} graded courses`} />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic ({myResults.length})</TabsTrigger>
          <TabsTrigger value="attendance">Attendance ({myAttendance.length})</TabsTrigger>
          <TabsTrigger value="finance">Finance ({myInvoices.length})</TabsTrigger>
          {isClinical && <TabsTrigger value="clinical">Clinical ({myRotations.length})</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader><CardTitle>Enrollment</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row k="Matricule" v={student.matricule} />
                <Row k="Programme" v={student.programName} />
                <Row k="Department" v={student.department} />
                <Row k="Level" v={student.level} />
                <Row k="Status" v={<Badge size="sm" variant={student.status === "active" ? "success" : "warning"}>{student.status.replace("_", " ")}</Badge>} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Guardian / Sponsor</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row k="Name" v={student.guardian.name} />
                <Row k="Relation" v={student.guardian.relation} />
                <Row k="Phone" v={student.guardian.phone} />
                <Row k="Email" v={student.guardian.email} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Fees summary</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Row k="Total billed" v={formatCurrency(student.feesTotal)} />
                <Row k="Paid" v={formatCurrency(student.feesPaid)} />
                <Row k="Balance" v={<span className={balance > 0 ? "text-[oklch(0.55_0.16_25)] font-semibold" : "text-[oklch(0.5_0.15_155)] font-semibold"}>{formatCurrency(balance)}</span>} />
                <div className="pt-1">
                  <div className="h-2 w-full rounded-full bg-surface-sunken overflow-hidden"><div className="h-full bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" style={{ width: `${percent(student.feesPaid, student.feesTotal)}%` }} /></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <Card>
            <CardContent className="p-0">
              {myResults.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                      <th className="p-4">Course</th><th className="p-4">CA</th><th className="p-4">Exam</th><th className="p-4">Total</th><th className="p-4">Grade</th><th className="p-4">Status</th>
                    </tr></thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {myResults.map((r) => (
                        <tr key={r.id} className="hover:bg-surface-sunken/40">
                          <td className="p-4"><div className="font-medium text-fg-primary">{r.courseTitle}</div><div className="font-mono text-xs text-fg-tertiary">{r.courseCode} · {r.credits} cr</div></td>
                          <td className="p-4 font-mono">{r.ca}</td><td className="p-4 font-mono">{r.exam}</td>
                          <td className="p-4 font-mono font-semibold">{r.total}</td>
                          <td className="p-4"><Badge size="sm" variant={r.grade === "F" ? "danger" : r.grade.startsWith("A") ? "success" : "neutral"}>{r.grade}</Badge></td>
                          <td className="p-4"><Badge size="sm" variant={r.status === "published" ? "success" : "neutral"}>{r.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <Empty icon={<ClipboardList className="h-5 w-5" />} text="No published results for this student yet." />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardContent className="p-0">
              {myAttendance.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                      <th className="p-4">Course</th><th className="p-4">Date</th><th className="p-4">Method</th><th className="p-4">Status</th>
                    </tr></thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {myAttendance.map((a) => (
                        <tr key={a.id} className="hover:bg-surface-sunken/40">
                          <td className="p-4 font-mono text-xs">{a.courseCode}</td>
                          <td className="p-4">{formatDate(a.date)}</td>
                          <td className="p-4 capitalize text-fg-secondary">{a.method}</td>
                          <td className="p-4"><Badge size="sm" variant={a.status === "present" ? "success" : a.status === "absent" ? "danger" : "warning"}>{a.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <Empty icon={<Activity className="h-5 w-5" />} text="No attendance records captured yet." />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardContent className="p-0">
              {myInvoices.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                      <th className="p-4">Invoice</th><th className="p-4">Description</th><th className="p-4">Amount</th><th className="p-4">Balance</th><th className="p-4">Status</th>
                    </tr></thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {myInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-surface-sunken/40">
                          <td className="p-4 font-mono text-xs">{inv.invoiceNumber}</td>
                          <td className="p-4">{inv.description}</td>
                          <td className="p-4 font-mono">{formatCurrency(inv.amount)}</td>
                          <td className="p-4 font-mono">{formatCurrency(inv.balance)}</td>
                          <td className="p-4"><Badge size="sm" variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "danger" : "warning"}>{inv.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <Empty icon={<Wallet className="h-5 w-5" />} text="No invoices on file for this student." />}
            </CardContent>
          </Card>
        </TabsContent>

        {isClinical && (
          <TabsContent value="clinical">
            <Card>
              <CardContent className="p-0">
                {myRotations.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                        <th className="p-4">Facility</th><th className="p-4">Ward</th><th className="p-4">Supervisor</th><th className="p-4">Hours</th><th className="p-4">Status</th>
                      </tr></thead>
                      <tbody className="divide-y divide-[var(--border-subtle)]">
                        {myRotations.map((r) => (
                          <tr key={r.id} className="hover:bg-surface-sunken/40">
                            <td className="p-4 font-medium text-fg-primary">{r.hospitalName}</td>
                            <td className="p-4">{r.ward}</td>
                            <td className="p-4 text-fg-secondary">{r.supervisorName}</td>
                            <td className="p-4 font-mono">{r.hoursCompleted}/{r.hoursRequired}</td>
                            <td className="p-4"><Badge size="sm" variant={r.status === "completed" || r.status === "evaluated" ? "success" : r.status === "in_progress" ? "info" : "neutral"}>{r.status.replace("_", " ")}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty
                    icon={isNutrition ? <Stethoscope className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                    text={isNutrition ? "No dietetics practicum placements scheduled yet." : "No clinical rotations scheduled yet."}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function StatTile({ icon, label, value, hint, tone }: { icon: React.ReactNode; label: string; value: string; hint?: string; tone?: "ok" | "warn" }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-fg-tertiary">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-sunken">{icon}</span>
          <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        </div>
        <div className="mt-3 font-display text-2xl font-semibold text-fg-primary">{value}</div>
        {hint && <div className={`mt-0.5 text-xs ${tone === "warn" ? "text-[oklch(0.55_0.16_25)]" : tone === "ok" ? "text-[oklch(0.5_0.15_155)]" : "text-fg-tertiary"}`}>{hint}</div>}
      </CardContent>
    </Card>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="flex items-center justify-between border-b border-subtle py-1.5 last:border-0"><span className="text-xs text-fg-tertiary">{k}</span><span className="text-right text-fg-primary">{v}</span></div>;
}

function Empty({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-surface-sunken text-fg-tertiary">{icon}</span>
      <p className="text-sm text-fg-secondary">{text}</p>
    </div>
  );
}
