import Link from "next/link";
import { Handshake, HeartHandshake, GraduationCap, Globe2, Microscope, Building2 } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { photosByIndex } from "@/data/gallery";

const partners = [
  { Icon: GraduationCap, name: "Rizzoli Orthopaedic Institute, Bologna", region: "Italy", focus: "Faculty exchange · Orthopaedic clinical residency", since: 2022 },
  { Icon: GraduationCap, name: "RUDN University", region: "Moscow, Russia", focus: "Cooperation agreement · research & student mobility", since: 2024 },
  { Icon: Building2, name: "University of Buea", region: "Cameroon", focus: "Academic mentorship & quality assurance", since: 2024 },
  { Icon: HeartHandshake, name: "Indian fertility-clinic partners (GHC)", region: "India", focus: "Fertility-clinic exchange & specialist visits", since: 2024 },
  { Icon: Globe2, name: "WHO Africa Region", region: "Brazzaville", focus: "Public-health curriculum & competency standards", since: 2018 },
  { Icon: Building2, name: "Laquintinie Hospital", region: "Douala", focus: "Teaching hospital · 220+ rotation seats", since: 2010 },
  { Icon: Building2, name: "Douala General Hospital", region: "Douala", focus: "Specialty rotations · senior clinical mentorship", since: 2012 },
  { Icon: Microscope, name: "Cameroon Nursing Council", region: "Yaoundé", focus: "Accreditation & licensure pathway", since: 2013 },
  { Icon: HeartHandshake, name: "Italian Cultural Exchange", region: "Italy", focus: "Cultural scholarships & student mobility", since: 2019 },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collaboration"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partnerships" }]}
        title="Better caregivers are built in partnership."
        description="Our hospital, academic and policy partners are not just collaborators — they are co-architects of the SAUI experience."
        actions={
          <Button asChild size="lg" variant="primary"><Link href="/contact">Become a partner</Link></Button>
        }
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <Card key={p.name} hover>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] text-[var(--color-brand-800)]">
                    <p.Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold leading-snug text-fg-primary">{p.name}</h3>
                    <p className="text-xs text-fg-tertiary">{p.region} · since {p.since}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-fg-secondary">{p.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Partnerships in action"
        title="Signed, sealed and in the operating theatre"
        description="From Prof. Cesare Faldini launching our Rizzoli-affiliated orthopaedic residency, to cooperation agreements with RUDN University and the University of Buea, to visiting Indian fertility-clinic specialists."
        align="left"
        className="bg-surface-elevated/40"
      >
        <CampusPhotoGrid
          photos={photosByIndex(3, 4, 5, 19, 22, 1, 2)}
          showCategory={false}
        />
      </Section>
    </>
  );
}
