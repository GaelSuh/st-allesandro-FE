import type { ResultRecord, AttendanceRecord, Exam, ExamQuestion } from "@/types";
import { students } from "./people";

const nursingCourses = [
  { code: "NUR-305", title: "Medical–Surgical Nursing I", credits: 4 },
  { code: "NUR-307", title: "Obstetric & Gynecological Nursing", credits: 4 },
  { code: "NUR-303", title: "Professional Ethics & Law", credits: 2 },
  { code: "NUR-309", title: "Community Health Nursing", credits: 3 },
  { code: "NUR-311", title: "Mental Health Nursing", credits: 3 },
];

const nutritionCourses = [
  { code: "FNS-205", title: "Human Nutrition & Metabolism", credits: 4 },
  { code: "DIET-307", title: "Medical Nutrition Therapy", credits: 4 },
  { code: "FNS-203", title: "Food Chemistry & Analysis", credits: 3 },
  { code: "FQS-301", title: "Food Microbiology & Safety", credits: 3 },
  { code: "FNS-309", title: "Community & Public Health Nutrition", credits: 3 },
];

const isNutrition = (dept: string) => dept === "School of Food & Nutrition Sciences";

// Pick the right curriculum for a student's faculty.
const coursesFor = (dept: string) => (isNutrition(dept) ? nutritionCourses : nursingCourses);

// Default reference set (nursing) kept for the demo student's transcript.
const courseRefs = nursingCourses;

function grade(total: number): { grade: ResultRecord["grade"]; point: number } {
  if (total >= 80) return { grade: "A", point: 4.0 };
  if (total >= 75) return { grade: "B+", point: 3.5 };
  if (total >= 70) return { grade: "B", point: 3.0 };
  if (total >= 65) return { grade: "C+", point: 2.5 };
  if (total >= 60) return { grade: "C", point: 2.0 };
  if (total >= 50) return { grade: "D", point: 1.0 };
  return { grade: "F", point: 0 };
}

export const results: ResultRecord[] = students.slice(0, 30).flatMap((s, i) =>
  coursesFor(s.department).map((c, j): ResultRecord => {
    const ca = 12 + ((i + j) * 7) % 18;
    const exam = 38 + ((i * 3 + j * 11) % 35);
    const total = ca + exam;
    const g = grade(total);
    const statuses: ResultRecord["status"][] = ["draft", "submitted", "approved", "published"];
    return {
      id: `res_${i}_${j}`,
      studentId: s.id,
      matricule: s.matricule,
      studentName: s.name,
      courseCode: c.code,
      courseTitle: c.title,
      credits: c.credits,
      ca,
      exam,
      total,
      grade: g.grade,
      point: g.point,
      semester: "2025/26 · Semester 1",
      status: statuses[(i + j) % statuses.length],
    };
  })
);

// Current logged-in student's results across semesters
export const myResults: ResultRecord[] = courseRefs.map((c, j): ResultRecord => {
  const ca = 22 + (j * 3);
  const exam = 48 + (j * 4);
  const total = ca + exam;
  const g = grade(total);
  return {
    id: `myres_${j}`,
    studentId: "stu_me",
    matricule: "SAUI/22/0421",
    studentName: "Yolande Mvondo",
    courseCode: c.code,
    courseTitle: c.title,
    credits: c.credits,
    ca,
    exam,
    total,
    grade: g.grade,
    point: g.point,
    semester: "2025/26 · Semester 1",
    status: j < 3 ? "published" : "approved",
  };
});

export const attendanceRecords: AttendanceRecord[] = students.slice(0, 30).flatMap((s, i) =>
  coursesFor(s.department).slice(0, 3).map((c, j): AttendanceRecord => {
    const statuses: AttendanceRecord["status"][] = ["present", "present", "present", "late", "absent", "present", "excused"];
    return {
      id: `att_${i}_${j}`,
      studentId: s.id,
      matricule: s.matricule,
      studentName: s.name,
      courseCode: c.code,
      date: new Date(Date.now() - j * 86_400_000).toISOString(),
      status: statuses[(i + j) % statuses.length],
      recordedBy: "Mr. Joseph Bisseck",
      method: ((i + j) % 3 === 0 ? "qr" : "manual") as AttendanceRecord["method"],
    };
  })
);

