import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, ClipboardList, CreditCard, FileCheck2, Hourglass, Mail, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  feeTiers,
  paymentPolicy,
  studentBenefits,
  distanceLearningProgrammes,
} from "@/data/feeTiers";
import { formatCurrency } from "@/lib/utils";

const steps = [
  { Icon: ClipboardList, title: "Submit your application", body: "Complete the online form and upload your supporting documents. Takes ~15 minutes." },
  {
    Icon: CreditCard,
    title: "Pay the application fee",
    body: "Application fees range from 5,000 to 50,000 FCFA depending on your programme tier. See the fee schedule below for exact amounts. Payments are made through the bank.",
  },
  { Icon: FileCheck2, title: "Document verification", body: "Our admissions office reviews academic records and supporting materials within 5 working days." },
  { Icon: UserCheck, title: "Aptitude assessment / interview", body: "Most programs require a short panel interview, conducted in person or remotely." },
  { Icon: Mail, title: "Admission decision", body: "Decisions are communicated by email within 7 days of the interview. Provisional offers include a personalised welcome pack." },
  { Icon: Hourglass, title: "Confirm your seat", body: "Accept your offer and pay the initial tuition installment to lock in your seat for the September intake." },
];

const dates = [
  { label: "Main intake — September", date: "30 August 2026", status: "Open now" },
  { label: "January diploma intake", date: "15 December 2026", status: "Opens 1 Oct 2026" },
  { label: "Scholarship deadline", date: "30 June 2026", status: "Apply early" },
  { label: "Interview window", date: "15 Jul – 25 Aug 2026", status: "Rolling" },
];

const onsiteTiers = feeTiers.filter((t) => !t.id.startsWith("distance_"));
const distanceTiers = feeTiers.filter((t) => t.id.startsWith("distance_"));

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
        title="A transparent path from applicant to admitted student."
        description="From first form to first ward round — our admissions process is designed to be supportive, fast, and entirely online."
        actions={
          <>
            <Button asChild size="lg" variant="primary">
              <Link href="/apply">Start application <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/scholarships">Explore scholarships</Link>
            </Button>
          </>
        }
      />

      <Container className="-mt-8 relative">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-default bg-surface-elevated p-4 shadow-elevated">
          {dates.map((d) => (
            <div key={d.label} className="flex items-center gap-3 p-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--color-gold-50)] text-[var(--color-gold-700)]">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-fg-tertiary">{d.label}</div>
                <div className="text-sm font-semibold text-fg-primary">{d.date}</div>
                <Badge size="sm" variant="gold" className="mt-1">{d.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Section
        eyebrow="The process"
        title="Six clear steps from application to enrolment"
        description="We've designed every touchpoint to reduce friction so you can focus on what matters — preparing for your studies."
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-default bg-surface-elevated p-6 shadow-soft">
              <div className="absolute -top-3 left-6 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-gold-400)] to-[var(--color-gold-600)] text-[10px] font-bold text-[var(--color-brand-950)]">
                {i + 1}
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
                <s.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-fg-secondary text-pretty">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="fee-schedule"
        eyebrow="Tuition & fees"
        title="Official fee schedule"
        description="St Alessandro University Institute (SAUI) programme fees — registration, installments, and total cost by programme tier."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {onsiteTiers.map((tier) => (
            <Card key={tier.id} hover>
              <CardHeader>
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <CardDescription>
                  Application fee: {formatCurrency(tier.applicationFee)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-fg-secondary">Registration</dt>
                    <dd className="font-medium">{formatCurrency(tier.registrationFee)}</dd>
                  </div>
                  {tier.installments.map((inst) => (
                    <div key={inst.label} className="flex justify-between">
                      <dt className="text-fg-secondary">{inst.label}</dt>
                      <dd className="font-medium">{formatCurrency(inst.amount)}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <dt className="text-fg-secondary">Tuition</dt>
                    <dd className="font-medium">{formatCurrency(tier.tuition)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-subtle pt-2 mt-2">
                    <dt className="font-semibold text-fg-primary">Total cost</dt>
                    <dd className="font-display font-semibold text-[var(--color-brand-700)]">{formatCurrency(tier.totalCost)}</dd>
                  </div>
                </dl>
                {tier.note && <p className="mt-3 text-xs text-fg-tertiary">{tier.note}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl font-semibold text-fg-primary">Distance learning programmes</h3>
          <p className="mt-2 text-sm text-fg-secondary">
            Available programmes: {distanceLearningProgrammes.join(" · ")}
          </p>
          <p className="mt-1 text-sm text-fg-secondary">
            Admission requirements match the corresponding onsite programme, plus an application fee of 50,000 FCFA and 1 ream of double A4 paper.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {distanceTiers.map((tier) => (
              <Card key={tier.id} hover>
                <CardHeader>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription>Application fee: {formatCurrency(tier.applicationFee)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-fg-secondary">Registration</dt>
                      <dd className="font-medium">{formatCurrency(tier.registrationFee)}</dd>
                    </div>
                    {tier.installments.map((inst) => (
                      <div key={inst.label} className="flex justify-between">
                        <dt className="text-fg-secondary">{inst.label}</dt>
                        <dd className="font-medium">{formatCurrency(inst.amount)}</dd>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <dt className="text-fg-secondary">Tuition</dt>
                      <dd className="font-medium">{formatCurrency(tier.tuition)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-subtle pt-2 mt-2">
                      <dt className="font-semibold text-fg-primary">Total cost</dt>
                      <dd className="font-display font-semibold text-[var(--color-brand-700)]">{formatCurrency(tier.totalCost)}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="payment-policy"
        eyebrow="Finance"
        title="Payment policy"
        description="All tuition payments follow these official SAUI guidelines."
        className="bg-surface-elevated/40"
      >
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {paymentPolicy.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg-secondary">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand-600)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Section>

      <Section
        eyebrow="Campus life"
        title="Student benefits"
        description="Every enrolled SAUI student enjoys these campus-wide benefits."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {studentBenefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 rounded-xl border border-default bg-surface-elevated p-4 shadow-soft">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-600)]" />
              <span className="text-sm text-fg-primary">{benefit}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-fg-secondary">
          Scholarships: full and partial awards are available for students scoring{" "}
          <strong className="text-fg-primary">15 points and above</strong>.{" "}
          <Link href="/scholarships" className="font-medium text-[var(--color-brand-700)] hover:underline">
            View scholarship streams
          </Link>
        </p>
      </Section>

      <Section
        eyebrow="Need help?"
        title="Talk to a real human"
        description="Our admissions counsellors are available six days a week — by phone, WhatsApp, or in person on campus."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card hover><CardHeader><CardTitle>Call us</CardTitle><CardDescription>Mon–Sat · 8am to 6pm</CardDescription></CardHeader><CardContent><a href="tel:+237673409309" className="font-semibold text-[var(--color-brand-700)]">+237 673 409 309</a></CardContent></Card>
          <Card hover><CardHeader><CardTitle>WhatsApp</CardTitle><CardDescription>Instant replies during office hours</CardDescription></CardHeader><CardContent><a href="https://wa.me/237673409309" className="font-semibold text-[var(--color-brand-700)]">Open chat</a></CardContent></Card>
          <Card hover><CardHeader><CardTitle>Email</CardTitle><CardDescription>Responses within 1 working day</CardDescription></CardHeader><CardContent><a href="mailto:admissions@stalessandro.edu" className="font-semibold text-[var(--color-brand-700)] break-all">admissions@stalessandro.edu</a></CardContent></Card>
        </div>
      </Section>
    </>
  );
}
