// ─── lib/data.js — All static data for Omar's portfolio website ─────────────────────
// ES Module exports — imported by React components

// Marquee brand logos - Omar's project/client logos (self-hosted in /public/assets/Brand Logos SVG)
export const brands = [
    { name: "Navaia", src: "/assets/Brand Logos SVG/navaia.png" },
    { name: "Almajdiah", src: "/assets/Brand Logos SVG/almajdiah.png" },
    { name: "Ekan", src: "/assets/Brand Logos SVG/ekan.png" },
    { name: "Modern Knowledge Advisory", src: "/assets/Brand Logos SVG/mka.png" },
    { name: "Red Sea Global", src: "/assets/Brand Logos SVG/rsg.png" },
    { name: "So Sweet Stay", src: "/assets/Brand Logos SVG/sosweetstay.png" },
    { name: "SDAIA", src: "/assets/Brand Logos SVG/sdaia.png" },
    { name: "SAP", src: "/assets/Brand Logos SVG/sap.png" },
    { name: "Zoho", src: "/assets/Brand Logos SVG/zoho.png" },
    { name: "Odoo", src: "/assets/Brand Logos SVG/odoo.png" },
    { name: "Microsoft Azure", src: "/assets/Brand Logos SVG/azure.png" },
    { name: "AWS Lambda", src: "/assets/Brand Logos SVG/aws-lambda.png" },
    { name: "NVIDIA", src: "/assets/Brand Logos SVG/nvidia.png" }
];

// Marquee background colors
export const colors = [
    "var(--color-green)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-lightgreen)",
    "var(--color-orange)",
    "var(--color-maroon)",
    "var(--color-pink)"
];

// Footer social icon links + SVG markup
export const SOCIAL_ICONS = [
    {
        href: 'https://github.com/www-e',
        label: 'GitHub',
        icon: 'github'
    },
    {
        href: 'https://www.linkedin.com/in/omar-ashraf-176790262/',
        label: 'LinkedIn',
        icon: 'linkedin'
    },
    {
        href: 'https://www.upwork.com/freelancers/~016247fec408960a4d',
        label: 'Upwork',
        icon: 'upwork'
    },
    {
        href: 'mailto:omarasj445@gmail.com',
        label: 'Email',
        icon: 'email'
    }
];

// Service cards data
export const CARDS_DATA = [
    {
        color: 'green',
        sticker: 'camera',
        title: 'brand',
        services: ['Brand Strategy', '360° Creative', 'Art Direction', 'Copywriting', 'Editing', 'Motion Graphics', 'DTP']
    },
    {
        color: 'darkblue',
        sticker: 'phone',
        title: 'social',
        services: ['Social Media Strategy', 'Social Media Creative', 'TikTok/Social Shoots', 'Influencer Campaign', 'Scheduling Support', 'Community Management', 'Social Listening']
    },
    {
        color: 'orange',
        sticker: 'smiley',
        title: 'activations',
        services: ['Activation Strategy', 'Event Planning', 'Art Direction', 'Production']
    },
    {
        color: 'maroon',
        sticker: 'hand',
        title: 'video production',
        services: ['Campaign video', 'Branded content', 'Social content', 'Marketing material']
    },
    {
        color: 'pink',
        sticker: 'heart',
        title: 'with partners',
        services: ['PR/Journalism', '3D / VFX', 'food styling', 'Photography']
    }
];

// GitHub profile link used by the archive CTA and repo links
export const GITHUB_PROFILE = "https://github.com/www-e?tab=repositories";

// Own public repositories at the time this data was generated (Oct 2026)
export const PUBLIC_REPO_TOTAL = 54;

