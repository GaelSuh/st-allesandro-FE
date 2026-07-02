// ── Domain types for St Alessandro University Institute platform ─────────────

export type UserRole =
  | "super_admin"
  | "school_admin"
  | "finance_officer"
  | "lecturer"
  | "clinical_supervisor"
  | "student"
  | "parent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  matricule?: string;
  phone?: string;
  department?: string;
  joinedAt: string;
  lastSeen?: string;
}

export type ProgramLevel = "Certificate" | "Diploma" | "HND" | "Bachelor" | "Master";

export type FeeTierId =
  | "hnd"
  | "short_professional"
  | "bsc"
  | "msc"
  | "mba"
  | "ortho_specialisation"
  | "distance_bsc"
  | "distance_masters_mba"
  | "distance_phd_dba";

export interface FeeInstallment {
  label: string;
  amount: number;
}

export interface FeeTier {
  id: FeeTierId;
  name: string;
  applicationFee: number;
  registrationFee: number;
  installments: FeeInstallment[];
  tuition: number;
  totalCost: number;
  admissionRequirements: string[];
  note?: string;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  level: ProgramLevel;
  duration: string;
  department: string;
  description: string;
  credits: number;
  /** Mirrors fee tier totalCost for dashboard backward compatibility */
  tuitionPerYear: number;
  feeTierId: FeeTierId;
  intake: number;
  applicationDeadline: string;
  highlights: string[];
  careerPaths: string[];
  prerequisites: string[];
  accent?: "brand" | "gold" | "clinical";
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  programs: number;
  staff: number;
  students: number;
  icon?: string;
  color: "brand" | "gold" | "clinical";
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  programId: string;
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  lecturer: string;
  schedule: string;
  enrolled: number;
  capacity: number;
  prerequisiteCodes: string[];
}

export interface Student {
  id: string;
  matricule: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  programId: string;
  programName: string;
  department: string;
  level: string;
  semester: number;
  status: "active" | "on_leave" | "suspended" | "graduated";
  cgpa: number;
  enrolledAt: string;
  guardian: { name: string; phone: string; email: string; relation: string };
  feesPaid: number;
  feesTotal: number;
}

export interface Lecturer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  title: string;
  department: string;
  specialty: string;
  coursesCount: number;
  rating: number;
  joinedAt: string;
}

export interface Application {
  id: string;
  applicationNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  programId: string;
  programName: string;
  status: "draft" | "submitted" | "under_review" | "interview" | "accepted" | "rejected" | "waitlisted";
  submittedAt: string;
  documents: { name: string; uploaded: boolean }[];
  paymentMade: boolean;
  score?: number;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  matricule: string;
  description: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: "paid" | "partial" | "overdue" | "pending";
  items: { label: string; amount: number }[];
  issuedAt: string;
}

export interface Payment {
  id: string;
  reference: string;
  studentId: string;
  studentName: string;
  amount: number;
  method: "mtn_momo" | "orange_money" | "bank_transfer" | "card";
  status: "successful" | "pending" | "failed";
  createdAt: string;
  invoiceId?: string;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  matricule: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  ca: number;
  exam: number;
  total: number;
  grade: "A" | "B+" | "B" | "C+" | "C" | "D" | "F";
  point: number;
  semester: string;
  status: "draft" | "submitted" | "approved" | "published";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  matricule: string;
  studentName: string;
  courseCode: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  recordedBy: string;
  method: "qr" | "biometric" | "manual";
}

export interface Hospital {
  id: string;
  name: string;
  type: "Teaching" | "General" | "Specialist" | "District";
  address: string;
  city: string;
  capacity: number;
  wards: string[];
  contact: { phone: string; email: string };
  rating: number;
}

export interface Rotation {
  id: string;
  studentId: string;
  matricule: string;
  studentName: string;
  hospitalId: string;
  hospitalName: string;
  ward: string;
  supervisorId: string;
  supervisorName: string;
  startDate: string;
  endDate: string;
  shift: "morning" | "afternoon" | "night";
  hoursRequired: number;
  hoursCompleted: number;
  status: "scheduled" | "in_progress" | "completed" | "evaluated";
  evaluation?: { score: number; notes: string };
}

export interface LogbookEntry {
  id: string;
  studentId: string;
  matricule: string;
  studentName: string;
  procedure: string;
  procedureCode: string;
  patient: string;
  ward: string;
  date: string;
  observations: string;
  competency: "observed" | "assisted" | "performed_supervised" | "performed_independent";
  status: "pending" | "approved" | "rejected" | "revision";
  supervisorId?: string;
  supervisorName?: string;
  supervisorSignature?: string;
  supervisorNotes?: string;
}

export interface Exam {
  id: string;
  title: string;
  courseCode: string;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  passMark: number;
  startsAt: string;
  endsAt: string;
  status: "scheduled" | "live" | "completed";
  attempted: number;
  passed: number;
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  marks: number;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning" | "danger" | "academic" | "finance" | "clinical";
  read: boolean;
  createdAt: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: "Academic" | "Clinical" | "Finance" | "Event" | "General";
  audience: UserRole[] | "all";
  pinned: boolean;
  publishedAt: string;
  author: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  category: "Academic" | "Workshop" | "Cultural" | "Sports" | "Career";
  cover?: string;
  attendees: number;
  capacity: number;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
}
