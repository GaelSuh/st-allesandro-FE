"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Label, FieldError, FieldHint } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.length < 3) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (form.phone.length < 8) next.phone = "Include country code, e.g. +237…";
    if (form.password.length < 8) next.password = "Passwords must be at least 8 characters.";
    if (form.password !== form.confirm) next.confirm = "Passwords don't match — please re-enter.";
    if (!agree) next.agree = "Please accept the terms and privacy policy to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Account created — verify your email to continue.");
    router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-fg-primary">Create your account</h1>
      <p className="mt-2 text-sm text-fg-secondary">
        New applicants — start here. After verifying your email you can submit your application or sign in to your portal.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <Label required>Full name</Label>
          <Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={!!errors.name} leftIcon={<User className="h-4 w-4" />} placeholder="Yolande Mvondo" />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label required>Email</Label>
          <Input className="mt-1.5" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={!!errors.email} leftIcon={<Mail className="h-4 w-4" />} placeholder="you@example.com" />
          <FieldError>{errors.email}</FieldError>
        </div>
        <div>
          <Label required>Phone</Label>
          <Input className="mt-1.5" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={!!errors.phone} leftIcon={<Phone className="h-4 w-4" />} placeholder="+237 6XX XXX XXX" />
          <FieldError>{errors.phone}</FieldError>
        </div>
        <div>
          <Label required>Password</Label>
          <Input className="mt-1.5" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={!!errors.password} leftIcon={<Lock className="h-4 w-4" />} placeholder="At least 8 characters" />
          <FieldHint>Use a mix of letters, numbers and a symbol for a strong password.</FieldHint>
          <FieldError>{errors.password}</FieldError>
        </div>
        <div>
          <Label required>Confirm password</Label>
          <Input className="mt-1.5" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} error={!!errors.confirm} leftIcon={<Lock className="h-4 w-4" />} />
          <FieldError>{errors.confirm}</FieldError>
        </div>

        <label className="flex items-start gap-2 text-sm text-fg-secondary cursor-pointer">
          <Checkbox className="mt-0.5" checked={agree} onCheckedChange={(v) => setAgree(!!v)} />
          <span>
            I agree to the <Link href="/terms" className="text-[var(--color-brand-700)] hover:underline">terms of service</Link>{" "}
            and <Link href="/privacy" className="text-[var(--color-brand-700)] hover:underline">privacy policy</Link>.
          </span>
        </label>
        <FieldError>{errors.agree}</FieldError>

        <Button type="submit" size="lg" className="w-full" loading={loading} rightIcon={!loading && <ArrowRight className="h-4 w-4" />}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-fg-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-brand-700)] hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
