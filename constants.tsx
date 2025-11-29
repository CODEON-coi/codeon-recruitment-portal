import { Code2, Server, BookOpen, Search, Palette, ShieldCheck, Cpu, Terminal, Users, Lock, Award, Briefcase } from 'lucide-react';
import { Department, Benefit, Principle, CulturePoint } from './types';

// --- Content from Document ---

export const INTRO_TEXT = {
  title: "Introduction",
  content: [
    "CODEON is an emerging English-based programming language designed to generate real executable code across multiple languages such as Python, SQL, HTML, CSS, and others. The language is built on a full compiler architecture including lexical analysis, parsing (AST), semantic validation, optimization, and multi target transpilation.",
    "A functional prototype of CODEON is operational, accompanied by a Web IDE, documentation portal, and a comprehensive syntax guide. The next phase involves strengthening the ecosystem around the compiler while keeping the language core private and protected.",
    "To support these goals, the project is forming a small and highly focused team. This document outlines the departments, roles, boundaries, and expectations for contributors."
  ]
};

export const PRINCIPLES: Principle[] = [
  {
    title: 'The compiler core remains private',
    description: 'No contributor will access CODEON’s internal algorithmic engine, core compiler modules, or underlying architecture.',
    icon: Lock
  },
  {
    title: 'Team members assist ecosystem development, not language construction',
    description: 'Work includes platform building, testing, documentation, and design—not changing the core language logic.',
    icon: Cpu
  },
  {
    title: 'Professional structure and discipline',
    description: 'Clear separation of responsibilities is maintained to protect intellectual property and ensure organized progress.',
    icon: ShieldCheck
  },
  {
    title: 'Long-term collaboration',
    description: 'Team members should be reliable, consistent, and committed to building a scalable product.',
    icon: Users
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: '(Web Platform & IDE)',
    description: 'Responsible for building and refining all user-facing systems.',
    responsibilities: [
      'Improve Web IDE interface and user experience',
      'Design editor components (themes, layout, panels, toolbars)',
      'Implement real-time display for transpiled outputs',
      'Enhance documentation portal UI',
      'Develop polished landing pages and platform navigation'
    ],
    skills: ['HTML, CSS, JavaScript', 'React or Next.js (preferred)', 'Basic design sense / UI frameworks'],
    icon: Code2
  },
  {
    id: 'backend',
    title: 'Backend Development',
    subtitle: '(Systems, Deployment & Execution Engine)',
    description: 'Handles the infrastructure surrounding CODEON’s processing environment.',
    responsibilities: [
      'Develop secure API communication between IDE and backend',
      'Create a safe execution layer for running user programs',
      'Manage authentication and account systems (if required)',
      'Deploy cloud instances, sandboxing systems, and protected execution environments',
      'Optimize backend stability and scalability'
    ],
    skills: ['Python (strongly preferred)', 'Flask/Django/FastAPI', 'Cloud systems (AWS, GCP, DigitalOcean, Render)', 'Security practices for code execution environments'],
    icon: Server
  },
  {
    id: 'docs',
    title: 'Documentation & Knowledge Development',
    subtitle: '',
    description: 'Ensures accessible, clear, and professional learning content.',
    responsibilities: [
      'Maintain CODEON Syntax Guide (250+ page reference manual)',
      'Produce learning modules, examples, and tutorials',
      'Structure step-by-step guides for new users',
      'Maintain consistency and clarity across all public materials',
      'Assist with preparing release notes and update logs'
    ],
    skills: ['Strong written communication', 'Technical understanding of programming basics', 'Ability to structure long-form documentation'],
    icon: BookOpen
  },
  {
    id: 'testing',
    title: 'User Testing, Feedback & Research',
    subtitle: '',
    description: 'Builds data-driven insights to evolve CODEON based on real user behavior.',
    responsibilities: [
      'Conduct prototype test sessions',
      'Create feedback surveys and track user experience',
      'Identify common misunderstandings, challenges, and feature requests',
      'Prepare usability reports and improvement recommendations',
      'Coordinate small pilot programs with academic groups or individuals'
    ],
    skills: ['Analytical thinking', 'Basic understanding of UX', 'Communication and coordination'],
    icon: Search
  },
  {
    id: 'design',
    title: 'Design & Branding',
    subtitle: '',
    description: 'Strengthens CODEON’s identity and presentation.',
    responsibilities: [
      'Create visual assets: logos, banners, diagrams',
      'Improve the overall look and feel of CODEON digital materials',
      'Build brand consistency across platforms, docs, and websites'
    ],
    skills: ['Graphic design', 'UI/UX fundamentals', 'Figma/Adobe Illustrator'],
    icon: Palette
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Experience on a real programming language project',
    description: 'Working on a live ecosystem around a new language gives practical exposure that is rare for students.'
  },
  {
    title: 'Portfolio-quality contributions',
    description: 'Your work on the Web IDE, documentation, testing pipeline, or design becomes a strong addition to resumes, portfolios, and GitHub profiles.'
  },
  {
    title: 'Exposure to modern compiler and language tooling',
    description: 'While the CORE compiler remains private, contributors still gain indirect understanding of the ecosystem around language design.'
  },
  {
    title: 'Early-team recognition',
    description: 'Contributors who join during the early development stage will be noted as part of CODEON’s foundational team.'
  },
  {
    title: 'Preference in future internal roles',
    description: 'As CODEON scales and formally expands its team, early contributors will receive priority consideration.'
  },
  {
    title: 'Official Contribution Certificate from CODEON',
    description: 'Each contributor will receive a digitally signed, verifiable Certificate of Contribution, issued officially by CODEON, detailing their role and contributions. (This is NOT an academic certificate; it is a professional project certificate.)'
  },
  {
    title: 'Opportunity to participate in pilot programs and incubation efforts',
    description: 'If CODEON enters incubation at IIT or other institutions, early contributors may get additional opportunities based on relevance and performance.'
  }
];

