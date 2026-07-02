import type { Announcement, Notification, Event, NewsItem } from "@/types";

export const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "New result published",
    body: "Your NUR-305 result has been approved and published. Click to view your grade.",
    type: "academic",
    read: false,
    createdAt: new Date(Date.now() - 8 * 60_000).toISOString(),
    actionLabel: "View result",
    actionHref: "/dashboard/results",
  },
  {
    id: "n2",
    title: "Payment confirmation",
    body: "We've received 250,000 FCFA via MTN MoMo for Semester 1 tuition. Receipt SAUI-RCP-0421 is ready.",
    type: "finance",
    read: false,
    createdAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
    actionLabel: "Download receipt",
    actionHref: "/dashboard/finance",
  },
  {
    id: "n3",
    title: "Clinical supervisor signed your logbook",
    body: "Dr. Florence Mbongo approved 3 procedures from your Maternity rotation.",
    type: "clinical",
    read: false,
    createdAt: new Date(Date.now() - 9 * 3600_000).toISOString(),
    actionLabel: "Open logbook",
    actionHref: "/dashboard/logbook",
  },
  {
    id: "n4",
    title: "Schedule reminder",
    body: "NUR-307 lecture starts in 30 minutes — Hall B, ground floor.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 25 * 3600_000).toISOString(),
  },
  {
    id: "n5",
    title: "Library book overdue",
    body: "“Brunner & Suddarth's Textbook of Med-Surg Nursing” is 2 days overdue.",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
    actionLabel: "Renew",
    actionHref: "/dashboard/library",
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann_1",
    title: "Mid-semester clinical rotation schedule released",
    body: "Year 3 & Year 4 BSN cohorts: please review your hospital assignment in the Clinical Rotation module and confirm by Friday.",
    category: "Clinical",
    audience: ["student", "clinical_supervisor"],
    pinned: true,
    publishedAt: new Date(Date.now() - 6 * 3600_000).toISOString(),
    author: "Prof. Marie-Claire Tchouani",
  },
  {
    id: "ann_2",
    title: "Tuition installment 2 — deadline reminder",
    body: "The second tuition installment is due in 14 days. Mobile-money and bank channels remain open 24/7.",
    category: "Finance",
    audience: ["student", "parent"],
    pinned: true,
    publishedAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
    author: "Finance Office",
  },
  {
    id: "ann_3",
    title: "Career fair · International nursing recruiters",
    body: "Recruiters from Italy, UAE and Canada will visit campus on Nov 15. Bring 3 copies of your CV.",
    category: "Event",
    audience: "all",
    pinned: false,
    publishedAt: new Date(Date.now() - 4 * 86400_000).toISOString(),
    author: "Career Services",
  },
];

export const events: Event[] = [
  {
    id: "evt_1",
    title: "Open Day & Campus Tour 2026",
    description: "Discover our programs, meet our faculty, and tour our simulation labs and on-campus wine production unit.",
    date: new Date(Date.now() + 14 * 86400_000).toISOString(),
    location: "Main Campus · Bonaberi-Douala",
    category: "Academic",
    cover: "/campus/hero-2.jpg",
    attendees: 248,
    capacity: 500,
  },
  {
    id: "evt_2",
    title: "International Nurses Day · Symposium",
    description: "Keynotes from Italian, Cameroonian and WHO regional partners on the future of nursing in Africa.",
    date: new Date(Date.now() + 30 * 86400_000).toISOString(),
    location: "Auditorium Alessandro",
    category: "Academic",
    cover: "/campus/about.jpg",
    attendees: 540,
    capacity: 800,
  },
  {
    id: "evt_3",
    title: "Clinical Skills Workshop · Pediatric Resuscitation",
    description: "Hands-on workshop facilitated by the Cameroon Pediatric Society and our simulation faculty.",
    date: new Date(Date.now() + 9 * 86400_000).toISOString(),
    location: "Simulation Lab · Block C",
    category: "Workshop",
    cover: "/campus/campus-4.jpg",
    attendees: 78,
    capacity: 90,
  },
  {
    id: "evt_4",
    title: "Inter-Faculty Sports Gala",
    description: "Volleyball, football and athletics championships across all departments.",
    date: new Date(Date.now() + 21 * 86400_000).toISOString(),
    location: "Sports Complex",
    category: "Sports",
    cover: "/campus/campus-2.jpg",
    attendees: 320,
    capacity: 600,
  },
];

