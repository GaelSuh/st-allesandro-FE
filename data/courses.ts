import type { Course } from "@/types";

export const courses: Course[] = [
  { id: "c_anat101", code: "NUR-201", title: "Human Anatomy & Physiology II", credits: 4, programId: "prog_bsn", semester: 3, lecturer: "Prof. Marie-Claire Tchouani", schedule: "Mon · Wed · 08:00–10:00", enrolled: 84, capacity: 120, prerequisiteCodes: ["NUR-101"] },
  { id: "c_pharma", code: "NUR-204", title: "Pharmacology for Nurses", credits: 3, programId: "prog_bsn", semester: 4, lecturer: "Dr. Etienne Mbarga", schedule: "Tue · Thu · 10:00–12:00", enrolled: 78, capacity: 90, prerequisiteCodes: ["NUR-103"] },
  { id: "c_medsurg", code: "NUR-305", title: "Medical–Surgical Nursing I", credits: 4, programId: "prog_bsn", semester: 5, lecturer: "Mr. Joseph Bisseck", schedule: "Mon · Fri · 13:00–15:00", enrolled: 62, capacity: 70, prerequisiteCodes: ["NUR-204"] },
  { id: "c_ob", code: "NUR-307", title: "Obstetric & Gynecological Nursing", credits: 4, programId: "prog_bsn", semester: 5, lecturer: "Mme. Sandrine Owono", schedule: "Wed · 08:00–12:00", enrolled: 60, capacity: 70, prerequisiteCodes: ["NUR-204"] },
  { id: "c_research", code: "NUR-401", title: "Nursing Research Methods", credits: 3, programId: "prog_bsn", semester: 7, lecturer: "Prof. Marie-Claire Tchouani", schedule: "Thu · 14:00–17:00", enrolled: 45, capacity: 60, prerequisiteCodes: [] },
  { id: "c_ethics", code: "NUR-303", title: "Professional Ethics & Law", credits: 2, programId: "prog_bsn", semester: 5, lecturer: "Dr. Léa Ngono", schedule: "Fri · 09:00–11:00", enrolled: 62, capacity: 80, prerequisiteCodes: [] },
  { id: "c_micro", code: "MLS-205", title: "Clinical Microbiology", credits: 4, programId: "prog_lab", semester: 3, lecturer: "Dr. Etienne Mbarga", schedule: "Mon · 09:00–12:00", enrolled: 42, capacity: 50, prerequisiteCodes: ["MLS-101"] },
  { id: "c_nut_meta", code: "FNS-205", title: "Human Nutrition & Metabolism", credits: 4, programId: "prog_nutrition", semester: 3, lecturer: "Prof. Alessandro Romano", schedule: "Mon · Wed · 08:00–10:00", enrolled: 72, capacity: 100, prerequisiteCodes: ["FNS-101"] },
  { id: "c_mnt", code: "DIET-307", title: "Medical Nutrition Therapy", credits: 4, programId: "prog_dietetics", semester: 5, lecturer: "Dr. Brigitte Nkeng", schedule: "Tue · Thu · 10:00–12:00", enrolled: 48, capacity: 60, prerequisiteCodes: ["FNS-205"] },
  { id: "c_foodchem", code: "FNS-203", title: "Food Chemistry & Analysis", credits: 3, programId: "prog_nutrition", semester: 3, lecturer: "Prof. Alessandro Romano", schedule: "Wed · 13:00–16:00", enrolled: 70, capacity: 100, prerequisiteCodes: [] },
  { id: "c_foodmicro", code: "FQS-301", title: "Food Microbiology & Safety", credits: 3, programId: "prog_food_safety", semester: 4, lecturer: "Mr. Daniel Fouda", schedule: "Fri · 09:00–12:00", enrolled: 44, capacity: 50, prerequisiteCodes: ["FNS-203"] },
  { id: "c_commnut", code: "FNS-309", title: "Community & Public Health Nutrition", credits: 3, programId: "prog_nutrition", semester: 6, lecturer: "Dr. Brigitte Nkeng", schedule: "Thu · 14:00–17:00", enrolled: 58, capacity: 80, prerequisiteCodes: ["FNS-205"] },
  { id: "c_foodproc", code: "FPT-103", title: "Food Processing & Fermentation", credits: 3, programId: "prog_oenology", semester: 2, lecturer: "Prof. Alessandro Romano", schedule: "Tue · Thu · 14:00–16:00", enrolled: 22, capacity: 30, prerequisiteCodes: [] },
];

// What the current logged-in student is enrolled in this semester
export const currentSemesterCourses = [
  courses[2], // Med-Surg I
  courses[3], // OB-GYN
  courses[5], // Ethics
];
