"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Label, FieldError } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuthStore } from "@/stores";
import type { UserRole } from "@/types";

const roles: { id: UserRole; label: string; email: string; pwd: string }[] = [
  { id: "student", label: "Student", email: "yolande.mvondo@student.stalessandro.edu", pwd: "student123" },
  { id: "lecturer", label: "Lecturer", email: "s.owono@stalessandro.edu", pwd: "lecturer123" },
  { id: "clinical_supervisor", label: "Clinical Supervisor", email: "f.mbongo@laquintinie.cm", pwd: "clinical123" },
  { id: "school_admin", label: "School Admin", email: "registrar@stalessandro.edu", pwd: "registrar123" },
  { id: "finance_officer", label: "Finance Officer", email: "finance@stalessandro.edu", pwd: "finance123" },
  { id: "super_admin", label: "Super Admin", email: "admin@stalessandro.edu", pwd: "admin123" },
  { id: "parent", label: "Parent / Sponsor", email: "solange.mvondo@gmail.com", pwd: "parent123" },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);

  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState<UserRole>("student");
  const [localErrors, setLocalErrors] = useState<{ email?: string; password?: string }>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof localErrors = {};
    if (!email) next.email = "Please enter your email or matricule number.";
    if (!password) next.password = "Please enter your password.";
    setLocalErrors(next);
    if (Object.keys(next).length) return;

    const res = await login(email, password, activeRole);
    if (!res.ok) {
      toast.error("Sign-in failed", { description: res.error });
      return;
    }
    toast.success(`Welcome back, ${res.user!.name.split(" ")[0]}!`);
    router.push("/dashboard");
  };

  const fillDemo = (r: (typeof roles)[number]) => {
    setActiveRole(r.id);
    setEmail(r.email);
    setPassword(r.pwd);
    setLocalErrors({});
  };

  return (
    <div>
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-50)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure sign-in
        </span>
      </div>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-fg-primary">
        Welcome back.
      </h1>
      <p className="mt-2 text-sm text-fg-secondary">Sign in to your St Alessandro portal.</p>

      {/* Role pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {roles.slice(0, 4).map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => fillDemo(r)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeRole === r.id
                ? "border-[var(--color-brand-300)] bg-[var(--color-brand-50)] text-[var(--color-brand-800)]"
                : "border-default bg-surface-elevated text-fg-secondary hover:bg-surface-sunken"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label required>Email or matricule</Label>
          <Input
            className="mt-1.5"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@stalessandro.edu"
            error={!!localErrors.email}
            leftIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />
          <FieldError>{localErrors.email}</FieldError>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label required>Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-[var(--color-brand-700)] hover:underline">
              Forgot?
            </Link>
          </div>
          <Input
            className="mt-1.5"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={!!localErrors.password}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowPwd((v) => !v)} className="text-fg-tertiary hover:text-fg-primary">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            autoComplete="current-password"
          />
          <FieldError>{localErrors.password}</FieldError>
        </div>

        <label className="flex items-center gap-2 text-sm text-fg-secondary cursor-pointer">
          <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
          Keep me signed in for 30 days
        </label>

        {error && (
          <div className="rounded-xl border border-[oklch(0.86_0.10_25)] bg-[oklch(0.96_0.04_25)] p-3 text-sm text-[oklch(0.42_0.16_25)]">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-fg-secondary">
        New to St Alessandro?{" "}
        <Link href="/register" className="font-semibold text-[var(--color-brand-700)] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
