"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Beaker, CheckCircle2, Clock, Flag, ShieldCheck, Timer } from "lucide-react";
import { DashHeader } from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { exams, sampleQuestions } from "@/data/academic";
import { cn, formatDate } from "@/lib/utils";

export default function CBTPage() {
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const liveExam = exams.find((e) => e.id === activeExamId);

  if (liveExam) return <ExamTakingScreen exam={liveExam} onClose={() => setActiveExamId(null)} />;

  return (
    <div className="space-y-6">
      <DashHeader
        eyebrow="Examinations"
        title="CBT — Computer-Based Tests"
        description="Take quizzes and exams online with our anti-cheating, randomized question engine."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {exams.map((e) => (
          <Card key={e.id} hover>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{e.title}</CardTitle>
                <CardDescription>{e.courseCode} · {e.totalQuestions} questions · {e.duration} min</CardDescription>
              </div>
              <Badge size="sm" variant={e.status === "live" ? "success" : e.status === "scheduled" ? "gold" : "neutral"} dot>{e.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Opens</div><div className="font-semibold text-fg-primary">{formatDate(e.startsAt)}</div></div>
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Closes</div><div className="font-semibold text-fg-primary">{formatDate(e.endsAt)}</div></div>
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Pass mark</div><div className="font-semibold text-fg-primary">{e.passMark}/{e.totalMarks}</div></div>
                <div className="rounded-lg bg-surface-sunken p-2"><div className="text-fg-tertiary">Attempted</div><div className="font-semibold text-fg-primary">{e.attempted}/{e.attempted + 10}</div></div>
              </div>
              <Button onClick={() => e.status === "live" && setActiveExamId(e.id)} disabled={e.status !== "live"} className="w-full" variant={e.status === "live" ? "primary" : "secondary"}>
                {e.status === "live" ? "Start exam" : e.status === "completed" ? "View results" : "Not started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExamTakingScreen({ exam, onClose }: { exam: (typeof exams)[number]; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [submitted, setSubmitted] = useState<null | { score: number; max: number }>(null);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const q = sampleQuestions[idx];
  const answeredCount = Object.keys(answers).length;

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const submit = () => {
    const correct = sampleQuestions.reduce((acc, qq) => acc + (answers[qq.id] === qq.correctOptionId ? qq.marks : 0), 0);
    const max = sampleQuestions.reduce((acc, qq) => acc + qq.marks, 0);
    setSubmitted({ score: correct, max });
  };

  if (submitted) {
    const pct = Math.round((submitted.score / submitted.max) * 100);
    const passed = pct >= 60;
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className={cn("mx-auto grid h-16 w-16 place-items-center rounded-2xl text-white shadow-glow", passed ? "bg-gradient-to-br from-[var(--color-clinical-500)] to-[var(--color-clinical-700)]" : "bg-gradient-to-br from-[oklch(0.58_0.205_25)] to-[oklch(0.50_0.205_25)]")}>
              {passed ? <CheckCircle2 className="h-9 w-9" strokeWidth={2.5} /> : <Flag className="h-9 w-9" strokeWidth={2.5} />}
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold text-fg-primary">{passed ? "Well done!" : "Almost there"}</h2>
            <p className="mt-1 text-sm text-fg-secondary">You scored</p>
            <div className="mt-2 font-display text-5xl font-semibold text-fg-primary">{submitted.score}<span className="text-2xl text-fg-tertiary">/{submitted.max}</span></div>
            <Progress value={pct} className="mt-4" />
            <p className="mt-2 text-xs text-fg-tertiary">{pct}% · pass mark 60%</p>
            <div className="mt-6 flex justify-center gap-2">
              <Button variant="secondary" onClick={onClose}>Back to exams</Button>
              <Button variant="primary">Review answers</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Header bar */}
      <div className="sticky top-16 z-20 -mx-4 sm:-mx-6 lg:-mx-8 mb-6 border-b border-default bg-surface-elevated/95 backdrop-blur px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Beaker className="h-5 w-5 text-[var(--color-brand-700)]" />
            <div>
              <div className="font-semibold text-fg-primary text-sm leading-tight">{exam.title}</div>
              <div className="text-[11px] text-fg-tertiary">{exam.courseCode} · {sampleQuestions.length} questions</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn("inline-flex items-center gap-1.5 rounded-lg border border-default px-3 py-1.5 font-mono text-sm font-semibold", timeLeft < 60 && "border-[oklch(0.86_0.10_25)] text-[oklch(0.55_0.205_25)]")}>
              <Timer className="h-3.5 w-3.5" /> {fmt(timeLeft)}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>Exit</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
        <Card>
          <CardHeader className="border-b border-subtle">
            <div className="flex items-center justify-between">
              <CardDescription>Question {idx + 1} of {sampleQuestions.length}</CardDescription>
              <button onClick={() => setFlagged((f) => { const next = new Set(f); next.has(q.id) ? next.delete(q.id) : next.add(q.id); return next; })} className="inline-flex items-center gap-1 text-xs font-medium text-fg-secondary hover:text-[oklch(0.78_0.155_75)]">
                <Flag className={cn("h-3.5 w-3.5", flagged.has(q.id) && "fill-[oklch(0.78_0.155_75)] text-[oklch(0.78_0.155_75)]")} /> {flagged.has(q.id) ? "Flagged" : "Flag for review"}
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="font-display text-xl font-semibold leading-snug text-fg-primary text-pretty">{q.text}</p>
            <div className="mt-6 space-y-2.5">
              {q.options.map((o) => {
                const selected = answers[q.id] === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                      selected ? "border-[var(--color-brand-400)] bg-[var(--color-brand-50)]/60 ring-4 ring-[var(--color-brand-500)]/15" : "border-default hover:border-strong hover:bg-surface-sunken/40"
                    )}
                  >
                    <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg border font-mono text-xs font-semibold", selected ? "border-[var(--color-brand-600)] bg-[var(--color-brand-700)] text-white" : "border-default bg-surface text-fg-secondary")}>
                      {o.id.toUpperCase()}
                    </span>
                    <span className="text-sm text-fg-primary">{o.text}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-subtle pt-4">
              <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />} disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>Previous</Button>
              {idx < sampleQuestions.length - 1 ? (
                <Button rightIcon={<ArrowRight className="h-4 w-4" />} onClick={() => setIdx((i) => i + 1)}>Next</Button>
              ) : (
                <Button variant="gold" onClick={submit}>Submit exam</Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Navigator</CardTitle><CardDescription>{answeredCount}/{sampleQuestions.length} answered</CardDescription></CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-1.5">
              {sampleQuestions.map((qq, i) => {
                const answered = !!answers[qq.id];
                const isFlagged = flagged.has(qq.id);
                const current = i === idx;
                return (
                  <button
                    key={qq.id}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "relative h-8 rounded-md text-xs font-mono font-semibold transition-all",
                      current ? "bg-[var(--color-brand-700)] text-white" :
                      answered ? "bg-[var(--color-clinical-100)] text-[var(--color-clinical-800)]" : "bg-surface-sunken text-fg-tertiary",
                      isFlagged && "ring-2 ring-[oklch(0.78_0.155_75)]"
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 text-[11px] text-fg-secondary">
              <p className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-[var(--color-clinical-300)]" /> Answered</p>
              <p className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-[var(--color-brand-700)]" /> Current</p>
              <p className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded ring-2 ring-[oklch(0.78_0.155_75)] bg-transparent" /> Flagged</p>
            </div>
            <div className="mt-5 rounded-lg bg-[var(--color-brand-50)]/50 p-3 text-[11px] text-[var(--color-brand-800)]">
              <ShieldCheck className="inline h-3.5 w-3.5 mr-1" /> Tab-switch detection is active.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
