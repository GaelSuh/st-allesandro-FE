import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Users, GraduationCap, FileBadge, Calendar, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { programs } from "@/data/programs";
import { getFeeTier } from "@/data/feeTiers";
import { formatCurrency, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return programs.map((p) => ({ id: p.id }));
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = programs.find((p) => p.id === id);
  if (!program) notFound();

  const feeTier = getFeeTier(program.feeTierId);
  const showProgramRequirements = program.prerequisites.some(
    (p) => !feeTier.admissionRequirements.some((req) => req.toLowerCase().includes(p.toLowerCase().slice(0, 12))),
  );

  return (
    <>
      <PageHeader
        eyebrow={program.department}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
          { label: program.code },
        ]}
        title={program.name}
        description={program.description}
        actions={
          <>
            <Button asChild size="lg" variant="primary">
              <Link href="/apply">Apply for this program <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Talk to admissions</Link>
            </Button>
          </>
        }
      />

      <Container className="-mt-8 relative">
        <div className="grid gap-3 sm:grid-cols-4 rounded-2xl border border-default bg-surface-elevated p-4 shadow-elevated">
          <Fact Icon={Clock} label="Duration" value={program.duration} />
          <Fact Icon={GraduationCap} label="Level" value={program.level} />
          <Fact Icon={Users} label="Intake" value={`${program.intake} seats`} />
          <Fact Icon={FileBadge} label="Total cost" value={formatCurrency(feeTier.totalCost)} />
        </div>
      </Container>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            <Card>
              <CardHeader>
                <CardTitle>Curriculum highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-fg-primary">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-clinical-600)]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career pathways</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {program.careerPaths.map((c) => (
                    <Badge key={c} variant="gold" size="lg">{c}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admission requirements</CardTitle>
                <p className="text-sm text-fg-secondary">{feeTier.name}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-sm text-fg-secondary">
                  {feeTier.admissionRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {showProgramRequirements && (
              <Card>
                <CardHeader>
                  <CardTitle>Program-specific requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm text-fg-secondary">
                    {program.prerequisites.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-gold-500)]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary">Application deadline</p>
                <div className="mt-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--color-gold-600)]" />
                  <span className="font-display text-2xl font-semibold text-fg-primary">{formatDate(program.applicationDeadline)}</span>
                </div>
                <p className="mt-3 text-sm text-fg-secondary">
                  Applications are reviewed on a rolling basis. Apply early to secure your place and access scholarship slots.
                </p>
                <Button asChild className="mt-5 w-full" size="lg">
                  <Link href="/apply">Begin your application</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee breakdown</CardTitle>
                <p className="text-sm text-fg-secondary">{feeTier.name}</p>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between border-b border-subtle pb-2">
                    <dt className="text-fg-secondary">Registration fee</dt>
                    <dd className="font-semibold text-fg-primary">{formatCurrency(feeTier.registrationFee)}</dd>
                  </div>
                  {feeTier.installments.map((inst) => (
                    <div key={inst.label} className="flex items-center justify-between border-b border-subtle pb-2">
                      <dt className="text-fg-secondary">{inst.label}</dt>
                      <dd className="font-semibold text-fg-primary">{formatCurrency(inst.amount)}</dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-b border-subtle pb-2">
                    <dt className="text-fg-secondary">Tuition</dt>
                    <dd className="font-semibold text-fg-primary">{formatCurrency(feeTier.tuition)}</dd>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <dt className="font-semibold text-fg-primary">Total cost</dt>
                    <dd className="font-display text-lg font-semibold text-[var(--color-brand-700)]">{formatCurrency(feeTier.totalCost)}</dd>
                  </div>
                </dl>
                {feeTier.note && (
                  <p className="mt-4 text-xs text-fg-tertiary">{feeTier.note}</p>
                )}
                <p className="mt-4 text-xs text-fg-tertiary">
                  Application fee: {formatCurrency(feeTier.applicationFee)}. See our{" "}
                  <Link href="/admissions#payment-policy" className="font-medium text-[var(--color-brand-700)] hover:underline">
                    payment policy
                  </Link>{" "}
                  for installment rules and bank payment instructions.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="mt-12">
          <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-secondary hover:text-fg-primary">
            <ArrowLeft className="h-4 w-4" /> Back to all programs
          </Link>
        </div>
      </Section>
    </>
  );
}

function Fact({ Icon, label, value }: { Icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-fg-tertiary">{label}</div>
        <div className="text-sm font-semibold text-fg-primary truncate">{value}</div>
      </div>
    </div>
  );
}
