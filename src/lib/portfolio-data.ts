/**
 * All portfolio content. Engineering and Management are kept strictly
 * separate. Items marked `placeholder` are awaiting real information.
 */

export type Mode = "eng" | "mgmt";

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const PERSON = {
  name: "B Harisanth Krishna",
  first: "Harisanth",
  last: "Krishna",
  initial: "B",
  location: "Kochi, Kerala, India",
  email: "official.harisanth@gmail.com",
  phones: ["+91 9447250868", "+91 8075089069"],
  linkedin: "linkedin.com/in/b-harisanth-krishna",
  languages: ["English", "Malayalam", "Hindi"],
};

/** Track-specific profile copy keeps the shared layout relevant to each selected path. */
const ABOUT = {
  eng: {
    lede: "Electrical and electronics engineer shaped by technical events, robotics programmes and student leadership.",
    body: [
      "At MITS, I have worked across technical event coordination, robotics initiatives and student teams. I secured $2,500 in grants for robotics programmes and helped deliver events ranging from focused bootcamps to a 3,000+ participant summit.",
      "I also mentored a team to a top-eight finish at SAUVC 2026. I enjoy bringing people, logistics and technical goals together to move a project from plan to delivery.",
    ],
    facts: [
      { k: "Degree", v: "B.Tech · Electrical & Electronics" },
      { k: "Focus", v: "Technical programmes & operations" },
      { k: "Leadership", v: "IEEE · NSS · SAUVC" },
      { k: "Based in", v: "Kochi, Kerala" },
    ],
  },
  mgmt: {
    lede: "PGDM student at Muthoot Business School building a career across marketing, brand communication and business strategy.",
    body: [
      "I completed a marketing internship with Muthoot Finance’s MarCom & Brand department, studying competitor activity, customer profiling and brand communication in the NBFC sector.",
      "I have recently joined the same department in a work-integrated role. I’m interested in how clear positioning, useful customer insight and consistent communication support business growth.",
    ],
    facts: [
      { k: "Currently", v: "PGDM · Muthoot Business School" },
      { k: "Department", v: "MarCom & Brand · Muthoot Finance" },
      { k: "Focus", v: "Marketing & brand strategy" },
      { k: "Based in", v: "Kochi, Kerala" },
    ],
  },
};

export type Experience = {
  id: string;
  title: string;
  org: string;
  date: string;
  summary: string;
  location?: string;
  details: string[];
  reflection?: string;
  placeholder?: boolean;
};

export type Education = { degree: string; institution: string; period: string; note?: string };
export type SkillGroup = { group: string; items: string[]; placeholder?: boolean };
export type Cert = { name: string; issuer: string; issued?: string; note?: string };
export type Achievement = {
  value?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
  placeholder?: boolean;
};
export type Project = {
  id: string;
  title: string;
  kind: string;
  summary: string;
  points: string[];
  placeholder?: boolean;
};

export type ModeContent = {
  code: string;
  label: string;
  short: string;
  hero: { meta: string; lines: string[]; summary: string };
  about: { lede: string; body: string[]; facts: { k: string; v: string }[] };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  certifications: Cert[];
  achievements: Achievement[];
};

