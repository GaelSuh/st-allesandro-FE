"use client";

import { useState } from "react";
import Link from "next/link";
import { Banknote, CheckCircle2, CreditCard, Download, Loader2, Receipt, ShieldCheck, Smartphone, TriangleAlert, Wallet } from "lucide-react";
import { toast } from "sonner";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Label, FieldError, FieldHint } from "@/components/ui/Label";
import { Progress } from "@/components/ui/Progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { useFinanceStore } from "@/stores";
import { currentStudent } from "@/data/people";
import { formatCurrency, formatDate, percent } from "@/lib/utils";
import type { Payment } from "@/types";
import { cn } from "@/lib/utils";

const methods: { id: Payment["method"]; label: string; Icon: any; hint: string; color: string }[] = [
  { id: "mtn_momo", label: "MTN Mobile Money", Icon: Smartphone, hint: "Instant · 0.5% fee", color: "from-[oklch(0.86_0.18_85)] to-[oklch(0.76_0.18_82)]" },
  { id: "orange_money", label: "Orange Money", Icon: Smartphone, hint: "Instant · 0.5% fee", color: "from-[oklch(0.78_0.18_60)] to-[oklch(0.68_0.18_55)]" },
  { id: "bank_transfer", label: "Bank Transfer", Icon: Banknote, hint: "Same-day · no fee", color: "from-[var(--color-brand-700)] to-[var(--color-brand-900)]" },
  { id: "card", label: "Debit / Credit card", Icon: CreditCard, hint: "Instant · 1.4% fee", color: "from-[var(--color-clinical-600)] to-[var(--color-clinical-800)]" },
];

