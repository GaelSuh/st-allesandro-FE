import Link from "next/link";
import { ArrowUpRight, Building2, Users } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { departments } from "@/data/departments";

const color = {
  brand: "from-[var(--color-brand-700)] to-[var(--color-brand-900)] text-[var(--color-gold-300)]",
  clinical: "from-[var(--color-clinical-600)] to-[var(--color-clinical-800)] text-white",
  gold: "from-[var(--color-gold-500)] to-[var(--color-gold-700)] text-[var(--color-brand-950)]",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Faculties"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Departments" }]}
        title="Five departments. One mission."
        description="Each department is led by senior academics with deep clinical and industry experience — together they shape the SAUI educational ethos."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <Card key={d.id} hover className="overflow-hidden">
              <div className={`bg-gradient-to-br ${color[d.color]} p-6`}>
                <Building2 className="h-7 w-7" />
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                  {d.name}
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-fg-secondary text-pretty">{d.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md bg-surface-sunken px-2 py-1 text-fg-secondary">{d.programs} programs</span>
                  <span className="rounded-md bg-surface-sunken px-2 py-1 text-fg-secondary">{d.staff} faculty</span>
                  <span className="rounded-md bg-surface-sunken px-2 py-1 text-fg-secondary">{d.students} students</span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-subtle pt-4">
                  <div className="min-w-0">
                    <div className="text-xs text-fg-tertiary">Department head</div>
                    <div className="text-sm font-semibold text-fg-primary truncate">{d.head}</div>
                  </div>
                  <Link href="/programs" className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-700)] hover:gap-2 transition-all">
                    Programs <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
