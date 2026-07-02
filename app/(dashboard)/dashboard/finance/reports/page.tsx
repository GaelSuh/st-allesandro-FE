import { Download, FileBarChart2 } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { financeKPIs } from "@/data/finance";
import { formatCurrency } from "@/lib/utils";

const reports = [
  { name: "Collection rate · weekly", desc: "Real-time tuition collection trends", action: "View" },
  { name: "Outstanding balances · by program", desc: "Debt aging buckets per program", action: "View" },
  { name: "Scholarship disbursement", desc: "All scholarship payouts this term", action: "View" },
  { name: "Refunds & adjustments", desc: "All reversals and corrections", action: "View" },
  { name: "Bank reconciliation", desc: "Daily MoMo / Orange / bank settlement", action: "View" },
  { name: "Year-end financial summary", desc: "Income, expense and equity snapshot", action: "Export" },
];

export default function FinanceReportsPage() {
  return (
    <div className="space-y-6">
      <DashHeader eyebrow="Bursary" title="Financial reports" description="Pre-built reports & ad-hoc exports for finance leadership and auditors." />
      <Card>
        <CardHeader><CardTitle>Headline figures · YTD</CardTitle><CardDescription>Live numbers from the finance store</CardDescription></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-subtle p-4"><div className="text-xs text-fg-tertiary">Collected</div><div className="mt-1 font-display text-2xl font-semibold text-[oklch(0.50_0.155_155)]">{formatCurrency(financeKPIs.collectedThisMonth * 9)}</div></div>
          <div className="rounded-xl border border-subtle p-4"><div className="text-xs text-fg-tertiary">Outstanding</div><div className="mt-1 font-display text-2xl font-semibold text-[var(--color-gold-700)]">{formatCurrency(financeKPIs.outstandingTotal)}</div></div>
          <div className="rounded-xl border border-subtle p-4"><div className="text-xs text-fg-tertiary">Collection rate</div><div className="mt-1 font-display text-2xl font-semibold text-fg-primary">{financeKPIs.collectionRate}%</div></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Pre-built reports</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {reports.map((r) => (
            <div key={r.name} className="flex items-center justify-between rounded-xl border border-subtle p-4">
              <div className="flex items-center gap-3"><FileBarChart2 className="h-5 w-5 text-[var(--color-brand-700)]" /><div><div className="text-sm font-semibold text-fg-primary">{r.name}</div><div className="text-xs text-fg-tertiary">{r.desc}</div></div></div>
              <Button variant="ghost" size="sm" rightIcon={<Download className="h-3.5 w-3.5" />}>{r.action}</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
