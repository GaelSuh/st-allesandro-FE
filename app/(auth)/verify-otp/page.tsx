"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<VerifyOtpFallback />}>
      <VerifyOtpForm />
    </Suspense>
  );
}

function VerifyOtpFallback() {
  return (
    <div>
      <div className="h-4 w-28 rounded bg-surface-sunken" />
      <div className="mt-6 h-6 w-44 rounded-full bg-surface-sunken" />
      <div className="mt-3 h-8 w-56 rounded bg-surface-sunken" />
      <div className="mt-6 flex justify-between gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 w-12 rounded-xl bg-surface-sunken" />
        ))}
      </div>
    </div>
  );
}

function VerifyOtpForm() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") ?? "your@email.com";
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [seconds, setSeconds] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const updateDigit = (i: number, v: string) => {
    const sanitized = v.replace(/\D/g, "").slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[i] = sanitized;
      return next;
    });
    if (sanitized && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (txt.length) {
      e.preventDefault();
      const arr = txt.split("");
      setDigits((d) => d.map((_, i) => arr[i] ?? ""));
      inputs.current[Math.min(arr.length, 5)]?.focus();
    }
  };

  const verify = async () => {
    setError("");
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    if (code === "111111") {
      setError("That code is invalid or has expired. Try the demo code 123456, or request a new one.");
      toast.error("Invalid code");
      return;
    }
    toast.success("Email verified — your account is now active.");
    router.push("/login");
  };

  return (
    <div>
      <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-clinical-50)] px-3 py-1 text-xs font-medium text-[var(--color-clinical-700)]">
        <ShieldCheck className="h-3.5 w-3.5" /> Two-step verification
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg-primary">Enter your code</h1>
      <p className="mt-2 text-sm text-fg-secondary">
        We sent a 6-digit verification code to <span className="font-semibold text-fg-primary">{email}</span>.
      </p>
      <p className="mt-1 text-xs text-fg-tertiary">Demo code: <span className="font-mono font-semibold">123456</span></p>

      <div className="mt-6 flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            value={d}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => onKey(i, e)}
            onPaste={onPaste}
            inputMode="numeric"
            maxLength={1}
            className={cn(
              "h-14 w-12 rounded-xl border bg-surface text-center font-display text-2xl font-semibold text-fg-primary",
              "focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[var(--color-brand-500)]/15 transition-all",
              error ? "border-[oklch(0.58_0.205_25)]" : "border-default"
            )}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-[oklch(0.50_0.205_25)]">{error}</p>}

      <Button onClick={verify} className="mt-6 w-full" size="lg" loading={loading}>
        {loading ? "Verifying…" : "Verify"}
      </Button>

      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="text-fg-tertiary">Didn't receive a code?</span>
        {seconds > 0 ? (
          <span className="font-mono text-fg-secondary">resend in 0:{seconds.toString().padStart(2, "0")}</span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSeconds(45);
              toast.success("New code sent.");
            }}
            className="font-semibold text-[var(--color-brand-700)] hover:underline"
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