// Projects portfolio data — client work first, then the strongest public repos.
// `hours` is only present for client engagements; repos fall back to `year` in the UI.
export const PROJECTS_DATA = [
    {
        id: 1,
        name: "Navaia Agentic",
        category: "AI/ML",
        year: "2025",
        hours: 300,
        status: "Live",
        source: "client",
        tech: ["Next.js", "React", "Python", "FastAPI", "Azure", "TensorFlow"],
        live: "https://agentic.navaia.sa/dashboard",
        repo: null,
        description: "AI market-intelligence platform with live dashboards, campaign management, text-to-speech and speech-to-text tuned for the Saudi market.",
        featured: true,
        color: "green",
        image: "/assets/projects/navaia-agentic.jpg",
        logo: "/assets/projects/navaiaLogo.png"
    },
    {
        id: 2,
        name: "Navaia Voice Agent",
        category: "AI/ML",
        year: "2026",
        status: "Open Source",
        source: "client",
        tech: ["Next.js", "TypeScript", "ElevenLabs", "NextAuth", "Tailwind CSS"],
        live: null,
        repo: "multi-refactored",
        description: "Arabic-first voice assistant for property-rental teams: real-time calls become tickets and bookings automatically, powered by ElevenLabs.",
        featured: true,
        color: "darkblue",
        image: "/assets/projects/navaia-voice-cover.jpg"
    },
    {
        id: 3,
        name: "Graphic Tablet Store",
        category: "E-commerce",
        year: "2026",
        hours: 200,
        status: "Live",
        source: "client",
        tech: ["Next.js", "TypeScript", "tRPC", "Drizzle ORM", "Neon", "Tailwind CSS"],
        live: "https://www.graphictablet.store/",
        repo: "graphictablet",
        description: "Specialist storefront for drawing tablets and digital-art gear, with tRPC checkout flows, Drizzle/Neon data and a custom admin.",
        featured: true,
        color: "orange",
        image: "/assets/projects/graphictablet-store.jpg"
    },
    {
        id: 4,
        name: "Sportology Academy",
        category: "Education",
        year: "2025",
        hours: 200,
        status: "Live",
        source: "client",
        tech: ["Next.js", "tRPC", "Prisma", "NextAuth", "TanStack Query", "Tailwind CSS"],
        live: "https://sportologyacademy.vercel.app/",
        repo: "sport",
        description: "Sports-education course platform with authentication, payments and a full student dashboard for buying and completing courses.",
        featured: true,
        color: "green",
        image: "/assets/projects/sportology-academy.jpg",
        logo: "/assets/projects/sportologyLogo.avif"
    },
    {
        id: 5,
        name: "Elostaz Math Center",
        category: "Education",
        year: "2026",
        hours: 140,
        status: "Live",
        source: "client",
        tech: ["Next.js", "TypeScript", "Drizzle ORM", "Neon", "Radix UI", "Framer Motion"],
        live: "https://elostaz-one.vercel.app/",
        repo: "Elostaz",
        description: "Math-centre platform for Benha's leading secondary-school teacher: groups, attendance, exams, payments and WhatsApp notifications.",
        featured: false,
        color: "darkblue",
        image: "/assets/projects/alsotaz-edu.jpg"
    },
    {
        id: 6,
        name: "Tawaqlna QA",
        category: "Web Apps",
        year: "2025",
        hours: 280,
        status: "Live",
        source: "client",
        tech: ["Next.js", "TypeScript", "Gemini AI", "Radix UI", "Tailwind CSS"],
        live: "https://qaportal1.vercel.app/",
        repo: "QAproject",
        description: "QA workspace with test-case tracking, issue reporting and real-time quality insights, plus an AI assistant for drafting cases.",
        featured: false,
        color: "maroon",
        image: "/assets/projects/tawaqlna.jpg"
    },
    {
        id: 7,
        name: "AiInterviewer",
        category: "AI/ML",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["HTML5", "CSS3", "JavaScript", "AI APIs"],
        live: null,
        repo: "AiInterviewer",
        description: "AI mock-interview coach with a virtual interviewer and live scoring for eye contact, voice clarity and technical accuracy.",
        featured: true,
        color: "pink",
        image: "/assets/projects/ai-interview-simulator.jpg"
    },
    {
        id: 8,
        name: "PlantHub",
        category: "AI/ML",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Python", "JavaScript", "AI/ML", "REST API"],
        live: null,
        repo: "planthub",
        description: "AI plant-health platform that identifies diseases across 14 species and turns care advice into an actionable schedule.",
        featured: true,
        color: "green",
        image: "/assets/projects/agritech-platform.jpg"
    },
    {
        id: 9,
        name: "iPillarsi",
        category: "Real Estate",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Next.js", "TypeScript", "tRPC", "Prisma", "Framer Motion"],
        live: null,
        repo: "IPI",
        description: "Luxury real-estate platform for IPI Invest: property showcase, inquiry flow and an editorial coming-soon experience.",
        featured: false,
        color: "maroon",
        image: "/assets/projects/ipi.jpg"
    },
    {
        id: 10,
        name: "Godzilla Bakery",
        category: "E-commerce",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["HTML5", "Tailwind CSS", "JavaScript", "Supabase"],
        live: null,
        repo: "gorillas_sweet",
        description: "Playful bakery storefront with Supabase authentication and cart, built for a local dessert brand.",
        featured: false,
        color: "orange",
        image: "/assets/projects/gorilla-sweet.jpg"
    },
    {
        id: 11,
        name: "Neural Network Optimization",
        category: "AI/ML",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Python", "NumPy", "scikit-learn", "JavaScript"],
        live: null,
        repo: "AI_Optimization",
        description: "Interactive lab that optimises neural-network weights with genetic algorithms and particle swarm optimisation instead of gradient descent.",
        featured: false,
        color: "darkblue",
        image: "/assets/projects/neural-network.jpg"
    },
    {
        id: 12,
        name: "Adaptive Image Enhancement",
        category: "Data & Tools",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Python", "Flask", "OpenCV", "NumPy"],
        live: null,
        repo: "ImageProcessing",
        description: "Browser-based image lab applying adaptive contrast and morphological filters, with presets, before/after previews and history.",
        featured: false,
        color: "pink",
        image: "/assets/projects/ai-image-enhancement.jpg"
    },
    {
        id: 13,
        name: "TaskFlow",
        category: "Web Apps",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
        live: null,
        repo: "ToDo",
        description: "Glass-morphism task manager with hierarchical lists, local persistence and light/dark themes, built in vanilla JavaScript.",
        featured: false,
        color: "pink",
        image: "/assets/projects/task-management.jpg"
    },
    {
        id: 14,
        name: "OneChapter",
        category: "Mobile",
        year: "2026",
        status: "Open Source",
        source: "github",
        tech: ["React Native", "Expo", "TypeScript", "TanStack Query"],
        live: null,
        repo: "one-chapter",
        description: "Gesture-driven React Native task manager with dark/light themes, offline storage and a custom design system.",
        featured: false,
        color: "maroon",
        image: "/assets/projects/onechapter-cover.jpg"
    },
    {
        id: 15,
        name: "Trusted",
        category: "Mobile",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Flutter", "Dart", "Supabase", "Google OAuth"],
        live: null,
        repo: "trusted",
        description: "Production Flutter app for a trusted-marketplace network: multi-step signup, Google OAuth, role-based access and Arabic RTL.",
        featured: false,
        color: "green",
        image: "/assets/projects/trusted-cover.jpg"
    },
    {
        id: 16,
        name: "Lean",
        category: "Education",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
        live: null,
        repo: "landing-zone-zero",
        description: "Secure multi-role e-learning platform with admin, mentor and student experiences, RLS-backed Postgres and audit logging.",
        featured: false,
        color: "darkblue",
        image: "/assets/projects/lean-cover.jpg"
    },
    {
        id: 17,
        name: "ETL Pipeline",
        category: "Data & Tools",
        year: "2025",
        status: "Open Source",
        source: "github",
        tech: ["Java 17", "Spring Boot", "Spring Batch", "Thymeleaf"],
        live: null,
        repo: "ETL",
        description: "Java 17 / Spring Batch pipeline that ingests CSV, Excel and JSON through a complete extract-transform-load flow with a web UI.",
        featured: false,
        color: "orange",
        image: "/assets/projects/etl-pipeline-cover.jpg"
    }
];

