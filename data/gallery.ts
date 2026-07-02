/**
 * Central catalog of real St Alessandro campus photography (`/public/img/N.jpg`).
 *
 * Captions and categories supplied by the institute. The three institutional
 * pillars — University, Clinic and Winery — plus cross-cutting Partnership and
 * Campus-life imagery are tagged so any page can pull the relevant subset.
 *
 * Note: `/img/10.jpg` is the SAU crest (see `CREST_SRC`) and `/img/17.jpg` was
 * removed at the institute's request — neither appears in the photo list.
 */

export type PhotoCategory =
  | "University"
  | "Clinic"
  | "Winery"
  | "Partnership"
  | "Campus";

export interface CampusPhoto {
  /** Source file index → `/img/{n}.jpg` */
  n: number;
  src: string;
  caption: string;
  category: PhotoCategory;
  /** Hero-worthy shot — gets a larger tile in masonry layouts. */
  feature?: boolean;
}

/** Official SAU crest — "Innovative education for a healthier future". */
export const CREST_SRC = "/logo/crest-512.png";

export const campusPhotos: CampusPhoto[] = [
  { n: 3, src: "/img/3.jpg", category: "Partnership", feature: true,
    caption: "Prof. Cesare Faldini, Director of Italy's Rizzoli Orthopaedic Institute, presents his orthopaedics & trauma textbooks to co-author Dr Mutsu Venantius." },
  { n: 6, src: "/img/6.jpg", category: "Clinic", feature: true,
    caption: "Our visiting Italian orthopaedic team — on campus twice a year for complex surgery and teaching." },
  { n: 21, src: "/img/21.jpg", category: "Winery", feature: true,
    caption: "Floven wines — produced by the St Alessandro Food Technology department." },
  { n: 9, src: "/img/9.jpg", category: "University", feature: true,
    caption: "Graduation 2025." },
  { n: 19, src: "/img/19.jpg", category: "Partnership", feature: true,
    caption: "RUDN University (Russia) visits St Alessandro to sign a cooperation agreement." },
  { n: 14, src: "/img/14.jpg", category: "Campus", feature: true,
    caption: "The St Alessandro University Institute campus, Bonaberi-Douala." },

  { n: 1, src: "/img/1.jpg", category: "Partnership",
    caption: "Dr Mutsu Venantius welcomes the visiting Indian fertility-clinic team." },
  { n: 2, src: "/img/2.jpg", category: "Partnership",
    caption: "The St Alessandro–Indian fertility-clinic partnership team." },
  { n: 4, src: "/img/4.jpg", category: "Partnership",
    caption: "Launching the Rizzoli-affiliated residency in orthopaedics & trauma." },
  { n: 5, src: "/img/5.jpg", category: "Partnership",
    caption: "The Faldini orthopaedics & trauma volumes handed to St Alessandro's directors." },
  { n: 7, src: "/img/7.jpg", category: "Clinic",
    caption: "A family treated for limb deformities at the St Alessandro orthopaedic clinic." },
  { n: 15, src: "/img/15.jpg", category: "Clinic",
    caption: "The Italian and Cameroonian surgical team in theatre." },
  { n: 18, src: "/img/18.jpg", category: "Clinic",
    caption: "The diagnostic imaging suite at the St Alessandro clinic." },
  { n: 20, src: "/img/20.jpg", category: "Clinic",
    caption: "C-arm fluoroscopy in the orthopaedic surgical suite." },
  { n: 8, src: "/img/8.jpg", category: "University",
    caption: "A graduating cohort of St Alessandro nurses." },
  { n: 11, src: "/img/11.jpg", category: "University",
    caption: "BSc thesis defence in Hall 1." },
  { n: 13, src: "/img/13.jpg", category: "Campus",
    caption: "The Promoter with the St Alessandro staff." },
  { n: 12, src: "/img/12.jpg", category: "Campus",
    caption: "Sports day with our visiting Italian staff." },
  { n: 16, src: "/img/16.jpg", category: "Campus",
    caption: "Campus chaplaincy — a blessing service with our student nurses." },
  { n: 22, src: "/img/22.jpg", category: "Partnership",
    caption: "A cooperation & mentorship agreement with the University of Buea." },
  { n: 23, src: "/img/23.jpg", category: "Winery",
    caption: "Floven wines — bottled on campus." },
  { n: 24, src: "/img/24.jpg", category: "Winery",
    caption: "Floven wines — the food-science flagship." },
  { n: 25, src: "/img/25.jpg", category: "Winery",
    caption: "Floven wines — from grape to glass." },
];

/** All photos in a given category, feature shots first. */
export function photosByCategory(...cats: PhotoCategory[]): CampusPhoto[] {
  return campusPhotos.filter((p) => cats.includes(p.category));
}

/** Pick specific photos by their file index, preserving the requested order. */
export function photosByIndex(...indices: number[]): CampusPhoto[] {
  return indices
    .map((i) => campusPhotos.find((p) => p.n === i))
    .filter((p): p is CampusPhoto => Boolean(p));
}