export const TEAM_CULTURE: CulturePoint[] = [
  { text: 'Consistency and reliability in commitments' },
  { text: 'Respect for privacy, boundaries, and intellectual property' },
  { text: 'Clear communication and timely updates' },
  { text: 'Openness to feedback and iteration' },
  { text: 'Innovation and problem-solving mindset' }
];

export const CONFIDENTIALITY_POINTS = [
  "Access to the compiler core, including Lexer, Parser, AST, Semantic Analyzer, Optimizer, and Transpiler modules, is strictly restricted.",
  "Contributors will only interact with platform-level modules (frontend, backend, documentation).",
  "No component of the internal compiler will be shared, discussed, or distributed outside controlled boundaries.",
  "All team members must understand the intellectual property sensitivity of programming language engineering."
];

// --- Form Constants ---

export const APPLICATION_DEADLINE = "2025-12-14T23:59:59";

export const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdOejMqM63-_OKZlaTWlGk8gGlGuqrLZ_m0KMuAB0PzWYNg9g/formResponse";

export const FORM_MAPPING = {
  fullName: "entry.1480304689",
  email: "entry.2097136875",
  phone: "entry.1267702678",
  linkedin: "entry.1541700602",
  github: "entry.1035580825",
  education: "entry.1189838538",
  ageConfirm: "entry.635491781",
  department: "entry.207445108",
  whyJoin: "entry.1797782291",
  
  // Responsibilities keys mapped to department IDs
  respFrontend: "entry.1588797933",
  respBackend: "entry.1520506035",
  respDocs: "entry.1929892006",
  respTesting: "entry.432975387",
  respDesign: "entry.2052615555",
  
  tools: "entry.1341745085",
  toolsOther: "entry.1452089029",
  proficiency: "entry.125218617",
  experience: "entry.1952384009",
  teamExp: "entry.239920662",
  teamRole: "entry.1030921513",
  portfolioLinks: "entry.589222782",
  problemSolving: "entry.1011893297",
  motivation: "entry.115134138",
  deadlineComfort: "entry.1520542410",
  followGuidelines: "entry.1139221399",
  availability: "entry.288581265",
  timeline: "entry.1875872842",
  structuredWorkflow: "entry.1942947966",
  
  agreeCore: "entry.53395310",
  agreeEcosystem: "entry.124160395",
  agreeIP: "entry.134528679",
  agreeConfidential: "entry.92029231",
  agreeNonCompete: "entry.305313399",
  agreeZeroComp: "entry.22258898",
  agreeRespect: "entry.1581294459",
  
  ackBenefits: "entry.876192369",
  ackViolation: "entry.215264649",
  ackLegal: "entry.2073862434",
  
  declFinal: "entry.1250010896",
  signature: "entry.1669839558",
  date: "entry.2086069757"
};

// IMPORTANT: These values must strictly match the Google Form options
export const DEPT_FULL_NAMES = {
  frontend: "Frontend Development (Web IDE UI, documentation UI, platform interface, user experience)",
  backend: "Backend Development (Execution engines, API systems, cloud deployment, secure processing)",
  docs: "Documentation & Knowledge Development (Syntax guides, examples, structured manuals, content accuracy)",
  testing: "Testing & User Research (Prototype testing, UX research, data collection, analytical insights)",
  design: "Design & Branding (Brand identity, visual assets, UI concepts, illustrations, diagrams)"
};

// IMPORTANT: These values must strictly match the Google Form options
export const RESPONSIBILITIES_OPTIONS = {
  frontend: [
    "Component development",
    "UI/UX improvements",
    "Code editor features",
    "Interactive documentation tools",
    "Performance optimization"
  ],
  backend: [
    "API development",
    "Execution sandboxing",
    "Authentication systems",
    "Cloud deployment",
    "Logging/monitoring systems"
  ],
  docs: [
    "Writing structured guides",
    "Explaining programming concepts",
    "Maintaining large documents",
    "Creating examples and use-cases",
    "Technical proofreading"
  ],
  testing: [
    "Creating test plans",
    "Conducting pilot sessions",
    "User interviews",
    "Error tracking",
    "UX analysis"
  ],
  design: [
    "Logo & branding",
    "UI wireframes",
    "Illustration assets",
    "Poster/brochure design",
    "Product identity themes"
  ]
};

export const TOOLS_OPTIONS = [
  "HTML/CSS/JS",
  "React / Next.js",
  "Python",
  "Flask / Django / FastAPI",
  "SQL",
  "Git / GitHub",
  "Figma",
  "Adobe Illustrator",
  "VSCode",
  "Cloud Platforms (AWS / GCP / DigitalOcean / Render)",
  "Markdown",
  "Documentation tools (Notion, Google Docs, Docusaurus, etc.)",
  "Testing tools (Postman, JMeter, Cypress, etc.)"
];