// Remaining public repositories — compact archive under the main grid.
// Kept lightweight: no screenshots, no invented hours, just honest one-liners.
export const ARCHIVE_REPOS = [
    {
        name: "Kanban ToDo Dashboard",
        repo: "todoapp",
        description: "Drag-and-drop kanban board with Neon Postgres, Drizzle ORM and TanStack Query.",
        language: "TypeScript",
        category: "Web Apps",
        live: "https://todo.omarashraf.online/"
    },
    {
        name: "Coligo Student Dashboard",
        repo: "task",
        description: "Student dashboard for quizzes and announcements built with MUI, Redux Toolkit and i18next.",
        language: "TypeScript",
        category: "Education"
    },
    {
        name: "Trusted Web",
        repo: "trusted1",
        description: "Web companion to the Trusted app: tRPC, Prisma and better-auth with email verification.",
        language: "TypeScript",
        category: "Web Apps",
        live: "https://trusted-gamma.vercel.app/"
    },
    {
        name: "Trusted Marketplace",
        repo: "trustednext",
        description: "Next.js account marketplace with a multi-step selling flow and Radix UI.",
        language: "TypeScript",
        category: "E-commerce"
    },
    {
        name: "Game Account Marketplace API",
        repo: "trustedpython",
        description: "FastAPI backend with JWT auth, buyer/seller deals, mediators and real-time chat.",
        language: "Python",
        category: "Web Apps"
    },
    {
        name: "Evaluation Platform",
        repo: "evaluation",
        description: "Assessment app with Prisma, Firebase and UploadThing for file-based submissions.",
        language: "TypeScript",
        category: "Education",
        live: "https://evaluation-liard-sigma.vercel.app"
    },
    {
        name: "Course Platform MVP",
        repo: "platform",
        description: "Multi-tenant course-selling MVP with Prisma, Neon and role-based dashboards.",
        language: "TypeScript",
        category: "Education"
    },
    {
        name: "Gem E-Learning",
        repo: "platformgem",
        description: "E-learning platform with Prisma, Radix UI and a full course-player shell.",
        language: "TypeScript",
        category: "Education"
    },
    {
        name: "Attendance MVP",
        repo: "Center",
        description: "Attendance and group management for a teaching centre, built on Next.js and Prisma.",
        language: "TypeScript",
        category: "Education"
    },
    {
        name: "Alostaz EDU",
        repo: "EDU",
        description: "Arabic centre-management system covering students, attendance, exams and payments.",
        language: "HTML",
        category: "Education"
    },
    {
        name: "Alostaz v1",
        repo: "Alostaz",
        description: "Earlier Next.js + Supabase version of the Alostaz math-centre site.",
        language: "TypeScript",
        category: "Education"
    },
    {
        name: "TaskFlow Lite",
        repo: "todosimple",
        description: "Hierarchical to-do app with localStorage, export and a Tailwind UI.",
        language: "JavaScript",
        category: "Web Apps"
    },
    {
        name: "Simple Checklist",
        repo: "simplecheck",
        description: "Lightweight checklist app for quick daily tasks.",
        language: "JavaScript",
        category: "Web Apps"
    },
    {
        name: "Daily Calendar",
        repo: "hard10",
        description: "Detailed daily calendar experiment with time-block views and day navigation.",
        language: "JavaScript",
        category: "Web Apps"
    },
    {
        name: "Ads Studio",
        repo: "AdsProject",
        description: "Gemini-powered ad creative generator built with React and Vite.",
        language: "TypeScript",
        category: "AI/ML"
    },
    {
        name: "Optimisation Toolkit",
        repo: "OptimizationProject",
        description: "Python implementations of GA and PSO for weights, feature selection and hyperparameters.",
        language: "Python",
        category: "AI/ML"
    },
    {
        name: "Bioinformatics Toolkit",
        repo: "bioinformatics",
        description: "GUI bundling FASTA conversion, pattern matching and sequence analysis algorithms.",
        language: "Python",
        category: "Data & Tools"
    },
    {
        name: "Excel Translator",
        repo: "excel_translator",
        description: "Offline Excel translation powered by Argos Translate while preserving formatting.",
        language: "Python",
        category: "Data & Tools"
    },
    {
        name: "PDF Translator",
        repo: "python_translator",
        description: "Offline English-to-Arabic PDF translator with RTL-aware layout and a desktop GUI.",
        language: "Python",
        category: "Data & Tools"
    },
    {
        name: "VPS Capacity Planner",
        repo: "vps-calc",
        description: "Calculates storage, bandwidth and cost for video-streaming deployments.",
        language: "JavaScript",
        category: "Data & Tools"
    },
    {
        name: "Cloud Cost Calculator",
        repo: "HostCalc",
        description: "Compares 2025 cloud hosting plans across providers.",
        language: "JavaScript",
        category: "Data & Tools"
    },
    {
        name: "NFT Profit Calculator",
        repo: "NftClac",
        description: "Simulates compound and fixed-interest NFT trading strategies.",
        language: "JavaScript",
        category: "Data & Tools"
    },
    {
        name: "Sugar Intake Tracker",
        repo: "sara-sugar-tracker",
        description: "Daily sugar-intake tracker backed by a Python service and PostgreSQL.",
        language: "Python",
        category: "Data & Tools"
    },
    {
        name: "Profood POS",
        repo: "pos",
        description: "Offline-first Flutter point-of-sale helper designed for tablets.",
        language: "Dart",
        category: "Mobile"
    },
    {
        name: "Student Registration Flow",
        repo: "form",
        description: "Multi-step student registration component with conditional fields.",
        language: "JavaScript",
        category: "Web Apps"
    },
    {
        name: "School Admin System",
        repo: "formnew",
        description: "Arabic school-management interface for registration and records.",
        language: "JavaScript",
        category: "Education"
    },
    {
        name: "Skrew Landing",
        repo: "skrew",
        description: "Arabic single-page brand site with custom motion and styling.",
        language: "HTML",
        category: "Web Apps"
    }
];

