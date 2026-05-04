// ─── lib/data.js — All static data for Omar's portfolio website ─────────────────────
// ES Module exports — imported by React components

// Marquee brand logos - Omar's project/client logos
export const brands = [
    { name: "navaia-1", src: "https://www.navaia.sa/assets/image13-DpRbp2Sm.png" },
    { name: "navaia-2", src: "https://www.navaia.sa/assets/image14%202-Yt6no0oP.png" },
    { name: "navaia-3", src: "https://www.navaia.sa/assets/image14%203-CPm4i80o.png" },
    { name: "navaia-4", src: "https://www.navaia.sa/assets/image14%204-Ebthj-WZ.png" },
    { name: "navaia-5", src: "https://www.navaia.sa/assets/image14%205-CcXylPqJ.png" },
    { name: "navaia-6", src: "https://www.navaia.sa/assets/image14%206-XcSS2bWh.png" },
    { name: "navaia-7", src: "https://www.navaia.sa/assets/image14%207-BDWpH479.png" },
    { name: "navaia-8", src: "https://www.navaia.sa/assets/image14%208-CY847_xZ.png" },
    { name: "navaia-9", src: "https://www.navaia.sa/assets/image14%209-sKvVr5WE.png" },
    { name: "navaia-11", src: "https://www.navaia.sa/assets/image14%2011-CN0uez_z.png" },
    { name: "navaia-12", src: "https://www.navaia.sa/assets/image14%2012-DF01TzBC.png" },
    { name: "navaia-13", src: "https://www.navaia.sa/assets/image14%2013-CyuGMkEC.png" },
    { name: "navaia-14", src: "https://www.navaia.sa/assets/image14%2014-CM7CuZi_.png" },
    { name: "navaia-16", src: "https://www.navaia.sa/assets/image14%2016-DvO8_p9C.png" },
    { name: "navaia-17", src: "https://www.navaia.sa/assets/image14%2017-ClUFo7W7.png" },
    { name: "navaia-18", src: "https://www.navaia.sa/assets/image14%2018-BPiNVIZq.png" },
    { name: "navaia-19", src: "https://www.navaia.sa/assets/image15%201-D_ZtkBlM.png" }
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
        href: 'https://www.linkedin.com/in/omar-ashraf-176790262/',
        label: 'LinkedIn',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M35.9969 11.5666C35.9721 11.0166 35.8451 10.4418 35.9164 9.88408C36.0248 9.1955 36.0031 8.51315 35.856 7.82457C35.5029 5.31796 33.4912 3.9003 31.0288 4.22901C29.4848 4.3365 27.9935 4.33494 26.4603 4.23212C25.0355 4.21654 23.6092 4.20875 22.1845 4.11528C21.5278 4.06855 20.8511 4.18695 20.213 4.17604C18.5869 4.09503 16.9299 4.00623 15.3007 4C14.2074 4.07634 13.1063 3.96417 12.0222 4.12775C10.5943 4.13553 9.13087 3.81617 7.73089 4.21966C5.8756 4.53902 4.31146 5.98317 4.46013 7.96166C4.47717 8.73593 4.34089 9.50084 4.30217 10.2735C4.37186 11.3469 4.32385 12.4234 4.32076 13.4952C4.33624 13.9049 4.40283 14.3162 4.39974 14.7259C4.39354 15.2992 4.12408 15.8289 4.16434 16.3991C4.26346 18.0115 4.23093 19.6379 4.17828 21.2596C4.19067 22.3315 4.25107 23.4064 4.22009 24.4689C4.25262 25.6404 4.08226 26.801 4.00018 27.9647C3.99399 29.1814 4.14421 30.4075 4.39664 31.5992C4.5004 32.2489 4.50969 32.9608 4.89066 33.5248C5.22517 34.0716 5.81366 34.4766 6.32471 34.8895C6.64838 35.1465 6.98134 35.4098 7.3778 35.5391C8.50522 35.7946 9.69768 35.5827 10.8437 35.7042C11.9804 35.8024 13.0985 35.8647 14.2383 35.8117C16.5799 35.98 18.9416 35.9161 21.294 35.8818C23.2283 35.8008 25.1703 36.0376 27.1045 35.8678C28.9227 35.846 30.7795 36.2168 32.5651 35.8039C33.7064 35.3646 34.9128 34.6246 35.3341 33.4017C35.5695 32.7131 35.6066 31.9778 35.6531 31.2565C35.7956 29.0334 35.8018 26.8166 35.7042 24.5982C35.8467 23.1073 35.7971 21.5852 35.8715 20.0835C36.0232 17.2512 35.8513 14.4097 36 11.5915V11.5619L35.9969 11.5666ZM9.43286 12.1227C9.42666 11.5681 9.50255 10.9948 9.82157 10.5353C10.4209 9.63793 11.7047 9.08177 12.651 9.64884C14.0928 10.339 14.3901 12.4951 13.289 13.5996C13.0459 13.8551 12.716 13.9657 12.366 13.9844C11.6846 13.9844 10.8421 14.2041 10.2691 13.7741C9.81693 13.3519 9.42821 12.7802 9.43286 12.1492V12.1212V12.1227ZM13.9936 18.7452C13.9782 18.9493 13.9209 19.1503 13.8775 19.3513C13.718 20.0944 13.8883 20.8624 13.8574 21.6164C13.7861 23.6292 13.7335 25.6544 13.8109 27.6703C13.8403 28.4149 13.8728 29.1658 13.8992 29.9105C13.9658 30.624 13.5848 31.1272 12.86 31.1926C12.0423 31.2752 11.22 31.2783 10.3961 31.1817C10.1886 31.1552 9.97024 31.0851 9.82931 30.9371C9.52578 30.6084 9.57069 30.0211 9.55985 29.5833C9.57688 28.7312 9.6187 27.8401 9.54127 26.9879C9.49945 26.5362 9.57998 26.089 9.56295 25.6373C9.40189 24.1417 9.37866 22.6259 9.3229 21.121C9.34613 20.1177 9.47003 19.1145 9.501 18.1081C9.55675 17.5675 9.40808 16.7013 10.057 16.5066C11.0961 16.3742 12.1415 16.4162 13.2255 16.3601C13.7613 16.3477 13.9472 16.6639 13.9038 17.2045C13.8465 17.7155 14.0076 18.2125 13.9967 18.7203V18.7484L13.9936 18.7452ZM31.1667 27.6111C31.097 28.3713 31.1403 29.1658 31.0877 29.9292C31.0877 30.3561 30.795 30.6957 30.366 30.7299C29.4074 30.8795 28.4395 30.7408 27.4514 30.7814C27.0689 30.8187 26.7561 30.691 26.7638 30.2501C26.7437 28.6112 26.8552 26.9568 26.5377 25.335C26.4634 24.9518 26.468 24.5639 26.4928 24.176C26.5439 23.3784 26.2884 22.5979 26.2698 21.808C26.2466 21.3422 26.2698 20.7923 25.957 20.4215C24.9984 19.5164 23.6371 19.2905 22.519 20.0492C20.9533 21.0088 21.3126 23.1182 21.1624 24.6994C21.1701 25.2743 21.0617 25.8336 21.0183 26.4006C21.1747 27.7264 21.0369 29.1082 21.0648 30.4402C21.0849 30.853 20.7411 31.0555 20.3663 31.0524C19.3752 31.1256 18.4243 31.2004 17.4673 31.269C17.3031 31.2783 17.1126 31.2643 16.9856 31.1771C16.8432 31.0883 16.7998 30.8686 16.8075 30.6848C16.8199 30.3358 16.8633 29.9697 16.8463 29.6098C16.7162 28.0909 16.6233 26.5844 16.7146 25.0515C16.7502 23.6074 16.6914 22.1601 16.5737 20.7222C16.7162 19.4151 16.6279 18.0909 16.5814 16.773C16.5706 16.3944 16.8122 16.2137 17.1544 16.1919C18.333 16.061 20.0938 16.1124 20.9858 16.3041C21.5139 16.4022 21.1004 16.8244 21.0462 17.2918C21.0354 17.3821 21.0307 17.4834 21.0431 17.5706C21.0725 17.904 21.3343 17.9492 21.5557 17.7389C22.1922 17.0908 22.9325 16.4131 23.8229 16.1265C25.2601 15.6124 26.959 15.6389 28.1127 16.7574C29.7249 17.9352 29.8735 18.1221 30.7067 19.9666C31.3246 21.1475 31.3355 22.4623 31.2023 23.746C31.1729 24.3785 31.1883 25.0297 31.145 25.6747C31.1465 26.3305 31.3091 26.9412 31.1744 27.5799L31.1713 27.6095L31.1667 27.6111Z" fill="currentColor"/></svg>'
    },
    {
        href: 'https://github.com/www-e',
        label: 'GitHub',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M20 4C11.163 4 4 11.163 4 20C4 26.864 8.586 32.679 14.862 34.672C15.622 34.812 15.894 34.336 15.894 33.928C15.894 33.557 15.879 32.417 15.872 30.97C11.475 31.904 10.582 28.779 10.582 28.779C9.896 27.003 8.901 26.528 8.901 26.528C7.519 25.572 9.007 25.59 9.007 25.59C10.538 25.696 11.332 27.155 11.332 27.155C12.688 29.446 14.863 28.783 15.919 28.357C16.074 27.232 16.501 26.47 16.97 26.052C13.392 25.634 9.624 24.191 9.624 18.158C9.624 16.387 10.252 14.94 11.282 13.807C11.097 13.382 10.542 11.722 11.421 9.447C11.421 9.447 12.781 9.032 15.845 11.172C17.148 10.801 18.543 10.615 19.928 10.609C21.313 10.615 22.708 10.801 24.011 11.172C27.075 9.032 28.435 9.447 28.435 9.447C29.314 11.722 28.759 13.382 28.574 13.807C29.604 14.94 30.232 16.387 30.232 18.158C30.232 24.203 26.456 25.63 22.868 26.041C23.451 26.554 23.976 27.566 23.976 29.128C23.976 31.356 23.954 33.156 23.954 33.928C23.954 34.34 24.223 34.819 24.996 34.672C31.268 32.676 35.85 26.862 35.85 20C35.85 11.163 28.787 4 20 4Z" fill="currentColor"/></svg>'
    },
    {
        href: 'https://www.instagram.com/omarashraf871/',
        label: 'Instagram',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M20 4C11.163 4 4 11.163 4 20C4 28.837 11.163 36 20 36C28.837 36 36 28.837 36 20C36 11.163 28.837 4 20 4ZM20 32.4C13.146 32.4 7.6 26.854 7.6 20C7.6 13.146 13.146 7.6 20 7.6C26.854 7.6 32.4 13.146 32.4 20C32.4 26.854 26.854 32.4 20 32.4ZM24.2 16H15.8V18.4H24.2V16ZM24.2 21.6H15.8V24H24.2V21.6ZM20 11.2L14.4 16.8H25.6L20 11.2Z" fill="currentColor"/></svg>'
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
