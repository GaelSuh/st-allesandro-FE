import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { news } from "@/data/notifications";
import { formatDate } from "@/lib/utils";

export default function NewsListPage() {
  const [feature, ...rest] = news;
  return (
    <>
      <PageHeader
        eyebrow="News & stories"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
        title="Updates, announcements and campus chronicles."
      />
      <Section>
        <Link href={`/news/${feature.slug}`} className="group block overflow-hidden rounded-3xl border border-default bg-surface-elevated shadow-soft hover:shadow-elevated transition-shadow">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto bg-surface-sunken">
              <Image src={feature.cover} alt={feature.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <Badge variant="brand">{feature.category}</Badge>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-fg-primary">{feature.title}</h2>
              <p className="mt-4 text-base text-fg-secondary text-pretty">{feature.excerpt}</p>
              <p className="mt-5 text-xs text-fg-tertiary">{formatDate(feature.publishedAt)} · {feature.readingTime} min read · {feature.author}</p>
            </div>
          </div>
        </Link>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rest.map((n) => (
            <Card key={n.id} hover className="overflow-hidden">
              <Link href={`/news/${n.slug}`} className="relative block aspect-[16/10] bg-surface-sunken overflow-hidden">
                <Image src={n.cover} alt={n.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
              </Link>
              <CardContent className="p-5">
                <Badge variant="neutral" size="sm">{n.category}</Badge>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-fg-primary line-clamp-2">
                  <Link href={`/news/${n.slug}`} className="hover:underline">{n.title}</Link>
                </h3>
                <p className="mt-2 text-xs text-fg-tertiary">{formatDate(n.publishedAt)} · {n.readingTime} min read</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
