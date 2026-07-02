"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, GraduationCap, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Label, FieldError, FieldHint } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { programs } from "@/data/programs";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, label: "Personal", Icon: User },
  { id: 1, label: "Background & program", Icon: GraduationCap },
  { id: 2, label: "Review", Icon: BadgeCheck },
];

const personalSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name."),
  lastName: z.string().min(2, "Please enter your surname."),
  email: z.string().email("That doesn't look like a valid email."),
  phone: z.string().min(8, "Please include country code, e.g. +237…"),
  gender: z.enum(["female", "male", "other"], { error: "Select your gender." }),
  nationality: z.string().min(2, "Required."),
});

const backgroundSchema = z.object({
  lastSchool: z.string().min(2, "Please enter your most recent school."),
  qualification: z.string().min(2, "Required."),
  yearCompleted: z.string().regex(/^\d{4}$/, "Enter a 4-digit year."),
  programId: z.string().min(1, "Please pick a program."),
  intake: z.enum(["sept_2026", "jan_2027"], { error: "Select intake." }),
});

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { number: string }>(null);

  const [personal, setPersonal] = useState({
    firstName: "", lastName: "", email: "", phone: "", gender: "" as "female" | "male" | "other" | "",
    nationality: "Cameroonian",
  });
  const [background, setBackground] = useState({
    lastSchool: "", qualification: "", yearCompleted: "",
    programId: "", intake: "" as "sept_2026" | "jan_2027" | "", motivation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrent = () => {
    const next: Record<string, string> = {};
    if (step === 0) {
      const r = personalSchema.safeParse(personal);
      if (!r.success) r.error.issues.forEach((e) => (next[e.path.join(".")] = e.message));
    } else if (step === 1) {
      const r = backgroundSchema.safeParse(background);
      if (!r.success) r.error.issues.forEach((e) => (next[e.path.join(".")] = e.message));
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validateCurrent()) {
      toast.error("Please review the highlighted fields", { description: "We've flagged what needs your attention before continuing." });
      return;
    }
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!validateCurrent()) return;
    setSubmitting(true);
    const number = "SAUI-APP-26-" + Math.floor(9000 + Math.random() * 999);
    const program = programs.find((p) => p.id === background.programId);
    const intakeLabel =
      background.intake === "sept_2026" ? "September 2026" :
      background.intake === "jan_2027" ? "January 2027" : "—";
    const subject = `[Admission] ${program ? program.name : "Application"} — ${personal.firstName} ${personal.lastName}`;
    const body = [
      `Tracking number: ${number}`,
      "",
      "— Personal —",
      `Name: ${personal.firstName} ${personal.lastName}`,
      `Email: ${personal.email}`,
      `Phone: ${personal.phone}`,
      `Gender: ${personal.gender}`,
      `Nationality: ${personal.nationality}`,
      "",
      "— Background & program —",
      `Last school: ${background.lastSchool}`,
      `Qualification: ${background.qualification} (${background.yearCompleted})`,
      `Program: ${program ? `${program.code} · ${program.name}` : "—"}`,
      `Intake: ${intakeLabel}`,
      `Motivation: ${background.motivation || "—"}`,
    ].join("\n");
    window.location.href = `mailto:${BRAND.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitting(false);
    setSubmitted({ number });
    toast.success("Application ready to send", {
      description: `We've opened your email app to send your details to ${BRAND.contact.email} (ref ${number}).`,
    });
  };

  if (submitted) {
    return (
      <Container className="py-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-default bg-surface-elevated p-10 text-center shadow-elevated"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-clinical-500)] to-[var(--color-clinical-700)] text-white shadow-glow">
            <Check className="h-8 w-8" strokeWidth={3} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-fg-primary">
            Almost done — send your email
          </h1>
          <p className="mt-3 text-base text-fg-secondary text-pretty">
            Thank you{personal.firstName ? `, ${personal.firstName}` : ""}. We&rsquo;ve opened your email app with
            your application addressed to <span className="font-semibold text-fg-primary">{BRAND.contact.email}</span> —
            just press send. Keep your reference number below.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-default bg-surface-sunken px-4 py-2.5 font-mono text-sm font-semibold text-fg-primary">
            <Sparkles className="h-4 w-4 text-[var(--color-gold-600)]" />
            {submitted.number}
          </div>
          <p className="mx-auto mt-5 max-w-md text-sm text-fg-tertiary">
            If your email app didn&rsquo;t open, email us directly at{" "}
            <a href={`mailto:${BRAND.contact.email}`} className="font-semibold text-[var(--color-brand-700)]">
              {BRAND.contact.email}
            </a>{" "}
            or call {BRAND.contact.phone}.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/">Back to homepage</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact admissions</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      <Container className="pt-10 pb-20 max-w-5xl">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-sm text-fg-secondary hover:text-fg-primary">Save & exit →</Link>
        </div>

        <h1 className="mt-12 font-display text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl">
          Begin your application
        </h1>
        <p className="mt-2 text-base text-fg-secondary">
          Three short steps — most applicants finish in under five minutes. No documents needed to apply;
          our team confirms those with you directly.
        </p>

        <Stepper currentStep={step} />

        <div className="mt-8 rounded-2xl border border-default bg-surface-elevated p-6 sm:p-8 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <PersonalStep value={personal} onChange={setPersonal} errors={errors} />}
              {step === 1 && <BackgroundStep value={background} onChange={setBackground} errors={errors} />}
              {step === 2 && <ReviewStep personal={personal} background={background} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between border-t border-subtle pt-6">
            <Button variant="ghost" disabled={step === 0} onClick={prev} leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Previous
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={next} rightIcon={<ArrowRight className="h-4 w-4" />}>Continue</Button>
            ) : (
              <Button onClick={submit} loading={submitting} variant="gold">
                Submit application
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mt-10 flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const active = i === currentStep;
        const done = i < currentStep;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 transition-all shrink-0",
                active && "border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-800)] shadow-soft",
                done && "border-[var(--color-clinical-300)] bg-[var(--color-clinical-50)] text-[var(--color-clinical-800)]",
                !active && !done && "border-default bg-surface-elevated text-fg-tertiary"
              )}
            >
              <span className={cn("grid h-6 w-6 place-items-center rounded-md text-[11px] font-bold", active && "bg-[var(--color-brand-700)] text-white", done && "bg-[var(--color-clinical-600)] text-white", !active && !done && "bg-surface-sunken")}>
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className="text-sm font-medium">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={cn("h-px w-4 sm:w-8", done ? "bg-[var(--color-clinical-300)]" : "bg-[var(--border-default)]")} />}
          </li>
        );
      })}
    </ol>
  );
}