export const news: NewsItem[] = [
  {
    id: "news_1",
    slug: "saui-graduates-class-of-2025",
    title: "St Alessandro celebrates the Class of 2025 — 96% pass rate",
    excerpt:
      "Our largest graduating cohort to date crosses the stage at the Bonaberi Cultural Centre. Italian alumni return as guest speakers.",
    body: "On a luminous October morning…",
    cover: "/img/8.jpg",
    category: "Campus Life",
    author: "Communications Office",
    publishedAt: new Date(Date.now() - 4 * 86400_000).toISOString(),
    readingTime: 5,
  },
  {
    id: "news_2",
    slug: "italian-partnership-launches-exchange",
    title: "Università di Verona launches a clinical exchange with SAUI",
    excerpt:
      "Two cohorts of Year-4 students will spend the summer of 2026 in Verona's teaching hospitals as part of a new MoU.",
    body: "A new bilateral agreement…",
    cover: "/img/22.jpg",
    category: "Partnerships",
    author: "Office of the Rector",
    publishedAt: new Date(Date.now() - 9 * 86400_000).toISOString(),
    readingTime: 4,
  },
  {
    id: "news_3",
    slug: "new-simulation-lab-opens",
    title: "Block C simulation lab inaugurated by Ministry of Higher Education",
    excerpt:
      "A new high-fidelity simulation suite featuring adult, pediatric and birthing manikins is now live.",
    body: "Developed with WHO regional support…",
    cover: "/campus/classrooms.jpg",
    category: "Facilities",
    author: "Dean's Office",
    publishedAt: new Date(Date.now() - 14 * 86400_000).toISOString(),
    readingTime: 6,
  },
  {
    id: "news_4",
    slug: "saui-wine-production-pilot",
    title: "On-campus wine production pilot yields its first harvest",
    excerpt:
      "Italian oenology expertise meets equatorial terroir — Year 2 students vinify the inaugural batch.",
    body: "Under the guidance of Prof. Alessandro Romano…",
    cover: "/campus/food-tech-wines.jpg",
    category: "Academic",
    author: "Food Tech Department",
    publishedAt: new Date(Date.now() - 18 * 86400_000).toISOString(),
    readingTime: 4,
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "SAUI's clinical rotations exposed me to real cases from day one. By graduation I already had over 1,400 hours under expert supervision — that's irreplaceable.",
    name: "Aïcha Fadimatou",
    role: "RN · Class of 2024",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Aicha-Fadimatou",
  },
  {
    id: "t2",
    quote:
      "The Italian exchange opened my career to international hospitals. I now practice in Verona and visit SAUI yearly as guest faculty.",
    name: "Boris Eyenga",
    role: "Nurse · Verona, Italy",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Boris-Eyenga",
  },
  {
    id: "t3",
    quote:
      "Beyond the curriculum, SAUI shaped me into a confident leader. The competency-based logbook is now the gold standard for nursing schools in the region.",
    name: "Dr. Etienne Mbarga",
    role: "Alumnus & Faculty",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Etienne-Mbarga",
  },
];

export const faqs = [
  {
    q: "When is the next intake?",
    a: "We accept applications year-round, but the main intake closes on 30 August for the September academic year. A January intake exists for select diploma programs.",
  },
  {
    q: "Is St Alessandro accredited?",
    a: "Yes. SAUI is accredited by the Ministry of Higher Education of Cameroon and the Cameroon Nursing Council. Our nursing curriculum follows WHO competency standards.",
  },
  {
    q: "Can international students apply?",
    a: "Absolutely. We host students from across Central Africa and welcome applicants from anywhere in the world. Our admissions office assists with visa documentation.",
  },
  {
    q: "What financial aid is available?",
    a: "We offer merit, need-based and partner-sponsored scholarships covering up to 100% of tuition. The Sister Cities and Italian Exchange awards are flagship programs.",
  },
  {
    q: "How are clinical rotations organized?",
    a: "Students rotate through partner teaching hospitals (Laquintinie, Douala General, Polyclinique Bonanjo and more) under licensed clinical supervisors with structured logbooks and OSCE-style evaluations.",
  },
  {
    q: "Do you offer evening or part-time programs?",
    a: "Yes — selected diploma and continuing-education programs are offered in evening cohorts to accommodate working professionals.",
  },
  {
    q: "How can parents/sponsors monitor a student?",
    a: "Each enrolled student gets a unique sponsor portal credential. Sponsors see fees, attendance, exam results and clinical progress in real time.",
  },
];
