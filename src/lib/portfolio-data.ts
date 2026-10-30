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
  { id: "goals", label: "Career goals" },
  { id: "reflections", label: "Personal reflections" },
  { id: "development", label: "Future development plan" },
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
  phone: "+91 9447250868",
  linkedin: "linkedin.com/in/b-harisanth-krishna",
  languages: ["English", "Malayalam", "Hindi"],
};

/** Track-specific profile copy keeps the shared layout relevant to each selected path. */
const ABOUT = {
  eng: {
    lede: "Electrical and electronics engineer with experience in technical events, robotics programmes and industrial training.",
    body: [
      "At MITS, my work moved between technical design and the practical demands of student programmes: budgets, suppliers, logistics and delivery.",
      "That mix is why I am drawn to roles where engineering judgement and dependable execution meet.",
    ],
  },
  mgmt: {
    lede: "PGDM student learning how customer and market insight can inform better business decisions.",
    body: [
      "Moving from Electrical and Electronics Engineering into management has shifted my attention from how systems operate to how organisations understand the people they serve.",
      "I’m interested in financial-services marketing, where brand promises meet practical customer needs.",
    ],
  },
};

// Keep the complete education history visible in either portfolio mode so
// switching tracks changes the narrative, not the visitor's access to facts.
const EDUCATION: Education[] = [
  {
    degree: "Post Graduate Diploma in Management (PGDM)",
    institution: "Muthoot Business School (MBS)",
    period: "2026 — 2028",
    note: "Currently pursuing",
  },
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
];

export type Experience = {
  id: string;
  title: string;
  org: string;
  date: string;
  summary: string;
  location?: string;
  details: string[];
  reflection?: Reflection;
  reflectionPhoto?: string;
  placeholder?: boolean;
};

/** Five-stage reflective writing framework used for experiential learning. */
export type Reflection = {
  reporting: string;
  responding: string;
  relating: string;
  reasoning: string;
  reconstructing: string;
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  note?: string;
};
export type ClubActivity = {
  club: string;
  role: string;
  period: string;
  summary: string;
};
export type SkillGroup = {
  group: string;
  items: string[];
};
export type Cert = {
  name: string;
  issuer: string;
  issued?: string;
  note?: string;
  image?: string;
};
export type Achievement = {
  value?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
  image?: string;
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
  report?: string;
};
export type CareerGoals = {
  shortTerm: string[];
  longTerm: string[];
};

export type ModeContent = {
  code: string;
  label: string;
  short: string;
  hero: { meta: string; lines: string[]; summary: string };
  about: { lede: string; body: string[] };
  education: Education[];
  experience: Experience[];
  clubs: ClubActivity[];
  projects: Project[];
  skills: SkillGroup[];
  certifications: Cert[];
  achievements: Achievement[];
  careerGoals?: CareerGoals;
  futureDevelopment?: string[];
};

