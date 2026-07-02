export const BRAND = {
  name: "St Alessandro University Institute",
  short: "St Alessandro",
  abbreviation: "SAUI",
  tagline: "Empowering minds, inspiring excellence, innovating knowledge, shaping tomorrow.",
  mission: "Inspire students to dream more, learn more, do more, and become more.",
  founded: 2022,
  website: "www.edusau.com",
  location: {
    city: "Bonaberi-Douala",
    country: "Cameroon",
    address: "Opposite Brigade de Recherche's Ndobo, just before the bridge to Bonamoussadi quarter, Bonaberi-Douala",
    coords: { lat: 4.09268, lng: 9.63883 },
  },
  contact: {
    phone: "+237 673 409 309",
    phones: ["+237 673 409 309", "+237 679 671 505", "+237 696 894 215", "+237 676 230 402"],
    email: "admission@edusau.com",
    emails: ["admission@edusau.com"],
    whatsapp: "+237 673 409 309",
    hours: "Mon–Fri 8am – 5pm · Sat 8am – 1pm",
  },
  authorization: "N° 2305335/L/MINESUP/SG/DDES/SDA/NS",
  social: {
    facebook: "https://facebook.com/stalessandro",
    instagram: "https://instagram.com/stalessandro",
    linkedin: "https://linkedin.com/school/stalessandro",
    youtube: "https://youtube.com/@stalessandro",
    twitter: "https://twitter.com/stalessandro",
  },
  mentors: [
    "University of Buea",
    "ortopedici.org — Rizzoli Orthopaedic Institute, Italy",
    "GHC Hospital, India",
  ],
  accreditations: [
    "Ministry of Higher Education (MINESUP), Cameroon",
    "ANBG, Gabon",
    "University of Buea (mentorship)",
    "Rizzoli Orthopaedic Institute, Italy",
  ],
} as const;

export const STATS = [
  { label: "Students enrolled", value: 2_400, suffix: "+" },
  { label: "Clinical partners", value: 38 },
  { label: "Graduation rate", value: 96, suffix: "%" },
  { label: "Years of excellence", value: new Date().getFullYear() - BRAND.founded },
] as const;
