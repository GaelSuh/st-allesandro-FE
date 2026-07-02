"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Label, FieldError } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent — check your inbox.");
  };

  return (
    <div>
      <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
      {!sent ? (
        <>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-fg-primary">Forgot password?</h1>
          <p className="mt-2 text-sm text-fg-secondary">
            No problem. Enter the email associated with your account and we'll send you a reset link.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <Label required>Email address</Label>
              <Input className="mt-1.5" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="h-4 w-4" />} error={!!error} placeholder="you@stalessandro.edu" />
              <FieldError>{error}</FieldError>
            </div>
            <Button size="lg" type="submit" className="w-full" loading={loading}>
              {loading ? "Sending link…" : "Send reset link"}
            </Button>
          </form>
        </>
      ) : (
        <div className="mt-6 rounded-2xl border border-default bg-surface-elevated p-6 text-center shadow-soft">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[var(--color-gold-50)] text-[var(--color-gold-700)]">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-xl font-semibold text-fg-primary">Check your inbox</h2>
          <p className="mt-2 text-sm text-fg-secondary">
            We sent a password reset link to <span className="font-semibold text-fg-primary">{email}</span>. The link expires in 30 minutes.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Button asChild variant="primary"><Link href="/reset-password">I have my link →</Link></Button>
            <Button variant="ghost" size="sm" onClick={() => setSent(false)}>Use a different email</Button>
          </div>
        </div>
      )}
    </div>
  );
}
