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
  linkedin: "linkedin.com/in/b-harisanth-krishna",
  languages: ["English", "Malayalam", "Hindi"],
};

/** Track-specific profile copy keeps the shared layout relevant to each selected path. */
const ABOUT = {
  eng: {
    lede: "Electrical and electronics engineer with experience in technical events, robotics programmes and industrial training.",
    body: [
      "At MITS, I coordinated robotics programmes and student events, secured $2,500 in grants, and led the technical team for YESS 2024, which welcomed more than 4,000 participants.",
      "I mentored a team to a top-eight finish at SAUVC 2026; it was one of four teams selected from India.",
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
  evidence: string;
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
  about: { lede: string; body: string[]; facts: { k: string; v: string }[] };
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
    education: [
      {
        degree: "B.Tech in Electrical and Electronics Engineering",
        institution:
          "Muthoot Institute of Technology and Science (MITS), Varikoli",
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
          "Secured $2,500 in grants; coordinated CORE 2024 and Automaze; led the technical team for YESS 2024 (4,000+ participants).",
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
        title: "Field-Oriented Control for a PMSM Electric Bike",
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
        evidence: "YESS 2024 (4,000+ participants), CORE 2024 and Automaze; IEEE RAS SBC, MITS.",
      },
      {
        group: "Budget & supplier coordination",
        items: ["Budget tracking", "Procurement coordination", "Supplier payments"],
        evidence: "Financial Manager for the SIEP Electric Dirt Bike Challenge; managed sponsorships, grants and project expenditure.",
      },
      {
        group: "Visual communication",
        items: ["Design team coordination", "Digital communication assets"],
        evidence: "Design Team Lead, NSS MITS; led production of posters and digital assets.",
      },
      {
        group: "Languages",
        items: PERSON.languages,
        evidence: "Cambridge Linguaskill Business assessment: English B2 (overall score 174); Malayalam and Hindi listed in the supplied résumé.",
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
        context:
          "Led the technical team for the flagship summit of IEEE Kerala Section.",
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
        "Strategy, marketing & brand, grounded in MarCom & Brand experience at Muthoot Finance.",
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
        reflectionPhoto: "/images/muthoot-internship-presentation.jpeg",
        reflection: {
          reporting:
            "In the final presentation before PGDM, we had only a few minutes to cover the work of a three-month internship.",
          responding:
            "The tight time limit made the need to choose and communicate the most relevant points immediately clear.",
          relating:
            "It reinforced a discipline I use in marketing communication: understand the audience, focus the message and support it with relevant evidence.",
          reasoning:
            "Being concise without losing substance depends on prioritising, sequencing and stating each point precisely.",
          reconstructing:
            "For future presentations, I will define the main takeaway first, rehearse to the time limit and keep supporting detail ready for questions.",
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
        evidence: "104 customer forms collected across Chennai and Bengaluru; internship report also documents NBFC and digital-channel competitor analysis.",
      },
      {
        group: "Marketing & communication",
        items: [
          "Brand communication exposure",
          "Digital outreach",
          "Presentation and concise messaging",
        ],
        evidence: "MarCom & Brand internship and current work-integrated role at Muthoot Finance; IEDC MITS marketing leadership and final internship presentation.",
      },
      {
        group: "Event and stakeholder coordination",
        items: ["Sponsorship coordination", "Stakeholder communication", "Event marketing"],
        evidence: "IEDC MITS Chief Marketing Officer; secured ₹10,000 sponsorship and coordinated KSUM and industry relationships.",
      },
      {
        group: "Languages",
        items: PERSON.languages,
        evidence: "Cambridge Linguaskill Business assessment: English B2 (overall score 174); Malayalam and Hindi listed in the supplied résumé.",
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
        note: "Course completion; not an official Microsoft certification.",
        image: "/certificates/power-bi-beginners.jpg",
      },
    ],
    achievements: [],
    careerGoals: {
      shortTerm: [
        "Complete the PGDM with a strong academic foundation.",
        "Build practical marketing experience through the work-integrated role and live projects.",
        "Develop depth in digital marketing, brand communication and consumer insight.",
        "Strengthen strategic thinking and analytical decision-making.",
        "Build purposeful relationships across the business community.",
      ],
      longTerm: [
        "Grow into a strategic marketing or brand leadership role.",
        "Lead teams that connect customer insight with sustainable business growth.",
        "Build broad management capability across marketing, finance and strategy.",
        "Explore entrepreneurship as experience and opportunity develop.",
      ],
    },
    futureDevelopment: [
      "Apply PGDM learning to the work-integrated role and keep a reflective record of responsibilities, feedback and learning while protecting confidential information.",
      "Strengthen analytical thinking, research methods and problem-solving through coursework, projects and feedback.",
      "Build communication, collaboration and leadership through academic, club and professional opportunities.",
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

