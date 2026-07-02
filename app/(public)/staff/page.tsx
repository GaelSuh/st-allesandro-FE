import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";
import { lecturers } from "@/data/people";

export default function StaffPage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Staff & Lecturers" }]}
        title="The faculty behind every classroom and ward round."
        description="Senior clinicians, educators and researchers — many of whom are alumni — committed to shaping the next generation of caregivers."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lecturers.map((l) => (
            <Card key={l.id} hover>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar src={l.avatar} name={l.name} size="xl" ring />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold leading-snug text-fg-primary">{l.name}</h3>
                    <p className="mt-0.5 text-xs text-fg-tertiary">{l.title}</p>
                    <Badge size="sm" variant="brand" className="mt-2">{l.department}</Badge>
                  </div>
                </div>
                <p className="mt-4 text-sm text-fg-secondary">
                  <span className="text-fg-tertiary">Specialty:</span> {l.specialty}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3 text-xs">
                  <span className="text-fg-secondary">{l.coursesCount} courses</span>
                  <span className="inline-flex items-center gap-1 text-[var(--color-gold-700)] font-semibold">
                    <Star className="h-3.5 w-3.5 fill-current" /> {l.rating.toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
