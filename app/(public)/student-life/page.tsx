import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Coffee, Dumbbell, Globe2, GraduationCap, Music, Trophy, Users, BookOpenCheck } from "lucide-react";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { photosByIndex } from "@/data/gallery";

const items = [
  { Icon: Users, title: "Student associations", body: "Run by students, for students — from cultural clubs to debate, photography and entrepreneurship circles." },
  { Icon: Dumbbell, title: "Athletics", body: "Football, basketball, volleyball and athletics — open trials happen every September." },
  { Icon: Music, title: "Performing arts", body: "Choir, traditional dance ensemble and modern band — performing at every major institution-wide event." },
  { Icon: Globe2, title: "International exchange", body: "Students train alongside visiting Italian lecturers through our orthopaedic partnership in Bologna, Italy." },
  { Icon: BookOpenCheck, title: "Academic societies", body: "Nursing Students Association, Clinical Skills Society and Public Health Forum — peer-led learning and mentorship." },
  { Icon: Coffee, title: "On-campus life", body: "Cafés, study lounges, a fully-stocked library and a campus chapel for moments of reflection." },
  { Icon: GraduationCap, title: "Career & alumni", body: "Career mentorship and a thriving alumni network spanning Cameroon, Italy, Canada and the UAE." },
  { Icon: Trophy, title: "Awards & recognition", body: "Annual Excellence Awards celebrating outstanding academic, clinical and community contributions." },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHeader
        eyebrow="Student life"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Student Life" }]}
        title="Where future caregivers grow as people, too."
        description="Beyond classes and clinical rotations, SAUI is a place to lead, collaborate, perform, compete — and find a community for life."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.title} hover className="p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-gold-50)] text-[var(--color-gold-700)]">
                <it.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-fg-primary">{it.title}</h3>
              <p className="mt-1.5 text-sm text-fg-secondary text-pretty">{it.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="In pictures"
        title="Moments from campus"
        description="Graduation, thesis defences, sports days with our Italian staff and the chaplaincy at the heart of campus life."
        align="left"
        className="bg-surface-elevated/40"
      >
        <CampusPhotoGrid
          photos={photosByIndex(9, 12, 11, 16, 8, 13)}
          showCategory={false}
        />
      </Section>
    </>
  );
}
