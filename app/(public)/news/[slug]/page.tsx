import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Container, Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { news } from "@/data/notifications";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        eyebrow={item.category}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: item.title.slice(0, 40) + "…" }]}
        title={item.title}
      />
      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-default shadow-soft">
            <Image src={item.cover} alt={item.title} fill className="object-cover" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-fg-tertiary">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {formatDate(item.publishedAt)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {item.readingTime} min read</span>
            <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {item.author}</span>
            <Badge variant="brand" size="sm">{item.category}</Badge>
          </div>
          <div className="prose prose-base mt-8 max-w-none text-fg-primary">
            <p className="text-lg leading-relaxed text-fg-secondary">{item.excerpt}</p>
            <p>
              On a luminous October morning, the entire SAUI community gathered to celebrate a milestone moment.
              From the inaugural welcome by the Rector, Mr. Alessandro Foncha, to the closing benediction, the day
              honored the resilience and dedication of every graduate, faculty member and family that made this
              cohort possible.
            </p>
            <p>
              The keynote, delivered by visiting Italian faculty Prof. Alessandro Romano, emphasized the dual
              mission of clinical mastery and humane care — a thread that runs through every St Alessandro
              curriculum. He reminded graduates that "the patient remembers the touch, not the technique."
            </p>
            <p>
              In their valedictory remarks, the class representative spoke of the late-night study circles,
              the early-morning ward rounds, and the small acts of mentorship that, accumulated over years,
              built the practitioners they have become.
            </p>
            <h3>What comes next</h3>
            <p>
              Graduates now move on to roles across Cameroon, Italy, the UAE and Canada — many returning to
              SAUI as preceptors, lecturers and alumni board members. The institution looks ahead to the
              expansion of the Block C simulation suite and the launch of the new M.Sc. Healthcare Management
              program in 2027.
            </p>
          </div>
          <div className="mt-12 border-t border-subtle pt-6">
            <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-secondary hover:text-fg-primary">
              <ArrowLeft className="h-4 w-4" /> Back to all news
            </Link>
          </div>
        </article>
      </Section>
    </>
  );
}
