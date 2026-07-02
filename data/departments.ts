import type { Department } from "@/types";

// St Alessandro University Institute is built around two flagship schools —
// the School of Nursing and the School of Food & Nutrition Sciences — supported
// by allied health, administration and education faculties.
export const departments: Department[] = [
  {
    id: "dep_nursing",
    name: "School of Nursing",
    description:
      "Cameroon's leading nursing faculty — registered nurses, midwives and clinical practitioners trained in evidence-based, patient-centred care.",
    head: "Prof. Marie-Claire Tchouani, RN, PhD",
    programs: 4,
    staff: 38,
    students: 1240,
    color: "clinical",
  },
  {
    id: "dep_nutrition",
    name: "School of Food & Nutrition Sciences",
    description:
      "A flagship faculty pairing clinical dietetics with food science — training dietitians, nutritionists and food-safety specialists for hospitals, communities and industry.",
    head: "Prof. Alessandro Romano, PhD (Food Science, Italy)",
    programs: 4,
    staff: 26,
    students: 760,
    color: "gold",
  },
  {
    id: "dep_health_sciences",
    name: "Allied Health Sciences",
    description:
      "Laboratory science, medical imaging, pharmacy technology and public health — the multidisciplinary engine of modern care.",
    head: "Dr. Etienne Mbarga, MD, MPH",
    programs: 3,
    staff: 22,
    students: 480,
    color: "brand",
  },
  {
    id: "dep_business",
    name: "Business & Administration",
    description:
      "Hospital management, healthcare entrepreneurship and administrative leadership for the next generation of health-system architects.",
    head: "Dr. Léa Ngono",
    programs: 1,
    staff: 14,
    students: 290,
    color: "brand",
  },
  {
    id: "dep_education",
    name: "Early Childhood Education",
    description:
      "Social-emotional development, literacy and numeracy — preparing reflective educators for foundational learners.",
    head: "Dr. Christine Atangana",
    programs: 1,
    staff: 11,
    students: 215,
    color: "brand",
  },
];
