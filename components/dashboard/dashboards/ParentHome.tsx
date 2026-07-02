"use client";

import Link from "next/link";
import { Award, ClipboardCheck, HeartPulse, MessageSquare, Stethoscope, Wallet } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { useAuthStore } from "@/stores";
import { currentStudent } from "@/data/people";
import { formatCurrency, percent, getGreeting } from "@/lib/utils";

export function ParentHome() {
  const user = useAuthStore((s) => s.user)!;
  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow={getGreeting()}
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description={`A snapshot of ${currentStudent.name.split(" ")[0]}'s academic journey, attendance and tuition status.`}
      />

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar name={currentStudent.name} src={currentStudent.avatar} size="xl" ring />
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-wider text-fg-tertiary">Your sponsored student</div>
            <div className="font-display text-xl font-semibold text-fg-primary">{currentStudent.name}</div>
            <div className="text-sm text-fg-secondary">{currentStudent.matricule} · {currentStudent.programName} · {currentStudent.level}</div>
          </div>
          <Button asChild variant="secondary"><Link href="/dashboard/messages"><MessageSquare className="h-4 w-4" />Message faculty</Link></Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="CGPA" value={currentStudent.cgpa.toFixed(2)} icon={Award} accent="brand" />
        <StatTile label="Attendance" value="94%" icon={ClipboardCheck} accent="clinical" />
        <StatTile label="Clinical hours" value="88 / 120" icon={HeartPulse} accent="gold" />
        <StatTile label="Fees outstanding" value={formatCurrency(currentStudent.feesTotal - currentStudent.feesPaid)} icon={Wallet} accent="neutral" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Tuition status</CardTitle><CardDescription>Semester 1 · 2025/26</CardDescription></CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-fg-primary">{percent(currentStudent.feesPaid, currentStudent.feesTotal)}%</span>
              <span className="text-sm text-fg-secondary">{formatCurrency(currentStudent.feesPaid)} / {formatCurrency(currentStudent.feesTotal)}</span>
            </div>
            <Progress value={percent(currentStudent.feesPaid, currentStudent.feesTotal)} className="mt-3" indicatorClassName="bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" />
            <Button asChild className="mt-5 w-full" variant="gold"><Link href="/dashboard/parent/payments">Make a payment</Link></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent academic activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: Award, text: `Result published — NUR-305 · grade B+`, time: "12 min ago" },
              { icon: Stethoscope, text: `Clinical hour logged — 4h Maternity ward`, time: "2 hrs ago" },
              { icon: ClipboardCheck, text: `Attendance marked present in NUR-307`, time: "Today, 11:02" },
              { icon: Wallet, text: `Payment of 250,000 FCFA received`, time: "Yesterday" },
            ].map((it, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
                  <it.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1"><p className="text-fg-primary">{it.text}</p><p className="text-[11px] text-fg-tertiary mt-0.5">{it.time}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