export const exams: Exam[] = [
  {
    id: "exam_001",
    title: "Mid-Semester Assessment — Med-Surg I",
    courseCode: "NUR-305",
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    passMark: 24,
    startsAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
    endsAt: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    status: "live",
    attempted: 48,
    passed: 39,
  },
  {
    id: "exam_002",
    title: "OB-GYN Quiz 3",
    courseCode: "NUR-307",
    duration: 30,
    totalQuestions: 20,
    totalMarks: 20,
    passMark: 12,
    startsAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    endsAt: new Date(Date.now() + 4 * 86_400_000).toISOString(),
    status: "scheduled",
    attempted: 0,
    passed: 0,
  },
  {
    id: "exam_003",
    title: "Pharmacology Final",
    courseCode: "NUR-204",
    duration: 120,
    totalQuestions: 80,
    totalMarks: 100,
    passMark: 50,
    startsAt: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    endsAt: new Date(Date.now() - 13 * 86_400_000).toISOString(),
    status: "completed",
    attempted: 91,
    passed: 82,
  },
  {
    id: "exam_004",
    title: "Medical Nutrition Therapy — Mid-Semester",
    courseCode: "DIET-307",
    duration: 60,
    totalQuestions: 40,
    totalMarks: 40,
    passMark: 24,
    startsAt: new Date(Date.now() - 1 * 86_400_000).toISOString(),
    endsAt: new Date(Date.now() + 6 * 86_400_000).toISOString(),
    status: "live",
    attempted: 34,
    passed: 28,
  },
  {
    id: "exam_005",
    title: "Food Microbiology & Safety Quiz",
    courseCode: "FQS-301",
    duration: 30,
    totalQuestions: 20,
    totalMarks: 20,
    passMark: 12,
    startsAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    endsAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    status: "scheduled",
    attempted: 0,
    passed: 0,
  },
];

export const sampleQuestions: ExamQuestion[] = [
  {
    id: "q1",
    text: "A patient post-thyroidectomy reports tingling in the lips and fingers. The nurse should suspect:",
    options: [
      { id: "a", text: "Hypocalcemia" },
      { id: "b", text: "Hyperkalemia" },
      { id: "c", text: "Respiratory alkalosis" },
      { id: "d", text: "Hypoglycemia" },
    ],
    correctOptionId: "a",
    marks: 2,
    category: "Med-Surg",
  },
  {
    id: "q2",
    text: "Which of the following is a Trendelenburg position used for?",
    options: [
      { id: "a", text: "Postural drainage" },
      { id: "b", text: "Shock management — to improve venous return" },
      { id: "c", text: "Postpartum recovery" },
      { id: "d", text: "Tube feeding" },
    ],
    correctOptionId: "b",
    marks: 2,
    category: "Med-Surg",
  },
  {
    id: "q3",
    text: "The most appropriate first action when administering insulin is to:",
    options: [
      { id: "a", text: "Check the expiry date and rotate the vial gently" },
      { id: "b", text: "Aspirate to confirm intramuscular placement" },
      { id: "c", text: "Massage the site after injection" },
      { id: "d", text: "Use the deltoid muscle in adults" },
    ],
    correctOptionId: "a",
    marks: 2,
    category: "Pharmacology",
  },
  {
    id: "q4",
    text: "Which APGAR component is scored 0 if heart rate is absent?",
    options: [
      { id: "a", text: "Activity" },
      { id: "b", text: "Pulse" },
      { id: "c", text: "Grimace" },
      { id: "d", text: "Respiration" },
    ],
    correctOptionId: "b",
    marks: 2,
    category: "OB-GYN",
  },
  {
    id: "q5",
    text: "Universal precautions are based on the principle that:",
    options: [
      { id: "a", text: "Only patients with known infections need protection" },
      { id: "b", text: "All body fluids should be considered potentially infectious" },
      { id: "c", text: "Gloves only are required for blood contact" },
      { id: "d", text: "Sterilization is not required for non-invasive procedures" },
    ],
    correctOptionId: "b",
    marks: 2,
    category: "Foundations",
  },
  {
    id: "q6",
    text: "The recommended first-line dietary management for a patient with stage 1 hypertension is:",
    options: [
      { id: "a", text: "High-protein ketogenic diet" },
      { id: "b", text: "DASH diet — rich in fruit, vegetables and low sodium" },
      { id: "c", text: "Unrestricted Mediterranean diet" },
      { id: "d", text: "Clear fluids only for 48 hours" },
    ],
    correctOptionId: "b",
    marks: 2,
    category: "Nutrition Therapy",
  },
  {
    id: "q7",
    text: "Which temperature range is considered the 'danger zone' for rapid bacterial growth in food?",
    options: [
      { id: "a", text: "0–4 °C" },
      { id: "b", text: "5–60 °C" },
      { id: "c", text: "65–100 °C" },
      { id: "d", text: "-18 to 0 °C" },
    ],
    correctOptionId: "b",
    marks: 2,
    category: "Food Safety",
  },
  {
    id: "q8",
    text: "A child presenting with bilateral pitting oedema and a 'moon face' most likely has:",
    options: [
      { id: "a", text: "Marasmus" },
      { id: "b", text: "Kwashiorkor" },
      { id: "c", text: "Scurvy" },
      { id: "d", text: "Rickets" },
    ],
    correctOptionId: "b",
    marks: 2,
    category: "Community Nutrition",
  },
];