export const CONTENT: Record<Mode, ModeContent> = {
  eng: {
    code: "B.Tech",
    label: "Engineering",
    short: "ENG",
    hero: {
      meta: "Mode 01 / B.Tech — MITS, Varikoli · 2022–2026",
      lines: ["Electrical &", "Electronics", "Engineering"],
      summary:
        "Technical events, robotics programmes and project coordination — built on an Electrical and Electronics Engineering foundation.",
    },
    about: ABOUT.eng,
    education: [
      {
        degree: "B.Tech in Electrical and Electronics Engineering",
        institution: "Muthoot Institute of Technology and Science (MITS), Varikoli",
        period: "2022 — 2026",
      },
      {
        degree: "Grade 12 — Higher Secondary (Science)",
        institution: "St. Thomas Public School, Muvattupuzha",
        period: "2021 — 2022",
      },
    ],
    experience: [
      {
        id: "ieee",
        title: "Technical Leadership & Event Management",
        org: "IEEE Student Branch Chapter, MITS",
        date: "Dates to be confirmed",
        summary:
          "Secured $2,500 in robotics grants and coordinated technical events from 50 to 3,000+ participants.",
        details: [
          "Secured $2,500 in grants for student robotics programmes through proposal writing and stakeholder engagement.",
          "Coordinated CORE 2024, a technical conclave involving 200 participants.",
          "Coordinated Automaze, a robotics bootcamp involving 50 students.",
          "Managed technical logistics and event coordination for YESS 2024, the annual flagship summit of IEEE Kerala Section, which engaged more than 3,000 student participants.",
        ],
        reflection:
          "Managing technical events, coordinating participants and teams, engaging stakeholders and securing resources — executing activities at very different scales.",
      },
      {
        id: "sauvc",
        title: "Active Mentor",
        org: "SAUVC Competition 2026",
        date: "2026",
        summary: "Mentored a team to a top-eight finish — one of four teams from India selected.",
        details: [
          "Mentored a team participating in the competition.",
          "The team achieved a top-eight finish.",
          "The team was among the four teams from India selected for the competition.",
        ],
        reflection:
          "Supporting a technical team in a competitive environment and helping it prepare for an international competition.",
      },
      {
        id: "nss",
        title: "Design Team Lead",
        org: "National Service Scheme (NSS), MITS",
        date: "Apr 2024 — Jun 2025",
        summary: "Led a team of designers producing communication assets across digital platforms.",
        details: [
          "Led a team of designers.",
          "Coordinated the production of design assets, including posters.",
          "Contributed to improving audience engagement across digital platforms.",
        ],
        reflection:
          "Combining creative execution with team coordination to produce communication materials for digital channels.",
      },
      {
        id: "industrial",
        title: "Industrial Exposure",
        org: "Cochin Shipyard Ltd · KEL, Mamala · KSEB, Mattanchery · FACT",
        date: "2024 — 2025",
        summary: "Internships and industrial exposure across four public-sector organisations.",
        details: [
          "Cochin Shipyard Limited",
          "KEL, Mamala",
          "KSEB, Mattanchery",
          "FACT",
          "Placeholder — individual responsibilities and project descriptions have not been supplied yet.",
        ],
      },
      {
        id: "eng-pending",
        title: "Additional B.Tech roles",
        org: "Placeholder",
        date: "To be supplied",
        summary:
          "Further leadership roles from the B.Tech years will be added here once details are confirmed.",
        details: ["Placeholder — role title, organisation, dates and description pending."],
        placeholder: true,
      },
    ],
    projects: [
      {
        id: "p1",
        title: "Engineering project — to be supplied",
        kind: "Placeholder / Systems",
        summary: "Title, problem, approach and outcome for a B.Tech project will appear here.",
        points: ["Problem statement", "System architecture", "Results"],
        placeholder: true,
      },
      {
        id: "p2",
        title: "Final-year project — to be supplied",
        kind: "Placeholder / Electrical",
        summary: "Details have not been provided yet. This slot is reserved, not invented.",
        points: ["Objective", "Method", "Outcome"],
        placeholder: true,
      },
    ],
    skills: [
      {
        group: "Leadership & Coordination",
        items: [
          "Event Management",
          "Team Leadership",
          "Project Coordination",
          "Technical Logistics",
        ],
      },
      { group: "Creative", items: ["Content Creation", "Design", "Visual Communication"] },
      { group: "Languages", items: PERSON.languages },
      { group: "Technical tools", items: ["To be supplied"], placeholder: true },
    ],
    certifications: [
      {
        name: "NTSE Scholarship",
        issuer: "National Council of Educational Research and Training (NCERT)",
        note: "Academic scholarship",
      },
      {
        name: "Linguaskill",
        issuer: "Cambridge English Assessment",
        note: "Verified English proficiency",
      },
      {
        name: "Career Essentials in Generative AI",
        issuer: "Microsoft and LinkedIn",
        issued: "Apr 2025",
      },
      {
        name: "Introduction to Artificial Intelligence",
        issuer: "LinkedIn",
        issued: "Apr 2025",
      },
      {
        name: "Introduction to Soft Computing",
        issuer: "NPTEL · IIT Kharagpur",
      },
    ],
    achievements: [
      {
        value: 2500,
        prefix: "$",
        label: "Grants secured",
        context:
          "For student robotics programmes, via proposal writing and stakeholder engagement.",
      },
      {
        value: 3000,
        suffix: "+",
        label: "Participants · YESS 2024",
        context: "Technical logistics for the flagship summit of IEEE Kerala Section.",
      },
      { value: 200, label: "Participants · CORE 2024", context: "Technical conclave coordinated." },
      { value: 50, label: "Students · Automaze", context: "Robotics bootcamp coordinated." },
      {
        value: 8,
        prefix: "Top ",
        label: "SAUVC 2026",
        context: "Mentored team — one of four teams from India selected.",
      },
    ],
  },
  mgmt: {
    code: "PGDM",
    label: "Management",
    short: "MGMT",
    hero: {
      meta: "Mode 02 — PGDM, Muthoot Business School · 2026–2028",
      lines: ["Strategy,", "marketing", "& brand."],
      summary:
        "PGDM student with experience in MarCom & Brand at Muthoot Finance, now continuing with the same team in a work-integrated role.",
    },
    about: ABOUT.mgmt,
    education: [
      {
        degree: "Post Graduate Diploma in Management (PGDM)",
        institution: "Muthoot Business School (MBS)",
        period: "2026 — 2028",
      },
    ],
    experience: [
      {
        id: "muthoot-work-integrated",
        title: "Work-Integrated Intern",
        org: "Muthoot Finance Ltd. — MarCom & Brand",
        location: "Palarivattom, Ernakulam, Kerala",
        date: "Oct 2026 — Present",
        summary:
          "Recently joined the MarCom & Brand team in a work-integrated role, continuing in the same department after the marketing internship.",
        details: [
          "Joined the MarCom & Brand department in October 2026 through the work-integrated programme.",
        ],
      },
      {
        id: "muthoot",
        title: "Marketing Intern",
        org: "Muthoot Finance Ltd. — MarCom & Brand",
        location: "Palarivattom, Ernakulam, Kerala",
        date: "8 Jun — 31 Aug 2026",
        summary:
          "Strategic marketing, competitive analysis, customer profiling and brand communication in the NBFC sector.",
        details: [
          "Mentor: Anand Pankajakshan, Chief Manager.",
          "Project: A Study on Strategic Marketing, Competitive Analysis, Customer Profiling and Brand Communication in the NBFC Sector.",
          "Analysed social media activities of direct NBFC competitors, including Manappuram, IIFL, Kerala Bank and Muthoot FinCorp.",
          "Examined YouTube engagement, content tone and international NBFC advertisements.",
        ],
      },
    ],
    projects: [
      {
        id: "nbfc",
        title: "Strategic Marketing in the NBFC Sector",
        kind: "Internship study · Muthoot Finance",
        summary:
          "A study on strategic marketing, competitive analysis, customer profiling and brand communication in the NBFC sector.",
        points: [
          "Social media activity of direct competitors",
          "YouTube engagement and content tone",
          "International NBFC advertisements",
        ],
      },
    ],
    skills: [
      {
        group: "Finance & Operations",
        items: [
          "Budget Management",
          "Procurement Planning",
          "Fund Tracking",
          "Expenditure Reporting",
          "Vendor Coordination",
        ],
      },
      {
        group: "Marketing & Communication",
        items: [
          "Marketing Strategy",
          "Brand Communication",
          "Digital Outreach",
          "Stakeholder Engagement",
        ],
      },
      { group: "Data & Reporting", items: ["Data Reporting", "Financial Record Maintenance"] },
      { group: "Languages", items: PERSON.languages },
    ],
    certifications: [
      { name: "Marketing Management I", issuer: "NPTEL" },
      { name: "Marketing Management II", issuer: "NPTEL" },
      { name: "Project Management Foundations", issuer: "LinkedIn Learning" },
    ],
    achievements: [
      {
        label: "Management achievements — to be supplied",
        context:
          "No PGDM-specific achievements have been provided yet. This space is reserved rather than filled with invented results.",
        placeholder: true,
      },
    ],
  },
};

export const COMPETITORS = ["Manappuram", "IIFL", "Kerala Bank", "Muthoot FinCorp"];

