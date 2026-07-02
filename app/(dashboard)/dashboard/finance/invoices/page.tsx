"use client";

import { useMemo, useState } from "react";
import { Download, Filter, FileText, Plus, Search } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useFinanceStore } from "@/stores";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoicesPage() {
  const invoices = useFinanceStore((s) => s.invoices);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => invoices.filter((i) => {
    if (status !== "all" && i.status !== status) return false;
    if (q && !`${i.studentName} ${i.matricule} ${i.invoiceNumber}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [invoices, q, status]);

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Bursary"
        title="Invoices"
        description="Issue, track and reconcile student tuition invoices."
        actions={
          <>
            <Button variant="secondary" leftIcon={<Download className="h-4 w-4" />}>Export CSV</Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>New invoice</Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{filtered.length} invoices</CardTitle><CardDescription>Total billed: {formatCurrency(invoices.reduce((a, i) => a + i.amount, 0))}</CardDescription></div>
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search invoices…" leftIcon={<Search className="h-4 w-4" />} className="w-full sm:w-64" />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40"><Filter className="h-3.5 w-3.5 mr-1 text-fg-tertiary" /><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="paid">Paid</SelectItem><SelectItem value="partial">Partial</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                  <th className="pb-3">Invoice</th><th className="pb-3">Student</th><th className="pb-3">Amount</th><th className="pb-3">Paid</th><th className="pb-3">Balance</th><th className="pb-3">Due</th><th className="pb-3">Status</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filtered.map((i) => (
                  <tr key={i.id} className="hover:bg-surface-sunken/40">
                    <td className="py-3"><div className="font-mono text-xs font-medium text-fg-primary">{i.invoiceNumber}</div><div className="text-xs text-fg-tertiary">{formatDate(i.issuedAt)}</div></td>
                    <td className="py-3"><div className="flex items-center gap-2"><Avatar name={i.studentName} size="xs" /><div><div className="font-medium text-fg-primary text-xs">{i.studentName}</div><div className="text-[11px] font-mono text-fg-tertiary">{i.matricule}</div></div></div></td>
                    <td className="py-3 font-mono text-fg-primary">{formatCurrency(i.amount)}</td>
                    <td className="py-3 font-mono text-[oklch(0.50_0.155_155)]">{formatCurrency(i.paid)}</td>
                    <td className="py-3 font-mono font-semibold text-fg-primary">{formatCurrency(i.balance)}</td>
                    <td className="py-3 text-xs text-fg-tertiary">{formatDate(i.dueDate)}</td>
                    <td className="py-3"><Badge size="sm" variant={i.status === "paid" ? "success" : i.status === "partial" ? "gold" : i.status === "overdue" ? "danger" : "brand"} dot>{i.status}</Badge></td>
                    <td className="py-3 text-right"><button className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline"><FileText className="h-4 w-4 inline" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
