import type { Lecturer, Student } from "@/types";
import { avatarUrl } from "@/lib/utils";

export const lecturers: Lecturer[] = [
  {
    id: "lec_001",
    name: "Prof. Marie-Claire Tchouani",
    email: "mc.tchouani@stalessandro.edu",
    phone: "+237 670 112 233",
    avatar: avatarUrl("Marie-Claire Tchouani"),
    title: "Dean, School of Nursing",
    department: "School of Nursing",
    specialty: "Critical Care & Nursing Education",
    coursesCount: 4,
    rating: 4.9,
    joinedAt: "2010-09-01",
  },
  {
    id: "lec_002",
    name: "Dr. Etienne Mbarga",
    email: "e.mbarga@stalessandro.edu",
    phone: "+237 671 224 411",
    avatar: avatarUrl("Etienne Mbarga"),
    title: "Head, Allied Health Sciences",
    department: "Allied Health Sciences",
    specialty: "Clinical Microbiology",
    coursesCount: 3,
    rating: 4.7,
    joinedAt: "2014-01-12",
  },
  {
    id: "lec_003",
    name: "Mme. Sandrine Owono",
    email: "s.owono@stalessandro.edu",
    phone: "+237 678 333 220",
    avatar: avatarUrl("Sandrine Owono"),
    title: "Senior Lecturer",
    department: "School of Nursing",
    specialty: "Maternal & Child Health",
    coursesCount: 5,
    rating: 4.8,
    joinedAt: "2016-09-05",
  },
  {
    id: "lec_004",
    name: "Prof. Alessandro Romano",
    email: "a.romano@stalessandro.edu",
    phone: "+39 348 220 110",
    avatar: avatarUrl("Alessandro Romano"),
    title: "Dean, School of Food & Nutrition Sciences",
    department: "School of Food & Nutrition Sciences",
    specialty: "Food Science & Human Nutrition",
    coursesCount: 3,
    rating: 4.9,
    joinedAt: "2019-02-01",
  },
  {
    id: "lec_008",
    name: "Dr. Brigitte Nkeng",
    email: "b.nkeng@stalessandro.edu",
    phone: "+237 677 401 552",
    avatar: avatarUrl("Brigitte Nkeng"),
    title: "Senior Lecturer, Clinical Dietetics",
    department: "School of Food & Nutrition Sciences",
    specialty: "Medical Nutrition Therapy",
    coursesCount: 4,
    rating: 4.8,
    joinedAt: "2017-09-01",
  },
  {
    id: "lec_009",
    name: "Mr. Daniel Fouda",
    email: "d.fouda@stalessandro.edu",
    phone: "+237 690 223 871",
    avatar: avatarUrl("Daniel Fouda"),
    title: "Lecturer, Food Quality & Safety",
    department: "School of Food & Nutrition Sciences",
    specialty: "Food Microbiology & HACCP",
    coursesCount: 3,
    rating: 4.6,
    joinedAt: "2020-02-10",
  },
  {
    id: "lec_005",
    name: "Dr. Léa Ngono",
    email: "l.ngono@stalessandro.edu",
    phone: "+237 699 110 405",
    avatar: avatarUrl("Lea Ngono"),
    title: "Lecturer & Programme Coordinator",
    department: "Business & Administration",
    specialty: "Healthcare Operations",
    coursesCount: 3,
    rating: 4.6,
    joinedAt: "2018-09-01",
  },
  {
    id: "lec_006",
    name: "Mr. Joseph Bisseck",
    email: "j.bisseck@stalessandro.edu",
    phone: "+237 678 552 088",
    avatar: avatarUrl("Joseph Bisseck"),
    title: "Clinical Instructor",
    department: "School of Nursing",
    specialty: "Surgical Nursing",
    coursesCount: 3,
    rating: 4.5,
    joinedAt: "2020-09-10",
  },
  {
    id: "lec_007",
    name: "Dr. Christine Atangana",
    email: "c.atangana@stalessandro.edu",
    phone: "+237 671 920 044",
    avatar: avatarUrl("Christine Atangana"),
    title: "Head, Early Childhood Education",
    department: "Early Childhood Education",
    specialty: "Child Development",
    coursesCount: 3,
    rating: 4.7,
    joinedAt: "2017-09-01",
  },
];

const firstNames = [
  "Marie", "Jeanne", "Aïcha", "Sandrine", "Berthe", "Yolande", "Carine", "Esther",
  "Henriette", "Christelle", "Joseph", "Emmanuel", "Patrick", "Eric", "Hervé",
  "Boris", "Frank", "Brian", "Yvan", "Cyril", "Aminata", "Fadimatou", "Solange",
  "Rachel", "Pauline", "Linda", "Glenda", "Kelvin", "Roméo", "Steve",
];
const surnames = [
  "Mbarga", "Owono", "Tchoumi", "Bisseck", "Ekambi", "Nyemb", "Mvondo", "Eyenga",
  "Etoundi", "Nguele", "Atangana", "Mbappé", "Bekolo", "Ekani", "Ndongo", "Ondo",
  "Tagne", "Fotso", "Kamga", "Sime", "Ze", "Ela", "Bila", "Engo", "Mvogo",
];

