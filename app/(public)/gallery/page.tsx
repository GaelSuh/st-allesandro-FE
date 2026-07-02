import type { Metadata } from "next";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Container";
import { CampusPhotoGrid } from "@/components/public/CampusPhotoGrid";
import { photosByCategory, type PhotoCategory } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery — St Alessandro University Institute",
  description:
    "Photography from the St Alessandro campus in Bonaberi-Douala — university, clinic and Floven winery, and our Italian orthopaedic partnerships.",
};

const groups: { category: PhotoCategory; eyebrow: string; title: string; description: string }[] = [
  {
    category: "University",
    eyebrow: "The University",
    title: "Where future caregivers are formed",
    description: "Graduations, thesis defences and the academic life of the institute.",
  },
  {
    category: "Clinic",
    eyebrow: "The Clinic",
    title: "St Alessandro Clinic — orthopaedic & surgical care",
    description: "Our Italian-mentored surgical teams, theatres, imaging suite and the families we treat.",
  },
  {
    category: "Winery",
    eyebrow: "The Winery",
    title: "Floven wines — from our Food Technology unit",
    description: "The food-science flagship of our School of Agriculture & Food Science.",
  },
  {
    category: "Partnership",
    eyebrow: "Partnerships",
    title: "Built in collaboration",
    description: "From Bologna's Rizzoli Institute to RUDN, the University of Buea and visiting clinical teams.",
  },
  {
    category: "Campus",
    eyebrow: "Campus life",
    title: "A living, breathing campus",
    description: "Sport, chaplaincy, our people and the buildings of Bonaberi-Douala.",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        title="Snapshots from a living, breathing campus."
        description="One campus, three institutions — a university, a clinic and a winery, bound by Italian orthopaedic heritage."
      />
      {groups.map((g, i) => (
        <Section
          key={g.category}
          eyebrow={g.eyebrow}
          title={g.title}
          description={g.description}
          align="left"
          className={i % 2 === 1 ? "bg-surface-elevated/40" : ""}
        >
          <CampusPhotoGrid photos={photosByCategory(g.category)} showCategory={false} />
        </Section>
      ))}
    </>
  );
}