// Client engagements whose repositories stay private — name, scope and stack only.
export const PRIVATE_WORK = [
    { name: "Sportology+", scope: "Extended academy platform", stack: "Next.js · PostgreSQL" },
    { name: "Rakan Platform", scope: "Multi-role services platform", stack: "PHP · JavaScript" },
    { name: "Edraak Clone", scope: "Learning-platform build", stack: "TypeScript · Next.js" },
    { name: "EDGE-X Futuristica", scope: "Real-estate experience", stack: "TypeScript" },
    { name: "Trusted API", scope: "Marketplace backend service", stack: "Python" },
    { name: "QA Suite", scope: "Internal QA tooling", stack: "JavaScript" }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoOmar: 4,
    socials: 5,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        // The scribble now plays as a route transition, so it has to be quick:
        // the old 2.2s / 2.7s values came from the auto-run flourish that
        // blocked the landing page for ~4.9s.
        durationIn: 0.42,
        durationOut: 0.5
    }
};

// ─── Skills Categories Data ───────────────────────────────────────────────
export const SKILLS_DATA = [
    {
        category: "Frontend",
        color: "green",
        sticker: "monitor",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Responsive UI/UX", "Framer Motion"]
    },
    {
        category: "Backend",
        color: "darkblue",
        sticker: "server",
        skills: ["Node.js", "Python", "FastAPI", "Express", "REST APIs", "tRPC", "ORPC", "Query Optimization"]
    },
    {
        category: "Database",
        color: "lightblue",
        sticker: "database",
        skills: ["PostgreSQL", "MongoDB", "Supabase", "Firebase", "SQLite", "Prisma ORM", "Schema Design"]
    },
    {
        category: "Cloud & DevOps",
        color: "orange",
        sticker: "cloud",
        skills: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Vercel", "Render", "Coolify", "Linux"]
    },
    {
        category: "Testing & QA",
        color: "maroon",
        sticker: "check",
        skills: ["Playwright", "Jest", "E2E Testing", "Unit Testing", "Integration Testing", "QA Pipelines"]
    }
];
