"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, FileUp, GraduationCap, IdCard, Loader2, Sparkles, User } from "lucide-react";
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
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, label: "Personal", Icon: User },
  { id: 1, label: "Academics", Icon: GraduationCap },
  { id: 2, label: "Program", Icon: IdCard },
  { id: 3, label: "Documents", Icon: FileUp },
  { id: 4, label: "Review", Icon: BadgeCheck },
];

const personalSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name."),
  lastName: z.string().min(2, "Please enter your surname."),
  email: z.string().email("That doesn't look like a valid email."),
  phone: z.string().min(8, "Please include country code, e.g. +237…"),
  gender: z.enum(["female", "male", "other"], { error: "Select your gender." }),
  dob: z.string().min(8, "Date of birth is required."),
  nationality: z.string().min(2, "Required."),
});

const academicSchema = z.object({
  lastSchool: z.string().min(2, "Please enter your most recent school."),
  qualification: z.string().min(2, "Required."),
  yearCompleted: z.string().regex(/^\d{4}$/, "Enter a 4-digit year."),
  grades: z.string().min(2, "Brief summary required."),
});

const programSchema = z.object({
  programId: z.string().min(1, "Please pick a program."),
  intake: z.enum(["sept_2026", "jan_2027"], { error: "Select intake." }),
  motivation: z.string().min(40, "Tell us in at least 40 characters why you want to join us."),
});

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { number: string }>(null);

  const [personal, setPersonal] = useState({
    firstName: "", lastName: "", email: "", phone: "", gender: "" as "female" | "male" | "other" | "",
    dob: "", nationality: "Cameroonian",
  });
  const [academic, setAcademic] = useState({ lastSchool: "", qualification: "", yearCompleted: "", grades: "" });
  const [programPick, setProgramPick] = useState({ programId: "", intake: "" as "sept_2026" | "jan_2027" | "", motivation: "" });
  const [docs, setDocs] = useState([
    { name: "GCE A-Level results / equivalent", uploaded: false, required: true },
    { name: "Birth certificate", uploaded: false, required: true },
    { name: "National ID or passport", uploaded: false, required: true },
    { name: "Medical fitness report", uploaded: false, required: false },
    { name: "Recommendation letter (optional)", uploaded: false, required: false },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCurrent = () => {
    const next: Record<string, string> = {};
    if (step === 0) {
      const r = personalSchema.safeParse(personal);
      if (!r.success) r.error.issues.forEach((e) => (next[e.path.join(".")] = e.message));
    } else if (step === 1) {
      const r = academicSchema.safeParse(academic);
      if (!r.success) r.error.issues.forEach((e) => (next[e.path.join(".")] = e.message));
    } else if (step === 2) {
      const r = programSchema.safeParse(programPick);
      if (!r.success) r.error.issues.forEach((e) => (next[e.path.join(".")] = e.message));
    } else if (step === 3) {
      const missing = docs.filter((d) => d.required && !d.uploaded);
      if (missing.length > 0) {
        next["docs"] = `Please upload required documents: ${missing.map((d) => d.name).join(", ")}.`;
      }
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
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitting(false);
    const number = "SAUI-APP-26-" + Math.floor(9000 + Math.random() * 999);
    setSubmitted({ number });
    toast.success("Application submitted successfully!", { description: `Your tracking number is ${number}` });
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
            Application received
          </h1>
          <p className="mt-3 text-base text-fg-secondary text-pretty">
            Thank you{personal.firstName ? `, ${personal.firstName}` : ""} — your application has been received.
            Track its status anytime with your reference number below.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-default bg-surface-sunken px-4 py-2.5 font-mono text-sm font-semibold text-fg-primary">
            <Sparkles className="h-4 w-4 text-[var(--color-gold-600)]" />
            {submitted.number}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
              <Link href="/login">Open the applicant portal</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/">Back to homepage</Link>
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
        <p className="mt-2 text-base text-fg-secondary">It takes ~15 minutes. Your progress is auto-saved.</p>

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
              {step === 0 && (
                <PersonalStep value={personal} onChange={setPersonal} errors={errors} />
              )}
              {step === 1 && (
                <AcademicStep value={academic} onChange={setAcademic} errors={errors} />
              )}
              {step === 2 && (
                <ProgramStep value={programPick} onChange={setProgramPick} errors={errors} />
              )}
              {step === 3 && (
                <DocumentsStep docs={docs} onToggle={(i) => setDocs((d) => d.map((x, j) => (j === i ? { ...x, uploaded: !x.uploaded } : x)))} error={errors.docs} />
              )}
              {step === 4 && (
                <ReviewStep personal={personal} academic={academic} programPick={programPick} docs={docs} />
              )}
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
      <p className="mt-1 text-sm text-fg-secondary">Tell us a bit about you. We use these details to set up your applicant portal.</p>
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
          <Label required>Date of birth</Label>
          <Input className="mt-1.5" type="date" value={value.dob} onChange={(e) => onChange({ ...value, dob: e.target.value })} error={!!errors.dob} />
          <FieldError>{errors.dob}</FieldError>
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
        <div className="sm:col-span-2">
          <Label required>Nationality</Label>
          <Input className="mt-1.5" value={value.nationality} onChange={(e) => onChange({ ...value, nationality: e.target.value })} error={!!errors.nationality} />
        </div>
      </div>
    </div>
  );
}

function AcademicStep({ value, onChange, errors }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Academic background</h2>
      <p className="mt-1 text-sm text-fg-secondary">Tell us about your most recent qualification. You can upload supporting documents later.</p>
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
          <Label required>Grades summary</Label>
          <Textarea className="mt-1.5" value={value.grades} onChange={(e) => onChange({ ...value, grades: e.target.value })} error={!!errors.grades} placeholder="e.g. Biology B, Chemistry C, English A; overall: distinction" />
          <FieldHint>Brief summary — we will request official transcripts during document verification.</FieldHint>
          <FieldError>{errors.grades}</FieldError>
        </div>
      </div>
    </div>
  );
}

function ProgramStep({ value, onChange, errors }: any) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Choose your program</h2>
      <p className="mt-1 text-sm text-fg-secondary">Pick a program and intake. Don't worry — you can change this with our admissions team if needed.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
        <div>
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
          <Label required>Why this program?</Label>
          <Textarea className="mt-1.5 min-h-[140px]" value={value.motivation} onChange={(e) => onChange({ ...value, motivation: e.target.value })} error={!!errors.motivation} placeholder="Tell us about your motivation and what you hope to achieve at St Alessandro…" />
          <FieldHint>{(value.motivation || "").length} characters · minimum 40</FieldHint>
          <FieldError>{errors.motivation}</FieldError>
        </div>
      </div>
    </div>
  );
}

