"use client";

import Link from "next/link";
import { Award, Banknote, FileBarChart2, Receipt, Wallet } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useFinanceStore } from "@/stores";
import { financeKPIs } from "@/data/finance";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

export function FinanceHome() {
  const payments = useFinanceStore((s) => s.payments);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Bursary"
        title="Finance overview"
        description="Tuition collection, outstanding balances and scholarship allocations across all departments."
        actions={
          <>
            <Button asChild variant="secondary"><Link href="/dashboard/finance/reports"><FileBarChart2 className="h-4 w-4" />Reports</Link></Button>
            <Button asChild><Link href="/dashboard/finance/invoices"><Receipt className="h-4 w-4" />Issue invoice</Link></Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Collected this month" value={formatCurrency(financeKPIs.collectedThisMonth)} icon={Banknote} accent="clinical" delta={{ value: 14, positive: true }} />
        <StatTile label="Outstanding" value={formatCurrency(financeKPIs.outstandingTotal)} icon={Wallet} accent="gold" delta={{ value: 4, positive: false }} />
        <StatTile label="Invoices issued" value={String(financeKPIs.invoicesIssued)} icon={Receipt} accent="brand" />
        <StatTile label="Collection rate" value={`${financeKPIs.collectionRate}%`} icon={Award} accent="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Monthly collection trend</CardTitle>
            <CardDescription>Collected vs outstanding (in millions FCFA)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-44">
              {financeKPIs.monthlyTrend.map((m) => {
                const max = Math.max(...financeKPIs.monthlyTrend.flatMap((x) => [x.collected, x.outstanding]));
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex w-full items-end justify-center gap-0.5 flex-1">
                      <div className="w-3 rounded-t-md bg-gradient-to-t from-[var(--color-brand-700)] to-[var(--color-brand-500)]" style={{ height: `${(m.collected / max) * 100}%` }} />
                      <div className="w-3 rounded-t-md bg-gradient-to-t from-[var(--color-gold-600)] to-[var(--color-gold-400)] opacity-60" style={{ height: `${(m.outstanding / max) * 100}%` }} />
                    </div>
                    <div className="text-[10px] text-fg-tertiary">{m.month}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded bg-[var(--color-brand-700)]" />Collected</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded bg-[var(--color-gold-500)]" />Outstanding</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent payments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <Avatar name={p.studentName} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-fg-primary truncate">{p.studentName}</div>
                  <div className="text-xs text-fg-tertiary">{p.reference} · {formatDate(p.createdAt)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-fg-primary">{formatCurrency(p.amount)}</div>
                  <Badge size="sm" variant={p.status === "successful" ? "success" : p.status === "pending" ? "warning" : "danger"}>{p.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