function PersonalStep({ value, onChange, errors }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Personal information</h2>
      <p className="mt-1 text-sm text-fg-secondary">Just the basics so our admissions team can reach you.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Label required>First name</Label>
          <Input className="mt-1.5" value={value.firstName} onChange={(e) => onChange({ ...value, firstName: e.target.value })} error={!!errors.firstName} placeholder="Yolande" />
          <FieldError>{errors.firstName}</FieldError>
        </div>
        <div>
          <Label required>Surname</Label>
          <Input className="mt-1.5" value={value.lastName} onChange={(e) => onChange({ ...value, lastName: e.target.value })} error={!!errors.lastName} placeholder="Mvondo" />
          <FieldError>{errors.lastName}</FieldError>
        </div>
        <div>
          <Label required>Email address</Label>
          <Input className="mt-1.5" type="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} error={!!errors.email} placeholder="you@example.com" />
          <FieldError>{errors.email}</FieldError>
        </div>
        <div>
          <Label required>Phone</Label>
          <Input className="mt-1.5" value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} error={!!errors.phone} placeholder="+237 6XX XXX XXX" />
          <FieldError>{errors.phone}</FieldError>
        </div>
        <div>
          <Label required>Gender</Label>
          <Select value={value.gender} onValueChange={(v) => onChange({ ...value, gender: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="other">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          <FieldError>{errors.gender}</FieldError>
        </div>
        <div>
          <Label required>Nationality</Label>
          <Input className="mt-1.5" value={value.nationality} onChange={(e) => onChange({ ...value, nationality: e.target.value })} error={!!errors.nationality} />
          <FieldError>{errors.nationality}</FieldError>
        </div>
      </div>
    </div>
  );
}

function BackgroundStep({ value, onChange, errors }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Background & program</h2>
      <p className="mt-1 text-sm text-fg-secondary">Your most recent schooling and the program you&rsquo;d like to join.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label required>Last school / institution attended</Label>
          <Input className="mt-1.5" value={value.lastSchool} onChange={(e) => onChange({ ...value, lastSchool: e.target.value })} error={!!errors.lastSchool} />
          <FieldError>{errors.lastSchool}</FieldError>
        </div>
        <div>
          <Label required>Highest qualification</Label>
          <Input className="mt-1.5" value={value.qualification} onChange={(e) => onChange({ ...value, qualification: e.target.value })} error={!!errors.qualification} placeholder="GCE A-Level, BAC, etc." />
          <FieldError>{errors.qualification}</FieldError>
        </div>
        <div>
          <Label required>Year completed</Label>
          <Input className="mt-1.5" value={value.yearCompleted} onChange={(e) => onChange({ ...value, yearCompleted: e.target.value })} error={!!errors.yearCompleted} placeholder="2025" />
          <FieldError>{errors.yearCompleted}</FieldError>
        </div>
        <div className="sm:col-span-2">
          <Label required>Program</Label>
          <Select value={value.programId} onValueChange={(v) => onChange({ ...value, programId: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a program…" /></SelectTrigger>
            <SelectContent>
              {programs.map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.code} · {p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{errors.programId}</FieldError>
        </div>
        <div className="sm:col-span-2">
          <Label required>Intake</Label>
          <Select value={value.intake} onValueChange={(v) => onChange({ ...value, intake: v })}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Pick intake" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sept_2026">September 2026 (main intake)</SelectItem>
              <SelectItem value="jan_2027">January 2027 (selected diploma programs)</SelectItem>
            </SelectContent>
          </Select>
          <FieldError>{errors.intake}</FieldError>
        </div>
        <div className="sm:col-span-2">
          <Label>Why this program? <span className="font-normal text-fg-tertiary">(optional)</span></Label>
          <Textarea className="mt-1.5 min-h-[120px]" value={value.motivation} onChange={(e) => onChange({ ...value, motivation: e.target.value })} placeholder="A sentence or two about your motivation (optional)…" />
          <FieldHint>Optional — a short note helps our advisors, but you can leave this blank.</FieldHint>
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ personal, background }: any) {
  const program = programs.find((p) => p.id === background.programId);
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Review & submit</h2>
      <p className="mt-1 text-sm text-fg-secondary">
        Verify your details, then submit — this opens your email app to send everything to our admissions team.
      </p>
      <div className="mt-6 space-y-5">
        <Block title="Personal information">
          <Row k="Name" v={`${personal.firstName} ${personal.lastName}`} />
          <Row k="Email" v={personal.email} />
          <Row k="Phone" v={personal.phone} />
          <Row k="Gender" v={personal.gender} />
          <Row k="Nationality" v={personal.nationality} />
        </Block>
        <Block title="Background & program">
          <Row k="Last school" v={background.lastSchool} />
          <Row k="Qualification · Year" v={`${background.qualification} · ${background.yearCompleted}`} />
          <Row k="Program" v={program ? `${program.code} · ${program.name}` : "—"} />
          <Row k="Intake" v={background.intake === "sept_2026" ? "September 2026" : background.intake === "jan_2027" ? "January 2027" : "—"} />
          {background.motivation ? <Row k="Motivation" v={background.motivation} truncate /> : null}
        </Block>
      </div>
      <p className="mt-6 rounded-xl border border-[var(--color-gold-200)] bg-[var(--color-gold-50)]/60 p-3 text-sm text-[var(--color-gold-800)]">
        By submitting, you agree to St Alessandro&rsquo;s privacy policy and the handling of your personal data for admissions purposes.
      </p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-subtle bg-surface-sunken/40 p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary">{title}</h3>
      <dl className="mt-3 space-y-2">{children}</dl>
    </div>
  );
}
function Row({ k, v, truncate }: { k: string; v: string; truncate?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
      <dt className="text-xs text-fg-tertiary sm:w-48 shrink-0">{k}</dt>
      <dd className={cn("text-sm font-medium text-fg-primary", truncate && "line-clamp-2")}>{v || "—"}</dd>
    </div>
  );
}