function DocumentsStep({ docs, onToggle, error }: { docs: { name: string; uploaded: boolean; required: boolean }[]; onToggle: (i: number) => void; error?: string }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Supporting documents</h2>
      <p className="mt-1 text-sm text-fg-secondary">Upload scanned copies (PDF or image, max 10MB each). You can replace files later from your applicant portal.</p>
      {error && (
        <div className="mt-4 rounded-xl border border-[oklch(0.86_0.10_25)] bg-[oklch(0.96_0.04_25)] p-3 text-sm text-[oklch(0.42_0.16_25)]">
          {error}
        </div>
      )}
      <ul className="mt-6 space-y-3">
        {docs.map((d, i) => (
          <li key={d.name} className={cn("flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl border p-4", d.uploaded ? "border-[var(--color-clinical-300)] bg-[var(--color-clinical-50)]/40" : "border-default bg-surface-sunken/40")}>
            <div className="flex items-center gap-3">
              <div className={cn("grid h-9 w-9 place-items-center rounded-lg", d.uploaded ? "bg-[var(--color-clinical-100)] text-[var(--color-clinical-700)]" : "bg-surface text-fg-tertiary")}>
                {d.uploaded ? <Check className="h-4 w-4" strokeWidth={3} /> : <FileUp className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-sm font-medium text-fg-primary">{d.name} {d.required && <span className="text-[oklch(0.58_0.205_25)]">*</span>}</div>
                <div className="text-xs text-fg-tertiary">{d.uploaded ? "scan-2026-09-12.pdf · 2.4 MB" : "PDF or image · max 10MB"}</div>
              </div>
            </div>
            <Button variant={d.uploaded ? "secondary" : "primary"} size="sm" onClick={() => onToggle(i)}>
              {d.uploaded ? "Replace" : "Upload"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewStep({ personal, academic, programPick, docs }: any) {
  const program = programs.find((p) => p.id === programPick.programId);
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-fg-primary">Review & submit</h2>
      <p className="mt-1 text-sm text-fg-secondary">Take a moment to verify your details before submitting. You can come back and edit before our review begins.</p>
      <div className="mt-6 space-y-5">
        <Block title="Personal information">
          <Row k="Name" v={`${personal.firstName} ${personal.lastName}`} />
          <Row k="Email" v={personal.email} />
          <Row k="Phone" v={personal.phone} />
          <Row k="Date of birth · Gender" v={`${personal.dob} · ${personal.gender}`} />
          <Row k="Nationality" v={personal.nationality} />
        </Block>
        <Block title="Academics">
          <Row k="Last school" v={academic.lastSchool} />
          <Row k="Qualification · Year" v={`${academic.qualification} · ${academic.yearCompleted}`} />
          <Row k="Grades" v={academic.grades} />
        </Block>
        <Block title="Program & intake">
          <Row k="Program" v={program ? `${program.code} · ${program.name}` : "—"} />
          <Row k="Intake" v={programPick.intake === "sept_2026" ? "September 2026" : programPick.intake === "jan_2027" ? "January 2027" : "—"} />
          <Row k="Motivation" v={programPick.motivation} truncate />
        </Block>
        <Block title="Documents">
          {docs.map((d: any) => (
            <Row key={d.name} k={d.name} v={d.uploaded ? "Uploaded ✓" : "Not uploaded"} />
          ))}
        </Block>
      </div>
      <p className="mt-6 rounded-xl border border-[var(--color-gold-200)] bg-[var(--color-gold-50)]/60 p-3 text-sm text-[var(--color-gold-800)]">
        By submitting, you agree to St Alessandro's privacy policy and the handling of your personal data for admissions purposes.
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
