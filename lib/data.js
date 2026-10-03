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

// Projects portfolio data
export const PROJECTS_DATA = [
    {
        id: 1,
        name: "Navaia Agentic",
        category: "AI/ML",
        hours: 300,
        status: "Completed",
        tech: ["Next.js", "React", "Python", "FastAPI", "OpenAI", "Azure", "TensorFlow"],
        live: "https://agentic.navaia.sa/dashboard",
        description: "AI-powered market platform with intelligent dashboards, campaign management, TTS, and speech-to-text capabilities for KSA market insights.",
        featured: true,
        color: "green",
        image: "/assets/projects/navaia-agentic.jpg",
        logo: "/assets/projects/navaiaLogo.png"
    },
    {
        id: 2,
        name: "Graphic Tablet Store",
        category: "E-commerce",
        hours: 200,
        status: "Completed",
        tech: ["Next.js", "React", "Stripe", "Supabase", "Tailwind CSS", "Framer Motion"],
        live: "https://www.graphictablet.store/",
        description: "Specialized e-commerce platform for graphic tablets and digital art equipment with modern payment integration and inventory management.",
        featured: true,
        color: "orange",
        image: "/assets/projects/graphictablet-store.jpg"
    },
    {
        id: 3,
        name: "Sportology Academy",
        category: "Education",
        hours: 200,
        status: "Completed",
        tech: ["Next.js", "Node.js", "MongoDB", "shadcn/ui", "Tailwind CSS"],
        live: "https://sportologyacademy.vercel.app/",
        description: "Cutting-edge course selling platform for sports education with course management, payment processing, and interactive learning tools.",
        featured: true,
        color: "darkblue",
        image: "/assets/projects/sportology-academy.jpg",
        logo: "/assets/projects/sportologyLogo.avif"
    },
    {
        id: 4,
        name: "Elostaz",
        category: "Education",
        hours: 140,
        status: "Completed",
        tech: ["Next.js", "TypeScript", "WebSocket", "MongoDB"],
        live: "https://www-e.github.io/Elostaz/",
        description: "Innovative platform connecting students with tutors through real-time communication, resource sharing, and course management.",
        featured: false,
        color: "pink",
        image: "/assets/projects/alsotaz-edu.jpg"
    },
    {
        id: 5,
        name: "Tawaqlna",
        category: "Web Development",
        hours: 280,
        status: "Completed",
        tech: ["Next.js", "Node.js", "FastAPI", "Azure", "MongoDB"],
        live: "https://qaportal1.vercel.app/",
        description: "Comprehensive QA platform with test case management, automated testing, reporting, and project collaboration tools.",
        featured: false,
        color: "maroon",
        image: "/assets/projects/tawaqlna.jpg"
    }
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
        durationIn: 2.2,
        durationOut: 2.7
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
