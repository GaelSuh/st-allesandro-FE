"use client";

import Link from "next/link";
import { Banknote, CreditCard, Download, Receipt, Wallet } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { currentStudent } from "@/data/people";
import { formatCurrency, percent, formatDate } from "@/lib/utils";
import { recentPayments } from "@/data/finance";

export default function ParentPaymentsPage() {
  const pct = percent(currentStudent.feesPaid, currentStudent.feesTotal);
  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Sponsorship"
        title={`${currentStudent.name.split(" ")[0]}'s fees`}
        description="Track tuition, make payments and download receipts on behalf of your sponsored student."
        actions={<Button asChild variant="gold"><Link href="/dashboard/finance"><Wallet className="h-4 w-4" />Make a payment</Link></Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Total tuition" value={formatCurrency(currentStudent.feesTotal)} icon={Receipt} accent="neutral" />
        <StatTile label="Paid" value={formatCurrency(currentStudent.feesPaid)} icon={Banknote} accent="clinical" />
        <StatTile label="Outstanding" value={formatCurrency(currentStudent.feesTotal - currentStudent.feesPaid)} icon={Wallet} accent="gold" />
      </div>

      <Card>
        <CardHeader><CardTitle>Tuition · Semester 1, 2025/26</CardTitle><CardDescription>Next installment recommended within 14 days</CardDescription></CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between"><span className="font-display text-3xl font-semibold text-fg-primary">{pct}%</span><span className="text-sm text-fg-secondary">{formatCurrency(currentStudent.feesPaid)} / {formatCurrency(currentStudent.feesTotal)}</span></div>
          <Progress value={pct} className="mt-3" indicatorClassName="bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Payment history</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle"><th className="pb-3">Reference</th><th className="pb-3">Method</th><th className="pb-3">Amount</th><th className="pb-3">Date</th><th className="pb-3">Status</th><th></th></tr></thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {recentPayments.slice(0, 5).map((p) => (
                <tr key={p.id}><td className="py-3 font-mono text-xs">{p.reference}</td><td className="py-3 text-fg-secondary">{p.method.replace("_", " ")}</td><td className="py-3 font-mono font-semibold">{formatCurrency(p.amount)}</td><td className="py-3 text-xs text-fg-tertiary">{formatDate(p.createdAt)}</td><td className="py-3"><Badge size="sm" variant={p.status === "successful" ? "success" : p.status === "pending" ? "warning" : "danger"} dot>{p.status}</Badge></td><td className="py-3 text-right"><button className="text-xs text-[var(--color-brand-700)] hover:underline"><Download className="h-3.5 w-3.5 inline" /></button></td></tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
