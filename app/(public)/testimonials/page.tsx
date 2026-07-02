import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/notifications";

const extra = [
  ...testimonials,
  {
    id: "tx1",
    quote:
      "The mentorship I received at SAUI shaped my surgical-nursing career. I now lead a team of 15 nurses at Polyclinique Bonanjo.",
    name: "Henriette Engo",
    role: "Senior Nurse · Polyclinique Bonanjo",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Henriette-Engo",
  },
  {
    id: "tx2",
    quote:
      "SAUI's faculty treats every student as a future colleague — that respect changes how you show up to learn.",
    name: "Cyril Mbarga",
    role: "MD · Cardiology Resident",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Cyril-Mbarga",
  },
  {
    id: "tx3",
    quote:
      "Sponsoring our daughter through SAUI was the easiest decision we've ever made — the parent portal kept us informed every step.",
    name: "Pauline & Joseph Ngono",
    role: "Parents · Class of 2025",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Pauline-Ngono",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="In their own words"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
        title="Six hundred reasons we get up in the morning."
        description="A small selection of the voices — alumni, students, parents, partners — that animate our daily mission."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {extra.map((t) => (
            <Card key={t.id} className="relative">
              <CardContent className="p-6">
                <Quote className="absolute right-4 top-4 h-7 w-7 text-[var(--color-gold-200)]" />
                <div className="flex items-center gap-0.5 text-[var(--color-gold-500)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-fg-primary text-pretty">"{t.quote}"</blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-subtle pt-4">
                  <Avatar name={t.name} src={t.avatar} size="md" />
                  <div>
                    <div className="text-sm font-semibold text-fg-primary">{t.name}</div>
                    <div className="text-xs text-fg-tertiary">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