export default function StudentFinancePage() {
  const invoices = useFinanceStore((s) => s.invoices);
  const payments = useFinanceStore((s) => s.payments);
  const initiate = useFinanceStore((s) => s.initiatePayment);

  // The "current" invoice tied to demo student
  const myInvoice = invoices[0];
  const myPayments = payments.slice(0, 6);

  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<Payment["method"]>("mtn_momo");
  const [amount, setAmount] = useState<string>("100000");
  const [phone, setPhone] = useState("+237 678 220 944");
  const [submitting, setSubmitting] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [successPayment, setSuccessPayment] = useState<Payment | null>(null);

  const payNow = async () => {
    setErrorBanner(null);
    const amt = parseInt(amount.replace(/[^\d]/g, ""), 10);
    if (!amt || amt < 5_000) {
      setErrorBanner("The minimum payment amount is 5,000 FCFA.");
      return;
    }
    setSubmitting(true);
    const res = await initiate(myInvoice.id, amt, method);
    setSubmitting(false);
    if (!res.ok) {
      setErrorBanner(res.error ?? "Payment could not be processed. Please try again.");
      toast.error("Payment failed", { description: res.error });
      return;
    }
    setSuccessPayment(res.payment!);
    toast.success("Payment successful!", { description: `Reference ${res.payment!.reference}` });
  };

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Bursary"
        title="Finance & fees"
        description="Pay tuition, view receipts and monitor your balance — all in one place."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Outstanding card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Tuition · Semester 1, 2025/26</CardTitle><CardDescription>Invoice {myInvoice.invoiceNumber}</CardDescription></div>
            <Badge variant={myInvoice.status === "paid" ? "success" : myInvoice.status === "overdue" ? "danger" : "gold"} dot>{myInvoice.status}</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs text-fg-tertiary">Outstanding balance</div>
                <div className="font-display text-4xl font-semibold text-fg-primary">{formatCurrency(myInvoice.balance)}</div>
                <div className="mt-1 text-xs text-fg-tertiary">of {formatCurrency(myInvoice.amount)} due by {formatDate(myInvoice.dueDate)}</div>
              </div>
              <Button size="lg" variant="gold" onClick={() => { setOpen(true); setSuccessPayment(null); setErrorBanner(null); }}>
                <Wallet className="h-4 w-4" /> Pay now
              </Button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-fg-secondary"><span>Paid</span><span className="font-semibold">{percent(myInvoice.paid, myInvoice.amount)}%</span></div>
              <Progress value={percent(myInvoice.paid, myInvoice.amount)} className="mt-1.5" indicatorClassName="bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-600)]" />
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {myInvoice.items.map((it) => (
                <div key={it.label} className="flex items-center justify-between rounded-lg border border-subtle px-3 py-2 text-sm">
                  <span className="text-fg-secondary">{it.label}</span>
                  <span className="font-mono font-medium text-fg-primary">{formatCurrency(it.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quick options</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Link href="#" className="flex items-center justify-between rounded-lg border border-subtle p-3 hover:bg-surface-sunken">
              <div className="flex items-center gap-3"><Receipt className="h-4 w-4 text-[var(--color-brand-700)]" /><span>Download statement</span></div>
              <Download className="h-4 w-4 text-fg-tertiary" />
            </Link>
            <Link href="#" className="flex items-center justify-between rounded-lg border border-subtle p-3 hover:bg-surface-sunken">
              <div className="flex items-center gap-3"><Wallet className="h-4 w-4 text-[var(--color-brand-700)]" /><span>Setup installment plan</span></div>
              <span className="text-xs text-fg-tertiary">3 plans</span>
            </Link>
            <Link href="#" className="flex items-center justify-between rounded-lg border border-subtle p-3 hover:bg-surface-sunken">
              <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[var(--color-clinical-700)]" /><span>Apply for scholarship</span></div>
              <Badge variant="gold" size="sm">New</Badge>
            </Link>
            <div className="mt-2 rounded-lg bg-[var(--color-brand-50)]/40 p-3 text-xs text-[var(--color-brand-800)]">
              💡 Pay before the due date to qualify for the early-payment 2% rebate.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
          <CardDescription>Last 6 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-fg-tertiary border-b border-subtle">
                  <th className="pb-3 pt-1">Reference</th><th className="pb-3">Date</th><th className="pb-3">Method</th><th className="pb-3">Amount</th><th className="pb-3">Status</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {myPayments.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 font-mono text-xs text-fg-secondary">{p.reference}</td>
                    <td className="py-3 text-fg-primary">{formatDate(p.createdAt)}</td>
                    <td className="py-3"><MethodLabel method={p.method} /></td>
                    <td className="py-3 font-semibold text-fg-primary">{formatCurrency(p.amount)}</td>
                    <td className="py-3">
                      <Badge size="sm" variant={p.status === "successful" ? "success" : p.status === "pending" ? "warning" : "danger"} dot>{p.status}</Badge>
                    </td>
                    <td className="py-3 text-right"><button className="text-xs font-semibold text-[var(--color-brand-700)] hover:underline">Receipt</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          {!successPayment ? (
            <>
              <DialogHeader>
                <DialogTitle>Make a payment</DialogTitle>
                <DialogDescription>Choose how you'd like to pay. All transactions are encrypted end-to-end.</DialogDescription>
              </DialogHeader>

              <div className="mt-2 grid grid-cols-2 gap-2.5">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border p-3 text-left transition-all",
                      method === m.id ? "border-[var(--color-brand-400)] ring-4 ring-[var(--color-brand-500)]/15 bg-[var(--color-brand-50)]/40" : "border-default hover:border-strong"
                    )}
                  >
                    <div className={cn("grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br text-white", m.color)}>
                      <m.Icon className="h-4 w-4" />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-fg-primary">{m.label}</div>
                    <div className="text-[11px] text-fg-tertiary">{m.hint}</div>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label required>Amount (FCFA)</Label>
                  <Input className="mt-1.5 font-mono" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  <FieldHint>Outstanding: {formatCurrency(myInvoice.balance)}</FieldHint>
                </div>
                {(method === "mtn_momo" || method === "orange_money") && (
                  <div>
                    <Label required>Mobile number</Label>
                    <Input className="mt-1.5" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+237 6XX XXX XXX" />
                  </div>
                )}
                {method === "card" && (
                  <>
                    <div>
                      <Label required>Card number</Label>
                      <Input className="mt-1.5 font-mono" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label required>Expiry</Label><Input className="mt-1.5 font-mono" placeholder="MM/YY" /></div>
                      <div><Label required>CVV</Label><Input className="mt-1.5 font-mono" placeholder="123" /></div>
                    </div>
                  </>
                )}
                {method === "bank_transfer" && (
                  <div className="rounded-lg border border-subtle bg-surface-sunken/40 p-3 text-xs sm:col-span-2">
                    <p className="font-semibold text-fg-primary">Transfer to</p>
                    <p className="mt-1 text-fg-secondary">UBA Cameroon · St Alessandro University Institute · <span className="font-mono">10025 00345 89001234567 04</span></p>
                    <p className="mt-1 text-fg-tertiary">Please use {currentStudent.matricule} as the reference.</p>
                  </div>
                )}
              </div>

              {errorBanner && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[oklch(0.86_0.10_25)] bg-[oklch(0.96_0.04_25)] p-3 text-sm text-[oklch(0.42_0.16_25)]">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex-1"><strong className="font-semibold">Couldn't process payment.</strong><p className="mt-0.5">{errorBanner}</p></div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <p className="inline-flex items-center gap-1.5 text-xs text-fg-tertiary"><ShieldCheck className="h-3.5 w-3.5 text-[var(--color-clinical-600)]" /> Secured by 256-bit TLS · PCI DSS</p>
                <Button onClick={payNow} variant="primary" loading={submitting} disabled={submitting}>
                  {submitting ? "Processing…" : `Pay ${amount ? formatCurrency(parseInt(amount, 10) || 0) : "now"}`}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-clinical-500)] to-[var(--color-clinical-700)] text-white shadow-glow pulse-ring">
                <CheckCircle2 className="h-9 w-9" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-fg-primary">Payment successful</h3>
              <p className="mt-1 text-sm text-fg-secondary">A receipt has been emailed to you and saved to your portal.</p>
              <div className="mt-5 rounded-xl border border-default bg-surface-sunken/40 p-4 text-left text-sm">
                <Row label="Reference"><span className="font-mono">{successPayment.reference}</span></Row>
                <Row label="Amount"><span className="font-semibold">{formatCurrency(successPayment.amount)}</span></Row>
                <Row label="Method"><MethodLabel method={successPayment.method} /></Row>
                <Row label="Status"><Badge variant="success" size="sm" dot>Successful</Badge></Row>
              </div>
              <div className="mt-5 flex justify-center gap-2">
                <Button variant="secondary" onClick={() => { setOpen(false); setSuccessPayment(null); }}>Close</Button>
                <Button variant="primary" leftIcon={<Download className="h-4 w-4" />}>Download receipt</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-subtle py-1.5 last:border-0 last:pb-0">
      <span className="text-fg-tertiary">{label}</span>
      <span className="text-fg-primary">{children}</span>
    </div>
  );
}

function MethodLabel({ method }: { method: Payment["method"] }) {
  const map = { mtn_momo: "MTN MoMo", orange_money: "Orange Money", bank_transfer: "Bank Transfer", card: "Card" } as const;
  return <span className="text-fg-secondary">{map[method]}</span>;
}
