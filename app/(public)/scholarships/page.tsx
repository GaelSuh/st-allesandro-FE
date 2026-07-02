import Link from "next/link";
import { Award, GraduationCap, HandCoins, Sparkles, Trophy } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const scholarships = [
  {
    Icon: Trophy,
    name: "Rector's Excellence Scholarship",
    coverage: "100% tuition",
    eligibility: "Top 5 GCE A-Level applicants per intake. Renewable based on CGPA ≥ 3.7.",
    intake: 5,
    accent: "gold",
  },
  {
    Icon: GraduationCap,
    name: "Italian Cultural Exchange Award",
    coverage: "50% tuition + Bologna summer programme",
    eligibility: "Demonstrated leadership and Italian language interest. Interview required.",
    intake: 8,
    accent: "brand",
  },
  {
    Icon: HandCoins,
    name: "Sister Cities Need-Based Grant",
    coverage: "Up to 70% tuition",
    eligibility: "Verified need + minimum CGPA 3.0. Means-tested annually.",
    intake: 20,
    accent: "clinical",
  },
  {
    Icon: Award,
    name: "Clinical Distinction Stipend",
    coverage: "Stipend + textbooks",
    eligibility: "Year 3+ students with outstanding clinical evaluations.",
    intake: 12,
    accent: "brand",
  },
  {
    Icon: Sparkles,
    name: "WHO Africa Public Health Grant",
    coverage: "Tuition + research stipend",
    eligibility: "Master's candidates with a public-health research proposal.",
    intake: 3,
    accent: "clinical",
  },
];

const accent = {
  brand: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
  clinical: "bg-[var(--color-clinical-50)] text-[var(--color-clinical-700)]",
  gold: "bg-[var(--color-gold-50)] text-[var(--color-gold-800)]",
} as const;

export default function ScholarshipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Financial aid"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Scholarships" }]}
        title="Talent should never be limited by tuition."
        description="Five scholarship streams support outstanding, ambitious candidates — fully funded, partially funded, and need-based. SAUI also offers full and partial scholarships for students scoring 15 points and above."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => (
            <Card key={s.name} hover className="p-6">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${accent[s.accent as keyof typeof accent]}`}>
                <s.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-fg-primary">{s.name}</h3>
              <Badge size="sm" variant="gold" className="mt-2">{s.coverage}</Badge>
              <p className="mt-3 text-sm text-fg-secondary text-pretty">{s.eligibility}</p>
              <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3 text-xs">
                <span className="text-fg-tertiary">Awarded each intake</span>
                <span className="font-semibold text-fg-primary">{s.intake} seats</span>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-default bg-surface-elevated p-6 sm:p-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-fg-primary">Ready to apply?</h3>
          <p className="mt-2 text-sm text-fg-secondary">Scholarship review is part of the standard application — no separate form required.</p>
          <Button asChild className="mt-5" size="lg"><Link href="/apply">Start your application</Link></Button>
        </div>
      </Section>
    </>
  );
}