const statuses: Student["status"][] = ["active", "active", "active", "active", "active", "on_leave", "suspended"];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Maps every program to its owning department so student records, filters and
// analytics can group by faculty (Nursing vs Food & Nutrition vs others).
export const PROGRAM_DEPARTMENT: Record<string, string> = {
  prog_bsn: "School of Nursing",
  prog_midwifery: "School of Nursing",
  prog_nutrition: "School of Food & Nutrition Sciences",
  prog_dietetics: "School of Food & Nutrition Sciences",
  prog_food_safety: "School of Food & Nutrition Sciences",
  prog_oenology: "School of Food & Nutrition Sciences",
  prog_lab: "Allied Health Sciences",
  prog_pharm: "Allied Health Sciences",
  prog_imaging: "Allied Health Sciences",
  prog_hospital_mgmt: "Business & Administration",
  prog_early_ed: "Early Childhood Education",
};

export function generateStudents(count = 48): Student[] {
  const rnd = seededRandom(31415);
  const progIds = [
    { id: "prog_bsn", name: "B.Sc. Nursing", level: "Year ", fees: 850_000 },
    { id: "prog_midwifery", name: "HND Midwifery", level: "Year ", fees: 720_000 },
    { id: "prog_nutrition", name: "B.Sc. Food Science & Nutrition", level: "Year ", fees: 820_000 },
    { id: "prog_dietetics", name: "HND Clinical Dietetics", level: "Year ", fees: 700_000 },
    { id: "prog_food_safety", name: "HND Food Quality & Safety", level: "Year ", fees: 660_000 },
    { id: "prog_lab", name: "B.Sc. Med Lab Sciences", level: "Year ", fees: 780_000 },
    { id: "prog_pharm", name: "HND Pharmacy Tech", level: "Year ", fees: 640_000 },
    { id: "prog_imaging", name: "HND Med Imaging", level: "Year ", fees: 700_000 },
    { id: "prog_early_ed", name: "Dip. Early Childhood Ed.", level: "Year ", fees: 520_000 },
  ];
  return Array.from({ length: count }, (_, i): Student => {
    const fn = firstNames[Math.floor(rnd() * firstNames.length)];
    const sn = surnames[Math.floor(rnd() * surnames.length)];
    const prog = progIds[Math.floor(rnd() * progIds.length)];
    const year = Math.floor(rnd() * 4) + 1;
    const matricule = `SAUI/${String(2024 - year + 1).slice(-2)}/${String(1000 + i)}`;
    const cgpa = Math.round((2.3 + rnd() * 1.7) * 100) / 100;
    const feesTotal = prog.fees;
    const feesPaid = Math.floor(rnd() * feesTotal);
    return {
      id: `stu_${String(i + 1).padStart(3, "0")}`,
      matricule,
      name: `${fn} ${sn}`,
      email: `${fn}.${sn}`.toLowerCase().replace(/\s+/g, "") + "@student.stalessandro.edu",
      phone: `+237 6${Math.floor(70 + rnd() * 30)} ${Math.floor(100 + rnd() * 900)} ${Math.floor(100 + rnd() * 900)}`,
      avatar: avatarUrl(`${fn} ${sn}-${i}`),
      programId: prog.id,
      programName: prog.name,
      department: PROGRAM_DEPARTMENT[prog.id] ?? "School of Nursing",
      level: `${prog.level}${year}`,
      semester: year * 2 - (rnd() > 0.5 ? 0 : 1),
      status: statuses[Math.floor(rnd() * statuses.length)],
      cgpa,
      enrolledAt: `${2024 - year + 1}-09-01`,
      guardian: {
        name: `${pick(firstNames)} ${sn}`,
        phone: `+237 6${Math.floor(70 + rnd() * 30)} ${Math.floor(100 + rnd() * 900)} ${Math.floor(100 + rnd() * 900)}`,
        email: `parent.${sn.toLowerCase()}@gmail.com`,
        relation: rnd() > 0.5 ? "Mother" : "Father",
      },
      feesTotal,
      feesPaid,
    };
  });
}

export const students = generateStudents();

// The single signed-in demo student (the one the student portal renders against)
export const currentStudent: Student = {
  id: "stu_me",
  matricule: "SAUI/22/0421",
  name: "Yolande Mvondo",
  email: "yolande.mvondo@student.stalessandro.edu",
  phone: "+237 678 220 944",
  avatar: avatarUrl("Yolande Mvondo"),
  programId: "prog_bsn",
  programName: "B.Sc. Nursing",
  department: "School of Nursing",
  level: "Year 3",
  semester: 5,
  status: "active",
  cgpa: 3.62,
  enrolledAt: "2022-09-01",
  guardian: {
    name: "Solange Mvondo",
    phone: "+237 671 332 008",
    email: "solange.mvondo@gmail.com",
    relation: "Mother",
  },
  feesTotal: 850_000,
  feesPaid: 612_500,
};
