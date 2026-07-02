import type { Application } from "@/types";

const applicants = [
  "Steve Atangana", "Pauline Ngono", "Brian Mbappé", "Aïcha Fadimatou", "Esther Owono",
  "Linda Tagne", "Yvan Bisseck", "Glenda Mbarga", "Carine Eyenga", "Joseph Nyemb",
  "Henriette Engo", "Roméo Bekolo", "Solange Mvogo", "Patrick Ze", "Berthe Sime",
];

const progs = [
  { id: "prog_bsn", name: "B.Sc. Nursing" },
  { id: "prog_nutrition", name: "B.Sc. Food Science & Nutrition" },
  { id: "prog_midwifery", name: "HND Midwifery" },
  { id: "prog_dietetics", name: "HND Clinical Dietetics" },
  { id: "prog_lab", name: "B.Sc. Med Lab Sciences" },
  { id: "prog_food_safety", name: "HND Food Quality & Safety" },
  { id: "prog_pharm", name: "HND Pharmacy Tech" },
];

const statuses: Application["status"][] = [
  "submitted", "under_review", "interview", "accepted", "rejected", "waitlisted", "under_review",
];

export const applications: Application[] = applicants.map((name, i): Application => {
  const prog = progs[i % progs.length];
  const status = statuses[i % statuses.length];
  return {
    id: `app_${String(i + 1).padStart(3, "0")}`,
    applicationNumber: `SAUI-APP-26-${(1001 + i).toString()}`,
    applicantName: name,
    email: name.split(" ").join(".").toLowerCase() + "@gmail.com",
    phone: `+237 6${Math.floor(70 + i * 0.7)} ${Math.floor(100 + i * 12)} ${Math.floor(200 + i * 7)}`,
    programId: prog.id,
    programName: prog.name,
    status,
    submittedAt: new Date(Date.now() - i * 86_400_000 * 2).toISOString(),
    documents: [
      { name: "GCE A-Level results", uploaded: true },
      { name: "Birth certificate", uploaded: true },
      { name: "National ID / Passport", uploaded: i % 3 !== 0 },
      { name: "Medical fitness report", uploaded: i % 4 !== 0 },
      { name: "Recommendation letter", uploaded: i % 5 !== 0 },
    ],
    paymentMade: i % 6 !== 0,
    score: status === "interview" || status === "accepted" ? 60 + i : undefined,
    notes: status === "rejected" ? "Insufficient sciences background — encouraged to apply for Foundation Year." : undefined,
  };
});

// One application owned by the current user (for the applicant tracker demo)
export const myApplication: Application = {
  id: "app_me",
  applicationNumber: "SAUI-APP-26-9042",
  applicantName: "Yolande Mvondo",
  email: "yolande.mvondo@gmail.com",
  phone: "+237 678 220 944",
  programId: "prog_bsn",
  programName: "B.Sc. Nursing",
  status: "interview",
  submittedAt: new Date(Date.now() - 11 * 86_400_000).toISOString(),
  documents: [
    { name: "GCE A-Level results", uploaded: true },
    { name: "Birth certificate", uploaded: true },
    { name: "National ID / Passport", uploaded: true },
    { name: "Medical fitness report", uploaded: true },
    { name: "Recommendation letter", uploaded: true },
  ],
  paymentMade: true,
  score: 78,
};