export const CONTENT: Record<Mode, ModeContent> = {
  eng: {
    code: "B.Tech",
    label: "Engineering",
    short: "ENG",
    hero: {
      meta: "B.Tech · MITS, Varikoli · 2022–2026",
      lines: ["Electrical &", "Electronics", "Engineering"],
      summary:
        "Electrical and electronics engineer with experience in robotics, technical event delivery and industrial training.",
    },
    about: ABOUT.eng,
    education: EDUCATION,
    experience: [
      {
        id: "industrial",
        title: "Industrial Internships",
        org: "Cochin Shipyard Ltd · KEL, Mamala · KSEB, Mattanchery · FACT",
        date: "2024 — 2025",
        summary:
          "Hands-on training across power distribution, electrical manufacturing, high-voltage systems and shipbuilding.",
        details: [
          "FACT — Training in high-voltage substations and protection, industrial motors, power-factor correction and capacitor banks, electrical safety, and power purchase and billing. Observed ELCB operation and a 3.3 kV motor test.",
          "KSEB — Exposure to electricity distribution, SCADA, substations and reading single-line diagrams.",
          "KEL, Mamala — Transformer manufacturing, quality checks, and ceramic and oil insulation.",
          "Cochin Shipyard Ltd — Ship repair, bilge pumps, dry docks, power substations and shipbuilding, with research exposure to solar boats and Water Metro initiatives.",
        ],
      },
    ],
    clubs: [
      {
        club: "IEEE Robotics and Automation Society SBC, MITS",
        role: "Technical Coordinator",
        period: "Feb 2024 — Feb 2025",
        summary:
          "Prepared grant proposals and coordinated robotics programmes and technical events.",
      },
      {
        club: "IEDC MITS",
        role: "Chief Marketing Officer",
        period: "Feb 2025 — Mar 2026",
        summary:
          "Secured ₹10,000 in sponsorship; led marketing and built KSUM Calicut and industry relationships.",
      },
      {
        club: "National Service Scheme, MITS",
        role: "Design Team Lead",
        period: "Apr 2024 — Jun 2025",
        summary:
          "Led a team producing posters and digital communication assets.",
      },
      {
        club: "SIEP Electric Dirt Bike Challenge",
        role: "Financial Manager",
        period: "Oct 2025 — Apr 2026",
        summary:
          "Managed the project budget, a €1,000 ESIGELEC grant, sponsorships, procurement and supplier payments.",
      },
      {
        club: "SAUVC Competition 2026",
        role: "Active Mentor",
        period: "2026",
        summary:
          "Mentored a team to a top-eight finish; one of four Indian teams selected.",
      },
    ],
    projects: [
      {
        id: "pmsm-foc-electric-bike",
        title: "Design and Simulation of a Field-Oriented PMSM Drive for Electric Bike Applications",
        kind: "B.Tech final-year team project · Apr 2026",
        summary:
          "Designed and simulated a field-oriented-controlled permanent-magnet synchronous motor drive, then evaluated its application in an electric-bike model.",
        points: [
          "Modelled a 72 V, 2 kW PMSM powertrain with a 30 Ah lithium-ion battery pack.",
          "Analysed vehicle dynamics across the chassis, braking, suspension and steering systems.",
          "Applied ANSYS structural analysis to assess the retrofitted chassis and suspension components.",
        ],
        report: "/projects/pmsm-field-oriented-control-report.pdf",
      },
    ],
    skills: [
      {
        group: "Event & technical coordination",
        items: [
          "Technical team leadership",
          "Event coordination",
          "Programme delivery",
        ],
      },
      {
        group: "Budget & supplier coordination",
        items: ["Budget tracking", "Procurement coordination", "Supplier payments"],
      },
      {
        group: "Visual communication",
        items: ["Design team coordination", "Digital communication assets"],
      },
      {
        group: "Languages",
        items: PERSON.languages,
      },
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
        issued: "Jul 2023",
        note: "Business English · B2 · Overall score 174",
        image: "/certificates/linguaskill.jpg",
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
        issued: "Jan–Mar 2025",
        image: "/certificates/soft-computing.jpg",
      },
      {
        name: "EV: Vehicle Dynamics and Electric Motor Drives",
        issuer: "NPTEL · IIT Madras",
        issued: "Jan–Apr 2026",
        image: "/certificates/ev-motor-drives.jpg",
      },
      {
        name: "Unmanned Aerial Vehicle Technology",
        issuer: "Fuselage Innovations Pvt. Ltd.",
        issued: "Dec 2025",
        note: "Five-day hands-on training in UAV design, assembly and applications.",
        image: "/certificates/uav-technology.jpg",
      },
      {
        name: "Oracle APEX Boot Camp",
        issuer: "Maathra Technology & Consultancy · apexvarsity.com",
        issued: "Nov 2023",
        note: "One-day boot camp · Oracle APEX development",
        image: "/certificates/oracle-apex-boot-camp.jpg",
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
        value: 200,
        label: "Participants · CORE 2024",
        context:
          "Coordinated the 200-participant technical conclave from planning through delivery.",
      },
      {
        value: 50,
        label: "Students · Automaze",
        context: "Coordinated a robotics bootcamp for 50 students.",
      },
      {
        value: 8,
        prefix: "Top ",
        label: "SAUVC 2026",
        context: "Mentored team — one of four teams from India selected.",
      },
      {
        label: "Prakalp — Best Departmental Project",
        context:
          "Recognised for the B.Tech final-year project and presented by Chacko M. Jose, Executive Director, BPCL.",
        image: "/images/prakalp-award.jpeg",
      },
    ],
  },
  mgmt: {
    code: "PGDM",
    label: "Management",
    short: "MGMT",
    hero: {
      meta: "Muthoot Business School · 2026–2028",
      lines: ["PGDM at", "MBS."],
      summary:
        "With a growing interest in marketing, I’m exploring how customer insight can shape stronger brand decisions.",
    },
    about: ABOUT.mgmt,
    education: EDUCATION,
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
        reflectionPhoto: "/images/muthoot-internship-presentation.jpeg",
        reflection: {
          reporting:
            "At the end of my three-month placement, we were asked to present its work in only a few minutes.",
          responding:
            "The time limit was demanding, and I had to decide what mattered most to an audience unfamiliar with the day-to-day work.",
          relating:
            "This felt close to marketing communication: the message has to meet its audience where it is.",
          reasoning:
            "I learned that concise communication depends on prioritisation and sequence, not simply speaking faster.",
          reconstructing:
            "For future presentations, I’ll state the main takeaway first, rehearse to time and keep supporting details ready for questions.",
        },
      },
    ],
    clubs: [
      {
        club: "Muthoot Business School Media Club",
        role: "Member",
        period: "Current",
        summary: "Current member of the MBS Media Club.",
      },
      {
        club: "IEDC at MBS",
        role: "Proposed initiative",
        period: "In planning",
        summary:
          "Exploring the introduction of a student-led innovation and entrepreneurship chapter at MBS. The club is still in the planning stage.",
      },
    ],
    projects: [
      {
        id: "customer-profiling",
        title: "Customer Profiling Field Survey",
        kind: "Special project · Pre-PGDM internship · Muthoot Finance",
        summary:
          "A primary fieldwork project conducted directly under the Managing Director during my pre-PGDM internship, with branch visits in Chennai and Bengaluru to profile customers closing gold loans.",
        points: [
          "This special project was directly under the Managing Director; my day-to-day internship reporting line was the MarCom Chief Manager.",
          "Collected 104 forms: 54 across the Chennai cluster and 50 across the Bengaluru cluster.",
          "Visited branches and gathered responses from customers closing gold loans, working toward at least ten completed forms per branch visited.",
          "The form covered age, occupation, reasons for taking a gold loan, prior NBFC relationships and other profile details.",
          "Built hands-on experience in field coordination and survey administration. Customer-level data are confidential; no standalone analysis or findings are claimed.",
        ],
      },
    ],
    skills: [
      {
        group: "Customer research & fieldwork",
        items: [
          "Customer-profile survey administration",
          "Branch-level field coordination",
          "Competitor research",
        ],
      },
      {
        group: "Marketing & communication",
        items: [
          "Brand communication exposure",
          "Digital outreach",
          "Presentation and concise messaging",
        ],
      },
      {
        group: "Event and stakeholder coordination",
        items: ["Sponsorship coordination", "Stakeholder communication", "Event marketing"],
      },
      {
        group: "Languages",
        items: PERSON.languages,
      },
    ],
    certifications: [
      {
        name: "Marketing Management I",
        issuer: "NPTEL · IIT Kanpur",
        issued: "Aug–Oct 2025",
        note: "Elite certificate · 84%",
        image: "/certificates/marketing-management-i.jpg",
      },
      {
        name: "Marketing Management II",
        issuer: "NPTEL · IIT Kanpur",
        issued: "Feb–Apr 2026",
        note: "Elite certificate · 75%",
        image: "/certificates/marketing-management-ii.jpg",
      },
      { name: "Project Management Foundations", issuer: "LinkedIn Learning" },
      {
        name: "Power BI for Beginners",
        issuer: "Simplilearn SkillUp",
        issued: "Jun 2026",
        note: "Course completion.",
        image: "/certificates/power-bi-beginners.jpg",
      },
    ],
    achievements: [
      {
        label: "Elected Class Representative",
        context:
          "Chosen by cohort vote during the final pre-PGDM presentation at Muthoot Business School.",
      },
    ],
    careerGoals: {
      shortTerm: [
        "Complete the PGDM with a strong academic foundation.",
        "Explore marketing roles in financial services through coursework and applied projects.",
        "Develop a clear understanding of the functions and industries that best fit my strengths.",
      ],
      longTerm: [
        "Build a career in marketing or brand management, ideally in financial services.",
        "Grow toward leadership roles that connect customer understanding with sustainable business growth.",
        "Keep entrepreneurship as a longer-term possibility as experience and opportunity develop.",
      ],
    },
    futureDevelopment: [
      "Apply PGDM concepts to current work, seek feedback on specific tasks and protect confidential information.",
      "Practise research and analysis through coursework and applied projects, then use feedback to improve the next iteration.",
      "Take on defined responsibilities in academic or club work to strengthen communication and collaboration through practice.",
      "Explore an IEDC chapter at MBS by discussing institutional support, student interest and a practical proposal. This remains a proposed initiative, not an established club.",
    ],
  },
};

export const COMPETITORS = [
  "Manappuram",
  "IIFL",
  "Kerala Bank",
  "Muthoot FinCorp",
];

