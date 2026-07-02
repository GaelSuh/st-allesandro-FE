"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Label, FieldError, FieldHint } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);

  const score = passwordScore(password);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (password.length < 8) next.password = "Passwords must be at least 8 characters.";
    if (password !== confirm) next.confirm = "Passwords don't match — please re-enter.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Password updated — please sign in with your new password.");
    router.push("/login");
  };

  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-clinical-50)] px-3 py-1 text-xs font-medium text-[var(--color-clinical-700)]">
        <ShieldCheck className="h-3.5 w-3.5" /> Set a new password
      </span>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-fg-primary">Choose a new password</h1>
      <p className="mt-2 text-sm text-fg-secondary">For your security, pick a strong password you don't use elsewhere.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <Label required>New password</Label>
          <Input className="mt-1.5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} leftIcon={<Lock className="h-4 w-4" />} />
          <PasswordMeter score={score} />
          <FieldError>{errors.password}</FieldError>
        </div>
        <div>
          <Label required>Confirm password</Label>
          <Input className="mt-1.5" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={!!errors.confirm} leftIcon={<Lock className="h-4 w-4" />} />
          <FieldError>{errors.confirm}</FieldError>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          {loading ? "Saving…" : "Update password"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-fg-secondary">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-brand-700)] hover:underline">Sign in instead</Link>
      </p>
    </div>
  );
}

function passwordScore(pwd: string) {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s;
}

function PasswordMeter({ score }: { score: number }) {
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-[oklch(0.58_0.205_25)]", "bg-[oklch(0.78_0.155_75)]", "bg-[oklch(0.62_0.155_155)]", "bg-[oklch(0.50_0.155_155)]"];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= score ? colors[score] : "bg-surface-sunken"}`} />
        ))}
      </div>
      {score > 0 && <p className="mt-1 text-xs text-fg-tertiary">Password strength: <span className="font-medium text-fg-primary">{labels[score]}</span></p>}
    </div>
  );
}
