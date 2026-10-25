/**
 * All portfolio content. Engineering and Management are kept strictly
 * separate. Items marked `placeholder` are awaiting real information.
 */

export type Mode = "eng" | "mgmt";

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "clubs", label: "Club activities" },
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
      "At MITS, I have worked across technical event coordination, robotics initiatives and student teams. I secured $2,500 in grants for robotics programmes and led the technical team for YESS 2024, a summit with more than 4,000 participants.",
      "I also mentored a team to a top-eight finish at SAUVC 2026. I enjoy bringing people, logistics and technical goals together to move a project from plan to delivery.",
    ],
    facts: [
      { k: "Degree", v: "B.Tech · Electrical & Electronics" },
      { k: "Focus", v: "Technical programmes & operations" },
      { k: "Leadership", v: "IEEE · IEDC · NSS · SIEP" },
      { k: "Based in", v: "Kochi, Kerala" },
    ],
  },
  mgmt: {
    lede: "PGDM student at Muthoot Business School exploring the intersection of marketing, customer insight and financial services.",
    body: [
      "During a 12-week internship with Muthoot Finance’s MarCom & Brand team, I worked across competitor research, customer-profile fieldwork and campaign analysis. The experience gave me a practical view of how marketing connects to business decisions in financial services.",
      "I have recently joined the same department through MBS’s work-integrated learning programme. As I continue the PGDM, I’m especially interested in evidence-led marketing, customer insight and fintech.",
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
export type ClubActivity = { club: string; role: string; period: string; summary: string };
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
  status?: string;
};

export type ModeContent = {
  code: string;
  label: string;
  short: string;
  hero: { meta: string; lines: string[]; summary: string };
  about: { lede: string; body: string[]; facts: { k: string; v: string }[] };
  education: Education[];
  experience: Experience[];
  clubs: ClubActivity[];
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
        id: "siep",
        title: "Financial Manager",
        org: "SIEP Electric Dirt Bike Challenge",
        date: "Oct 2025 — Apr 2026",
        summary: "Managed project budgets, grant and sponsorship funding, procurement, and supplier payments.",
        details: [
          "Managed the end-to-end project budget, including ₹10,000 in sponsorships and a €1,000 grant secured from ESIGELEC, France.",
          "Directed procurement planning, vendor negotiations, and expenditure tracking across the project cycle.",
          "Maintained financial records and coordinated supplier payments to ensure budget adherence.",
        ],
      },
      {
        id: "iedc",
        title: "Chief Marketing Officer",
        org: "IEDC MITS",
        date: "Feb 2025 — Mar 2026",
        summary: "Led marketing strategy, brand communication, and digital outreach for the institute’s entrepreneurship cell.",
        details: [
          "Secured ₹10,000 in sponsorship for IEDC MITS.",
          "Built partnerships with Kerala Startup Mission (KSUM), Calicut, and industry stakeholders.",
          "Led marketing strategy, brand communication, and digital outreach for the entrepreneurship cell.",
        ],
      },
      {
        id: "ieee-ras",
        title: "Technical Coordinator",
        org: "IEEE Robotics and Automation Society SBC, MITS",
        date: "Feb 2024 — Feb 2025",
        summary: "Secured $2,500 in robotics grants and led technical delivery for student events, including YESS 2024 with 4,000+ participants.",
        details: [
          "Secured $2,500 in grants for student robotics programmes through proposal writing and stakeholder engagement.",
          "Coordinated CORE 2024, a 200-participant technical conclave, and Automaze, a 50-student robotics bootcamp.",
          "Led the technical team for YESS 2024, IEEE Kerala Section’s flagship summit, with more than 4,000 participants.",
        ],
      },
      {
        id: "nss",
        title: "Design Team Lead",
        org: "National Service Scheme (NSS), MITS",
        date: "Apr 2024 — Jun 2025",
        summary: "Led a team of designers producing communication assets across digital platforms.",
        details: [
          "Led a team of designers to produce posters and digital communication assets.",
          "Supported audience engagement across NSS digital platforms.",
        ],
      },
      {
        id: "industrial",
        title: "Industrial Internships",
        org: "Cochin Shipyard Ltd · KEL, Mamala · KSEB, Mattanchery · FACT",
        date: "2024 — 2025",
        summary: "Hands-on training across power distribution, electrical manufacturing, high-voltage systems and shipbuilding.",
        details: [
          "FACT — Training in high-voltage substations and protection, industrial motors, power-factor correction and capacitor banks, electrical safety, and power purchase and billing. Observed ELCB operation and a 3.3 kV motor test.",
          "KSEB — Exposure to electricity distribution, SCADA, substations and reading single-line diagrams.",
          "KEL, Mamala — Transformer manufacturing, quality checks, and ceramic and oil insulation.",
          "Cochin Shipyard Ltd — Ship repair, bilge pumps, dry docks, power substations and shipbuilding, with research exposure to water bots, solar boats and Water Metro initiatives.",
        ],
      },
      {
        id: "sauvc",
        title: "Active Mentor",
        org: "SAUVC Competition 2026",
        date: "2026",
        summary: "Mentored a team to a top-eight finish — one of four teams from India selected.",
        details: ["Mentored a team participating in the competition.", "The team achieved a top-eight finish and was one of four teams from India selected."],
      },
    ],
    clubs: [
      { club: "IEEE Robotics and Automation Society SBC, MITS", role: "Technical Coordinator", period: "Feb 2024 — Feb 2025", summary: "Robotics programmes, technical events, and student-team coordination." },
      { club: "IEDC MITS", role: "Chief Marketing Officer", period: "Feb 2025 — Mar 2026", summary: "Entrepreneurship-cell marketing, sponsorship, and KSUM / industry partnerships." },
      { club: "National Service Scheme, MITS", role: "Design Team Lead", period: "Apr 2024 — Jun 2025", summary: "Led the student design team for digital communication assets." },
      { club: "SIEP Electric Dirt Bike Challenge", role: "Financial Manager", period: "Oct 2025 — Apr 2026", summary: "Managed project funding, budgets, procurement, and supplier payments." },
    ],
    projects: [
      {
        id: "p1",
        title: "Final-Year Engineering Project",
        kind: "B.Tech capstone · report pending",
        summary: "A public case study will be added after the final-year project report has been submitted.",
        points: [],
        status: "Case study after report submission",
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
        value: 4000,
        suffix: "+",
        label: "Participants · YESS 2024",
        context: "Led the technical team for the flagship summit of IEEE Kerala Section.",
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
    clubs: [
      {
        club: "Muthoot Business School Media Club",
        role: "Member",
        period: "Current",
        summary: "Current member of the MBS Media Club.",
      },
    ],
    projects: [
      {
        id: "nbfc",
        title: "Marketing Research & Campaign Analysis",
        kind: "Internship study · Muthoot Finance",
        summary:
          "A 12-week MarCom & Brand internship combining competitor research, customer-profile fieldwork and structured analysis of public campaigns.",
        points: [
          "Compared competitor positioning and public campaign communication across financial services.",
          "Collected 104 customer-profile forms across Chennai and Bengaluru. No customer-level information or unverified findings are shared.",
          "Analyzed approximately 15 public financial-services campaigns using a seven-part agency-brief framework.",
          "Prepared scoping and presentation materials. Proposals are not presented as launched campaigns or measured results.",
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
    achievements: [],
  },
};

export const COMPETITORS = ["Manappuram", "IIFL", "Kerala Bank", "Muthoot FinCorp"];

