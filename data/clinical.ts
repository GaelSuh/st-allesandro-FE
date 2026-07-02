import type { Hospital, LogbookEntry, Rotation } from "@/types";
import { students } from "./people";

export const hospitals: Hospital[] = [
  {
    id: "hos_lq",
    name: "Laquintinie Hospital",
    type: "Teaching",
    address: "Akwa, Douala",
    city: "Douala",
    capacity: 720,
    wards: ["Emergency", "Pediatrics", "Maternity", "Med-Surg", "ICU", "Oncology"],
    contact: { phone: "+237 233 423 005", email: "contact@laquintinie.cm" },
    rating: 4.6,
  },
  {
    id: "hos_dgh",
    name: "Douala General Hospital",
    type: "Teaching",
    address: "Bonanjo, Douala",
    city: "Douala",
    capacity: 540,
    wards: ["Cardiology", "Surgery", "Neurology", "Internal Medicine", "Maternity"],
    contact: { phone: "+237 233 425 000", email: "info@dgh.cm" },
    rating: 4.7,
  },
  {
    id: "hos_bonassama",
    name: "Bonassama District Hospital",
    type: "District",
    address: "Bonassama, Douala",
    city: "Douala",
    capacity: 220,
    wards: ["Outpatient", "Maternity", "General Medicine"],
    contact: { phone: "+237 233 410 220", email: "hopital.bonassama@cm" },
    rating: 4.2,
  },
  {
    id: "hos_buea",
    name: "Buea Regional Hospital",
    type: "General",
    address: "Buea, South-West Region",
    city: "Buea",
    capacity: 380,
    wards: ["Emergency", "Pediatrics", "Surgery", "Med-Surg"],
    contact: { phone: "+237 233 320 144", email: "info@bueahospital.cm" },
    rating: 4.4,
  },
  {
    id: "hos_polyclinique",
    name: "Polyclinique Bonanjo",
    type: "Specialist",
    address: "Bonanjo, Douala",
    city: "Douala",
    capacity: 140,
    wards: ["Cardiology", "Oncology", "Ophthalmology", "ENT"],
    contact: { phone: "+237 233 426 411", email: "polyclinique@bonanjo.cm" },
    rating: 4.8,
  },
];

const wardCycle = ["Med-Surg", "Maternity", "Pediatrics", "Emergency", "ICU", "Surgery", "Cardiology"];
const shiftCycle: Rotation["shift"][] = ["morning", "afternoon", "night"];

export const rotations: Rotation[] = students.slice(0, 24).map((s, i): Rotation => {
  const hospital = hospitals[i % hospitals.length];
  const ward = wardCycle[i % wardCycle.length];
  const hoursRequired = 120;
  const hoursCompleted = Math.floor(((i * 17) % 130) * 0.95);
  const status: Rotation["status"] =
    hoursCompleted >= hoursRequired ? (i % 3 === 0 ? "evaluated" : "completed") : hoursCompleted === 0 ? "scheduled" : "in_progress";

  const startDays = 30 - i;
  const start = new Date(Date.now() - startDays * 86_400_000);
  const end = new Date(start.getTime() + 28 * 86_400_000);

  return {
    id: `rot_${String(i + 1).padStart(3, "0")}`,
    studentId: s.id,
    matricule: s.matricule,
    studentName: s.name,
    hospitalId: hospital.id,
    hospitalName: hospital.name,
    ward,
    supervisorId: `sup_${(i % 4) + 1}`,
    supervisorName: [
      "Dr. Florence Mbongo",
      "Mr. Patrick Eyenga",
      "Mme. Berthe Tcheunge",
      "Dr. Cyril Mbarga",
    ][i % 4],
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    shift: shiftCycle[i % shiftCycle.length],
    hoursRequired,
    hoursCompleted,
    status,
    evaluation:
      status === "evaluated"
        ? { score: Math.floor(72 + (i % 25)), notes: "Strong patient communication; refine sterile technique." }
        : undefined,
  };
});

const procedures = [
  { code: "P-001", name: "IV Cannulation" },
  { code: "P-002", name: "Wound Dressing — clean" },
  { code: "P-003", name: "Intramuscular Injection" },
  { code: "P-004", name: "Urinary Catheterization (Female)" },
  { code: "P-005", name: "Vital Signs Assessment" },
  { code: "P-006", name: "Nasogastric Tube Insertion" },
  { code: "P-007", name: "Blood Glucose Monitoring" },
  { code: "P-008", name: "Neonatal Resuscitation" },
  { code: "P-009", name: "CPR — Adult" },
  { code: "P-010", name: "Patient Bed Bath" },
];

const competencies: LogbookEntry["competency"][] = [
  "observed",
  "assisted",
  "performed_supervised",
  "performed_independent",
];
const statuses: LogbookEntry["status"][] = ["pending", "approved", "approved", "revision", "approved"];

export const logbookEntries: LogbookEntry[] = students.slice(0, 18).flatMap((s, i): LogbookEntry[] =>
  procedures.slice(0, 4 + (i % 3)).map((p, j) => {
    const status = statuses[(i + j) % statuses.length];
    return {
      id: `log_${i}_${j}`,
      studentId: s.id,
      matricule: s.matricule,
      studentName: s.name,
      procedureCode: p.code,
      procedure: p.name,
      patient: `Patient ${String.fromCharCode(65 + ((i + j) % 26))}.${String(100 + j)}`,
      ward: wardCycle[(i + j) % wardCycle.length],
      date: new Date(Date.now() - (i * 4 + j) * 86_400_000).toISOString(),
      observations:
        "Procedure executed under preceptor supervision. Patient tolerated well, no complications observed. Documented in patient file.",
      competency: competencies[(i + j) % competencies.length],
      status,
      supervisorId: status === "approved" ? "sup_1" : undefined,
      supervisorName: status === "approved" ? "Dr. Florence Mbongo" : undefined,
      supervisorNotes: status === "revision" ? "Please attach a copy of the consent form scanned." : undefined,
    };
  })
);
