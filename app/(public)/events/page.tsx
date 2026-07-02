import Image from "next/image";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Users } from "lucide-react";
import { events } from "@/data/notifications";
import { formatDate, formatTime, percent } from "@/lib/utils";

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="What's on"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        title="Symposiums, workshops, open days & more."
        description="Public and student-only events from across the SAUI calendar. All times are West Africa Time (WAT)."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((e) => (
            <Card key={e.id} className="overflow-hidden" hover>
              <div className="relative aspect-[16/9] bg-surface-sunken">
                {e.cover && (
                  <Image src={e.cover} alt={e.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                )}
                <Badge variant="solid" className="absolute left-3 top-3">{e.category}</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold leading-snug text-fg-primary">{e.title}</h3>
                <p className="mt-2 text-sm text-fg-secondary text-pretty">{e.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-subtle pt-4 text-xs">
                  <div>
                    <div className="text-fg-tertiary inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Date</div>
                    <div className="mt-0.5 font-semibold text-fg-primary">{formatDate(e.date)}</div>
                    <div className="text-fg-tertiary">{formatTime(e.date)}</div>
                  </div>
                  <div>
                    <div className="text-fg-tertiary inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Venue</div>
                    <div className="mt-0.5 font-semibold text-fg-primary">{e.location}</div>
                  </div>
                  <div>
                    <div className="text-fg-tertiary inline-flex items-center gap-1"><Users className="h-3 w-3" /> Seats</div>
                    <div className="mt-0.5 font-semibold text-fg-primary">{e.attendees}/{e.capacity}</div>
                    <div className="text-fg-tertiary">{percent(e.attendees, e.capacity)}% filled</div>
                  </div>
                </div>
                <Button variant="secondary" size="md" className="mt-5 w-full">Reserve a seat</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
