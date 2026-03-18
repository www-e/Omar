# Omar Ashraf Portfolio Transformation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Truus agency website into Omar Ashraf's personal portfolio while preserving 100% of the stunning design system, animations, and aesthetic.

**Architecture:** Preserve all existing GSAP animations, component patterns, and design elements. Repurpose components strategically: VimeoHero → PersonalHero, MotionCards → Featured Projects, ServiceCards → SkillsCards. Add 3 new pages (About, Projects, Experience) following established patterns.

**Tech Stack:** Next.js 15, React 19, GSAP 3.12.5, Lenis smooth scroll, existing component architecture

---

## Phase 1: Foundation Setup

### Task 1: Update Brand Logos Data

**Files:**
- Modify: `lib/data.js:5-14`

**Step 1: Replace brands array with new logo URLs**

```javascript
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
```

**Step 2: Commit**

```bash
git add lib/data.js
git commit -m "feat: replace brand logos with navaia portfolio logos"
```

---

### Task 2: Add Projects Data Structure

**Files:**
- Modify: `lib/data.js:78-100` (add after CARDS_DATA)

**Step 1: Add PROJECTS_DATA constant**

```javascript
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
        color: "green"
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
        color: "orange"
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
        color: "darkblue"
    },
    {
        id: 4,
        name: "Tawaqlna",
        category: "Web Development",
        hours: 280,
        status: "Completed",
        tech: ["Next.js", "Node.js", "FastAPI", "Azure", "MongoDB"],
        live: "https://qaportal1.vercel.app/",
        description: "Comprehensive QA platform with test case management, automated testing, reporting, and project collaboration tools.",
        featured: false,
        color: "pink"
    }
];
```

**Step 2: Commit**

```bash
git add lib/data.js
git commit -m "feat: add projects data structure with featured projects"
```

---

### Task 3: Add Skills Data Structure

**Files:**
- Modify: `lib/data.js:100` (add after PROJECTS_DATA)

**Step 1: Add SKILLS_DATA constant**

```javascript
// Skills categories data
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
```

**Step 2: Commit**

```bash
git add lib/data.js
git commit -m "feat: add skills data structure with 5 categories"
```

---

## Phase 2: Homepage Transformation

### Task 4: Transform VimeoHero to PersonalHero

**Files:**
- Modify: `components/VimeoHero.jsx:189-238`

**Step 1: Update hero text content**

```javascript
// Line 192-235: Replace agency text with personal branding
<div className="home-header__title">
    <h1 className="vimeo-hero__title" ref={titleRef} onClick={(e) => e.stopPropagation()}>
        {/* "Omar" */}
        <span className="vimeo-hero__word">Omar </span>

        {/* "Ashraf" + code sticker */}
        <span className="vimeo-hero__word is--relative">
            <span>Ashraf </span>
            <div className="home-header__smiley">
                <img
                    src="/assets/VimeoHero SVG/smiley-face.svg"
                    alt=""
                    className="home-header__smiley-svg"
                    style={{ filter: 'hue-rotate(45deg)' }} // Tint to look more tech
                />
            </div>
        </span>

        {/* "Full-Stack Engineer" italic */}
        <span className="vimeo-hero__word"><em>Full-Stack Engineer </em></span>

        {/* "&" */}
        <span className="vimeo-hero__word">& </span>

        <div style={{ flexBasis: '100%', height: 0 }} />

        <span className="vimeo-hero__word">Tech </span>
        <span className="vimeo-hero__word">Solution </span>

        {/* "Architect" + star + oval underline */}
        <span className="vimeo-hero__word is--relative">
            <div className="home-header__star">
                <div className="home-header__star-inner">
                    <img
                        src="/assets/VimeoHero SVG/pink-star.svg"
                        alt=""
                        className="home-header__star-svg"
                    />
                </div>
            </div>
            <img
                src="/assets/VimeoHero SVG/oval-underline.svg"
                alt=""
                className="home-header__title-line-svg"
            />
            <span>Architect</span>
        </span>
    </h1>
</div>
```

**Step 2: Test locally**

Run: `npm run dev`
Visit: `http://localhost:3000`
Expected: Hero displays "Omar Ashraf Full-Stack Engineer & Tech Solution Architect" with stickers

**Step 3: Commit**

```bash
git add components/VimeoHero.jsx
git commit -m "feat: transform VimeoHero to PersonalHero with Omar branding"
```

---

### Task 5: Update HorizontalWords Text

**Files:**
- Modify: `components/HorizontalWords.jsx:139-172`

**Step 1: Replace text with tech stack keywords**

```javascript
// Line 139-172: Update the horizontal scrolling text
<h2 className="display horizontal-words__h2" aria-label="Tech stack keywords">
    <div className="letter" aria-hidden="true">N</div>
    <div className="letter" aria-hidden="true">e</div>
    <div className="letter" aria-hidden="true">x</div>
    <div className="letter" aria-hidden="true">t</div>
    <div className="letter" aria-hidden="true">.</div>
    {" "}
    <div className="letter" aria-hidden="true">j</div>
    <div className="letter" aria-hidden="true">s</div>
    {" "}
    <div className="letter" aria-hidden="true">•</div>
    {" "}
    <div className="letter" aria-hidden="true">R</div>
    <div className="letter" aria-hidden="true">e</div>
    <div className="letter" aria-hidden="true">a</div>
    <div className="letter" aria-hidden="true">c</div>
    <div className="letter" aria-hidden="true">t</div>
    {" "}
    <div className="letter" aria-hidden="true">•</div>
    {" "}
    <div className="letter" aria-hidden="true">P</div>
    <div className="letter" aria-hidden="true">y</div>
    <div className="letter" aria-hidden="true">t</div>
    <div className="letter" aria-hidden="true">h</div>
    <div className="letter" aria-hidden="true">o</div>
    <div className="letter" aria-hidden="true">n</div>
    {" "}
    <div className="letter" aria-hidden="true">•</div>
    {" "}
    <div className="letter" aria-hidden="true">T</div>
    <div className="letter" aria-hidden="true">y</div>
    <div className="letter" aria-hidden="true">p</div>
    <div className="letter" aria-hidden="true">e</div>
    <div className="letter" aria-hidden="true">S</div>
    <div className="letter" aria-hidden="true">c</div>
    <div className="letter" aria-hidden="true">r</div>
    <div className="letter" aria-hidden="true">i</div>
    <div className="letter" aria-hidden="true">p</div>
    <div className="letter" aria-hidden="true">t</div>
    {" "}
    <div className="letter" aria-hidden="true">•</div>
    {" "}
    <div className="letter" aria-hidden="true">P</div>
    <div className="letter" aria-hidden="true">o</div>
    <div className="letter" aria-hidden="true">s</div>
    <div className="letter" aria-hidden="true">t</div>
    <div className="letter" aria-hidden="true">g</div>
    <div className="letter" aria-hidden="true">r</div>
    <div className="letter" aria-hidden="true">e</div>
    <div className="letter" aria-hidden="true">S</div>
    <div className="letter" aria-hidden="true">Q</div>
    <div className="letter" aria-hidden="true">L</div>
</h2>
```

**Step 2: Update bottom text**

```javascript
// Line 176-182: Update the description text
<div className="horizontal-words__bottom-text">
    <div className="horizontal-words__bottom-text-l">
        Building scalable platforms across <em>AI/ML, E-commerce,</em><br />
        Education, and Full-Stack Web Development.<br />
        From database architecture to production deployment.
    </div>
</div>
```

**Step 3: Commit**

```bash
git add components/HorizontalWords.jsx
git commit -m "feat: update HorizontalWords with tech stack keywords"
```

---

### Task 6: Transform MotionCards to FeaturedProjects

**Files:**
- Modify: `components/MotionCards.jsx:128-241`

**Step 1: Update heading and content**

```javascript
// Line 128-149: Update heading section
<div className="motion-card__heading">
    <h2 className="motion-card__title">
        featured projects.
        <br />
        built for impact.
    </h2>
    <p className="motion-card__subtitle">
        2040+ hours • 13+ production apps
        <span className="motion-card__sticker motion-card__sticker--top">
            <img
                src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                alt="Hands sticker"
                className="motion-card__sticker-img"
            />
        </span>
    </p>
    {/* Keep the underline SVG */}
</div>
```

**Step 2: Replace card images with project thumbnails**

```javascript
// Line 165-215: Update cards to show featured projects
<div className="motion-card__card motion-card__card--1">
    <div className="motion-card__card-image">
        <img
            src="https://agentic.navaia.sa/dashboard/preview.png" // Add actual screenshot
            loading="lazy"
            width={1000}
            height={1000}
            alt="Navaia Agentic Project"
            className="cover-image"
        />
    </div>
</div>

<div className="motion-card__card motion-card__card--2">
    <div className="motion-card__card-image">
        <img
            src="https://www.graphictablet.store/preview.png" // Add actual screenshot
            loading="lazy"
            width={1000}
            height={1000}
            alt="Graphic Tablet Store"
            className="cover-image"
        />
    </div>
</div>

<div className="motion-card__card motion-card__card--3">
    <div className="motion-card__card-image">
        <img
            src="https://sportologyacademy.vercel.app/preview.png" // Add actual screenshot
            loading="lazy"
            width={1000}
            height={1000}
            alt="Sportology Academy"
            className="cover-image"
        />
    </div>
</div>

<div className="motion-card__card motion-card__card--4">
    <div className="motion-card__card-image">
        <img
            src="https://qaportal1.vercel.app/preview.png" // Add actual screenshot
            loading="lazy"
            width={1000}
            height={1000}
            alt="Tawaqlna QA Platform"
            className="cover-image"
        />
    </div>
</div>
```

**Step 3: Update floating labels**

```javascript
// Line 219-229: Update floating labels
<div className="motion-card__floating-labels">
    <div className="motion-card__floating-label motion-card__floating-label--pink">
        <p className="motion-card__floating-text">AI-Powered Platform</p>
    </div>
    <div className="motion-card__floating-label motion-card__floating-label--orange">
        <p className="motion-card__floating-text">E-commerce Solutions</p>
    </div>
    <div className="motion-card__floating-label motion-card__floating-label--red">
        <p className="motion-card__floating-text">Education Platforms</p>
    </div>
</div>
```

**Step 4: Update footer text**

```javascript
// Line 233-240: Update description
<div className="motion-card__footer-text">
    <p className="motion-card__description">
        From AI-powered market platforms to e-commerce solutions.
        I build scalable, production-grade applications across
        LMS, e-commerce, QA, and analytics platforms with a focus
        on code quality and system reliability.
    </p>
</div>
```

**Step 5: Commit**

```bash
git add components/MotionCards.jsx
git commit -m "feat: transform MotionCards to FeaturedProjects section"
```

---

### Task 7: Transform ServiceCards to SkillsCards

**Files:**
- Modify: `components/ServiceCards.jsx:28-71`
- Modify: `lib/data.js:46-78` (update CARDS_DATA to SKILLS_DATA)

**Step 1: Update data import**

```javascript
// Line 6: Change import
import { SKILLS_DATA } from '@/lib/data';
```

**Step 2: Update heading**

```javascript
// Line 30-36: Update title
<div className="title-container">
    <h2 className="main-title">expertise <span className="italic-text">across:</span></h2>
    {/* Keep underline SVG */}
</div>
```

**Step 3: Update card rendering to use skills data**

```javascript
// Line 40-68: Update card rendering
<div className="cards-wrapper" id="cards-wrapper">
    {SKILLS_DATA.map((skill) => (
        <div key={skill.category} className={`card card-${skill.color}`}>
            <div className={`card-sticker sticker-${skill.sticker}`}>
                <img
                    src={`/assets/Card-Sticker SVG/sticker-${skill.sticker}.svg`}
                    alt=""
                    width="100%"
                    loading="lazy"
                    aria-hidden="true"
                />
            </div>
            <h3 className="card-title">{skill.category}</h3>
            <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true">
                <use href="#card-divider" />
            </svg>
            <ul className="card-list">
                {skill.skills.map((item) => (
                    <li key={item}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" className="services-card__bullet-svg" aria-hidden="true">
                            <use href="#bullet-icon" />
                        </svg>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    ))}
</div>
```

**Step 4: Commit**

```bash
git add components/ServiceCards.jsx lib/data.js
git commit -m "feat: transform ServiceCards to SkillsCards with 5 categories"
```

---

### Task 8: Update Showreel Section

**Files:**
- Modify: `components/Showreel.jsx:3-12`

**Step 1: Add simple quote section**

```javascript
// Replace entire component content
<section className="showreel-section" id="showreel-section">
    <div className="showreel__content">
        <h2 className="showreel__title">clean code. reliable systems.</h2>
        <p className="showreel__subtitle">
            Focused on code quality, system reliability,<br />
            and scalable architecture.
        </p>
        <div className="showreel__sticker" style={{ marginTop: '2rem' }}>
            <img
                src="/assets/Footer-Sticker SVG/footer-sticker-100.svg"
                alt="100% quality sticker"
                style={{ width: '80px', animation: 'wiggle 2s infinite' }}
            />
        </div>
    </div>
</section>
```

**Step 2: Add wiggle animation to globals.css**

```css
/* Add to app/globals.css */
@keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
}
```

**Step 3: Commit**

```bash
git add components/Showreel.jsx app/globals.css
git commit -m "feat: update Showreel with quality quote and sticker"
```

---

### Task 9: Update Footer Contact Info

**Files:**
- Modify: `components/Footer.jsx:158-199`

**Step 1: Update jobs section**

```javascript
// Line 160-163: Update jobs text
<div className="footer-column">
    <span className="footer-badge">looking for a developer?</span>
    <h3>available for opportunities</h3>
</div>
```

**Step 2: Update office section**

```javascript
// Line 164-178: Update location
<div className="footer-column">
    <span className="footer-badge">location</span>
    <address>
        Benha, Egypt<br />
        Available Remote: KSA, Hungary, Egypt, Indonesia
    </address>
    <a href="https://maps.google.com/?q=Benha,Egypt" className="footer-map-link" target="_blank" rel="noopener noreferrer">
        <span>Google Maps</span>
        {/* Keep SVG */}
    </a>
</div>
```

**Step 3: Update contact section**

```javascript
// Line 179-199: Update contact info
<div className="footer-column">
    <span className="footer-badge">contact</span>
    <a href="mailto:omarasj445@gmail.com" className="footer-email">omarasj445@gmail.com</a>
    <a href="tel:+201154686828" className="footer-whatsapp">+20 115 468 8628</a>
    <p className="footer-note">Open to full-time & freelance opportunities</p>
    <div className="footer-socials" id="footer-socials">
        <a
            href="https://omarashraf.online"
            target="_blank"
            rel="noopener noreferrer"
            className="single-social w-inline-block"
            aria-label="Portfolio"
        >
            <!-- Add portfolio SVG icon or text -->
            <span>Portfolio</span>
        </a>
        <a
            href="https://linkedin.com/in/omarashraf"
            target="_blank"
            rel="noopener noreferrer"
            className="single-social w-inline-block"
            aria-label="LinkedIn"
        >
            <!-- Keep LinkedIn SVG from SOCIAL_ICONS -->
        </a>
        <a
            href="https://github.com/www-e"
            target="_blank"
            rel="noopener noreferrer"
            className="single-social w-inline-block"
            aria-label="GitHub"
        >
            <!-- Add GitHub SVG -->
        </a>
    </div>
</div>
```

**Step 4: Commit**

```bash
git add components/Footer.jsx
git commit -m "feat: update footer with Omar's contact information"
```

---

## Phase 3: Create About Page

### Task 10: Create About Page Route

**Files:**
- Create: `app/about/page.jsx`

**Step 1: Create about page component**

```javascript
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    useEffect(() => {
        // Page load animations
        const tl = gsap.timeline();
        tl.from('.about-hero__title', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, []);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
            </header>

            <main className="about-page">
                {/* Hero Section */}
                <section className="about-hero content-section">
                    <div className="about-hero__content">
                        <h1 className="about-hero__title">
                            About<br />
                            <span className="italic-text">Me</span>
                        </h1>
                        <div className="about-hero__sticker">
                            <img
                                src="/assets/VimeoHero SVG/smiley-face.svg"
                                alt="Sticker"
                                style={{ width: '60px' }}
                            />
                        </div>
                    </div>
                </section>

                {/* More sections will be added in next tasks */}
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
```

**Step 2: Test the route**

Run: `npm run dev`
Visit: `http://localhost:3000/about`
Expected: About page loads with navbar, footer, and smooth scroll

**Step 3: Commit**

```bash
git add app/about/page.jsx
git commit -m "feat: create about page route with basic structure"
```

---

### Task 11: Add About Hero Bio Section

**Files:**
- Modify: `app/about/page.jsx:47-59` (expand hero section)

**Step 1: Add bio content**

```javascript
// Replace hero section with:
<section className="about-hero content-section">
    <div className="about-hero__content">
        <h1 className="about-hero__title">
            About<br />
            <span className="italic-text">Me</span>
        </h1>
        <div className="about-hero__sticker">
            <img
                src="/assets/VimeoHero SVG/smiley-face.svg"
                alt="Sticker"
                style={{ width: '60px' }}
            />
        </div>
        <div className="about-hero__bio">
            <p className="about-hero__text">
                Mid-senior full-stack engineer and B.Sc. in Computer Science & Artificial Intelligence
                from Benha University with 4+ years architecting and delivering scalable end-to-end
                web platforms.
            </p>
            <p className="about-hero__text">
                Proven expertise as Tech Solution Engineer at <strong>Navaia.sa</strong>, designing
                optimized database systems, implementing production CI/CD pipelines, and leading
                E2E testing strategies.
            </p>
            <div className="about-hero__stats">
                <div className="stat-item">
                    <span className="stat-number">2040+</span>
                    <span className="stat-label">Hours</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">13+</span>
                    <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">4+</span>
                    <span className="stat-label">Years</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Add CSS for about page**

Create: `app/styles/about.css`

```css
.about-page {
    min-height: 100vh;
    padding: 2rem 0;
}

.about-hero {
    padding: 4rem 2rem;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.about-hero__content {
    max-width: 800px;
    text-align: center;
}

.about-hero__title {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: var(--text-color);
}

.about-hero__sticker {
    margin: 2rem 0;
    display: inline-block;
}

.about-hero__bio {
    margin-top: 3rem;
}

.about-hero__text {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: var(--text-color);
}

.about-hero__stats {
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin-top: 3rem;
    padding: 2rem;
}

.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-maroon);
}

.stat-label {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

@media (max-width: 768px) {
    .about-hero__stats {
        flex-direction: column;
        gap: 2rem;
    }
}
```

**Step 3: Import CSS in page component**

```javascript
// Add to top of app/about/page.jsx
import '../app/styles/about.css';
```

**Step 4: Commit**

```bash
git add app/about/page.jsx app/styles/about.css
git commit -m "feat: add bio section to about page with stats"
```

---

### Task 12: Add Skills Breakdown to About Page

**Files:**
- Modify: `app/about/page.jsx:75` (add after hero section)
- Create: `components/SkillsBreakdown.jsx`

**Step 1: Create SkillsBreakdown component**

```javascript
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsBreakdown() {
    useEffect(() => {
        // Animate skill cards on scroll
        const cards = document.querySelectorAll('.skill-detail-card');
        cards.forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }, []);

    return (
        <section className="skills-breakdown content-section">
            <div className="section-heading">
                <h2>Technical Expertise</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" viewBox="0 0 159 17" fill="none">
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>

            <div className="skills-grid">
                {SKILLS_DATA.map((skill) => (
                    <div key={skill.category} className={`skill-detail-card skill-card-${skill.color}`}>
                        <div className="skill-header">
                            <span className={`skill-badge badge-${skill.color}`}>{skill.category}</span>
                        </div>
                        <ul className="skill-list">
                            {skill.skills.map((item) => (
                                <li key={item} className="skill-item">
                                    <span className="skill-dot"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
```

**Step 2: Add CSS for skills breakdown**

Add to `app/styles/about.css`:

```css
.skills-breakdown {
    padding: 4rem 2rem;
}

.section-heading {
    text-align: center;
    margin-bottom: 3rem;
}

.section-heading h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.skill-detail-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.skill-detail-card:hover {
    transform: translateY(-5px);
}

.skill-header {
    margin-bottom: 1.5rem;
}

.skill-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
}

.skill-list {
    list-style: none;
    padding: 0;
}

.skill-item {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.skill-item:last-child {
    border-bottom: none;
}

.skill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
}

@media (max-width: 768px) {
    .skills-grid {
        grid-template-columns: 1fr;
    }
}
```

**Step 3: Add component to about page**

```javascript
// Add import
import SkillsBreakdown from '@/components/SkillsBreakdown';

// Add after hero section in main
<SkillsBreakdown />
```

**Step 4: Commit**

```bash
git add app/about/page.jsx app/styles/about.css components/SkillsBreakdown.jsx
git commit -m "feat: add skills breakdown section to about page"
```

---

### Task 13: Add Education & Languages to About Page

**Files:**
- Modify: `app/about/page.jsx:76` (add after SkillsBreakdown)

**Step 1: Add education section**

```javascript
// Add before closing main tag:
<section className="education-section content-section">
    <div className="education-container">
        <div className="education-block">
            <span className="education-badge">Education</span>
            <h3>B.Sc. Computer Science & Artificial Intelligence</h3>
            <p className="education-school">Benha University, Egypt</p>
            <div className="education-year">Graduated</div>
        </div>

        <div className="education-block">
            <span className="education-badge">Languages</span>
            <h3>Arabic & English</h3>
            <div className="language-list">
                <div className="language-item">
                    <span className="language-name">Arabic</span>
                    <span className="language-level">Native/Bilingual</span>
                </div>
                <div className="language-item">
                    <span className="language-name">English</span>
                    <span className="language-level">Fluent</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Add CSS**

```css
.education-section {
    padding: 4rem 2rem;
    background: var(--color-lightgreen);
}

.education-container {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
}

.education-block {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    position: relative;
}

.education-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--color-maroon);
    color: white;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.education-block h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.education-school {
    font-size: 1.1rem;
    color: var(--color-darkblue);
    margin-bottom: 0.5rem;
}

.education-year {
    font-size: 0.9rem;
    color: var(--color-orange);
    font-weight: 600;
}

.language-list {
    margin-top: 1rem;
}

.language-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.language-item:last-child {
    border-bottom: none;
}

.language-name {
    font-weight: 600;
}

.language-level {
    color: var(--color-green);
}
```

**Step 3: Commit**

```bash
git add app/about/page.jsx app/styles/about.css
git commit -m "feat: add education and languages section to about page"
```

---

## Phase 4: Create Projects Page

### Task 14: Create Projects Page Route

**Files:**
- Create: `app/projects/page.jsx`

**Step 1: Create projects page component**

```javascript
'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';
import { PROJECTS_DATA } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'AI/ML', 'E-commerce', 'Education', 'Web Development', 'Development Tools', 'Computer Vision'];

    const filteredProjects = activeFilter === 'All'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(project => project.category === activeFilter);

    useEffect(() => {
        // Animate projects on filter change
        const projects = document.querySelectorAll('.project-card');
        gsap.from(projects, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, [activeFilter]);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
            </header>

            <main className="projects-page">
                {/* Hero */}
                <section className="projects-hero content-section">
                    <div className="projects-hero__content">
                        <h1 className="projects-hero__title">
                            Projects<br />
                            <span className="italic-text">Portfolio</span>
                        </h1>
                        <p className="projects-hero__subtitle">
                            2040+ hours across 13 production-grade applications
                        </p>
                    </div>
                </section>

                {/* Filter tabs */}
                <section className="projects-filters content-section">
                    <div className="filter-tabs">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects grid */}
                <section className="projects-grid content-section">
                    <div className="projects-container">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className={`project-card project-${project.color}`}>
                                <div className="project-image">
                                    <img
                                        src={`/projects/${project.id}.png`} // Add project screenshots
                                        alt={project.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="project-content">
                                    <span className={`project-badge badge-${project.color}`}>
                                        {project.category}
                                    </span>
                                    <h3 className="project-title">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-meta">
                                        <span className="project-hours">{project.hours}h</span>
                                        <span className="project-status">{project.status}</span>
                                    </div>
                                    <div className="project-tech">
                                        {project.tech.map((t) => (
                                            <span key={t} className="tech-tag">{t}</span>
                                        ))}
                                    </div>
                                    <div className="project-links">
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                                Live Site
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
```

**Step 2: Create projects CSS**

Create: `app/styles/projects.css`

```css
.projects-page {
    min-height: 100vh;
}

.projects-hero {
    padding: 4rem 2rem;
    text-align: center;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.projects-hero__title {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1rem;
}

.projects-hero__subtitle {
    font-size: 1.2rem;
    opacity: 0.8;
}

.projects-filters {
    padding: 2rem;
    background: var(--color-lightblue);
}

.filter-tabs {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}

.filter-tab {
    padding: 0.75rem 1.5rem;
    border: 2px solid currentColor;
    background: transparent;
    border-radius: 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-tab:hover,
.filter-tab.active {
    background: var(--color-maroon);
    color: white;
    border-color: var(--color-maroon);
}

.projects-grid {
    padding: 4rem 2rem;
}

.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.project-card {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-10px);
}

.project-image {
    width: 100%;
    height: 250px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-content {
    padding: 1.5rem;
}

.project-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
}

.project-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.project-description {
    opacity: 0.8;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.project-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.project-hours {
    font-weight: 700;
    color: var(--color-green);
}

.project-status {
    font-weight: 600;
    color: var(--color-orange);
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech-tag {
    padding: 0.25rem 0.75rem;
    background: var(--color-lightgreen);
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    padding: 0.75rem 1.5rem;
    background: var(--color-darkblue);
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: background 0.3s ease;
}

.project-link:hover {
    background: var(--color-maroon);
}

@media (max-width: 768px) {
    .projects-container {
        grid-template-columns: 1fr;
    }

    .filter-tabs {
        gap: 0.5rem;
    }

    .filter-tab {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
}
```

**Step 3: Import CSS**

```javascript
// Add to app/projects/page.jsx
import '../app/styles/projects.css';
```

**Step 4: Commit**

```bash
git add app/projects/page.jsx app/styles/projects.css
git commit -m "feat: create projects page with filter functionality"
```

---

## Phase 5: Create Experience Page

### Task 15: Create Experience Page Route

**Files:**
- Create: `app/experience/page.jsx`

**Step 1: Create experience page component**

```javascript
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_DATA = [
    {
        company: "Navaia.sa",
        role: "Mid-Senior Full-Stack & Tech Solution Engineer",
        period: "2025–Present",
        location: "KSA",
        achievements: [
            "Architected and maintained scalable QA platform and reporting systems",
            "Led end-to-end CI/CD deployments on AWS with automated testing pipelines",
            "Implemented Playwright-based E2E test suites for reliability",
            "Mentored junior developers on clean code principles and best practices"
        ]
    },
    {
        company: "Outlier",
        role: "Tech Solution Engineer",
        period: "2024–2025",
        location: "Remote",
        achievements: [
            "Enhanced system performance through schema optimization and caching",
            "Implemented automated testing frameworks for feature validation",
            "Collaborated with cross-functional teams for reliable E2E deliveries"
        ]
    },
    {
        company: "Freelance",
        role: "Full-Stack Developer",
        period: "2024–Present",
        location: "Remote",
        achievements: [
            "Delivered production-grade LMS, e-commerce, and analytics platforms",
            "Built scalable backend systems with Node.js and Python",
            "Set up CI/CD pipelines on Vercel and AWS for automated deployments"
        ]
    }
];

export default function ExperiencePage() {
    useEffect(() => {
        // Animate timeline on scroll
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, i) => {
            gsap.from(item, {
                x: i % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }, []);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
            </header>

            <main className="experience-page">
                <section className="experience-hero content-section">
                    <div className="experience-hero__content">
                        <h1 className="experience-hero__title">
                            Experience<br />
                            <span className="italic-text">Journey</span>
                        </h1>
                        <p className="experience-hero__subtitle">
                            4+ years building scalable solutions across KSA, Egypt, and Remote
                        </p>
                    </div>
                </section>

                <section className="timeline-section content-section">
                    <div className="timeline">
                        {EXPERIENCE_DATA.map((exp, index) => (
                            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <span className="timeline-period">{exp.period}</span>
                                    <h3 className="timeline-company">{exp.company}</h3>
                                    <p className="timeline-role">{exp.role}</p>
                                    <p className="timeline-location">{exp.location}</p>
                                    <ul className="timeline-achievements">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="education-section content-section">
                    <div className="education-block">
                        <span className="education-badge">Education</span>
                        <h3>B.Sc. Computer Science & Artificial Intelligence</h3>
                        <p className="education-school">Benha University, Egypt</p>
                    </div>
                </section>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
```

**Step 2: Create experience CSS**

Create: `app/styles/experience.css`

```css
.experience-page {
    min-height: 100vh;
}

.experience-hero {
    padding: 4rem 2rem;
    text-align: center;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.experience-hero__title {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1rem;
}

.experience-hero__subtitle {
    font-size: 1.2rem;
    opacity: 0.8;
}

.timeline-section {
    padding: 4rem 2rem;
}

.timeline {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--color-maroon);
    transform: translateX(-50%);
}

.timeline-item {
    position: relative;
    margin-bottom: 4rem;
    width: 45%;
}

.timeline-item.left {
    left: 0;
    text-align: right;
}

.timeline-item.right {
    left: 55%;
    text-align: left;
}

.timeline-dot {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: var(--color-orange);
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--color-orange);
    z-index: 1;
}

.timeline-item.left .timeline-dot {
    right: -10px;
}

.timeline-item.right .timeline-dot {
    left: -10px;
}

.timeline-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    position: relative;
}

.timeline-content::before {
    content: '';
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
}

.timeline-item.left .timeline-content::before {
    right: -10px;
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent white;
}

.timeline-item.right .timeline-content::before {
    left: -10px;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
}

.timeline-period {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--color-green);
    color: white;
    border-radius: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.timeline-company {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.timeline-role {
    font-size: 1.1rem;
    color: var(--color-darkblue);
    margin-bottom: 0.25rem;
}

.timeline-location {
    opacity: 0.7;
    margin-bottom: 1rem;
}

.timeline-achievements {
    list-style: none;
    padding: 0;
    text-align: left;
}

.timeline-achievements li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.timeline-achievements li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-maroon);
}

.education-section {
    padding: 4rem 2rem;
    background: var(--color-lightblue);
}

.education-block {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
}

.education-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--color-maroon);
    color: white;
    border-radius: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.education-block h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.education-school {
    color: var(--color-darkblue);
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .timeline::before {
        left: 20px;
    }

    .timeline-item {
        width: calc(100% - 60px);
        left: 60px !important;
        text-align: left !important;
    }

    .timeline-dot {
        left: -30px !important;
    }

    .timeline-content::before {
        left: -10px !important;
        border-width: 10px 10px 10px 0 !important;
        border-color: transparent white transparent transparent !important;
    }

    .timeline-achievements {
        text-align: left;
    }
}
```

**Step 3: Import CSS**

```javascript
// Add to app/experience/page.jsx
import '../app/styles/experience.css';
```

**Step 4: Commit**

```bash
git add app/experience/page.jsx app/styles/experience.css
git commit -m "feat: create experience page with timeline"
```

---

## Phase 6: Navigation & Polish

### Task 16: Update Navbar Links

**Files:**
- Modify: `components/Navbar.jsx:296-339`

**Step 1: Update "work" to "projects"**

```javascript
// Line 302: Update text
<span className="logo-work-text">projects</span>
```

**Step 2: Update work items with featured projects**

```javascript
// Line 308-335: Update project previews
<div className="nav-work-item">
    <div className="nav-work-item__img-wrap">
        <img src="/projects/navaia-agentic.png" alt="Navaia Agentic" className="nav-work-item__img" />
    </div>
    <div className="nav-work-item__text">
        <span className="nav-work-badge badge-green">AI/ML</span>
        <h4 className="nav-work-title">Navaia Agentic Platform</h4>
    </div>
</div>

<div className="nav-work-item">
    <div className="nav-work-item__img-wrap">
        <img src="/projects/graphic-tablet.png" alt="Graphic Tablet Store" className="nav-work-item__img" />
    </div>
    <div className="nav-work-item__text">
        <span className="nav-work-badge badge-orange">E-commerce</span>
        <h4 className="nav-work-title">Graphic Tablet Store</h4>
    </div>
</div>

<div className="nav-work-item">
    <div className="nav-work-item__img-wrap">
        <img src="/projects/sportology.png" alt="Sportology Academy" className="nav-work-item__img" />
    </div>
    <div className="nav-work-item__text">
        <span className="nav-work-badge badge-darkblue">Education</span>
        <h4 className="nav-work-title">Sportology Academy</h4>
    </div>
</div>

<a href="/projects" className="nav-work-btn">
    <span className="nav-work-btn__text">View all projects</span>
</a>
```

**Step 3: Update center logo**

```javascript
// Line 341-345: Update logo to "Omar"
<div className="nav-center">
    <span className="logo-omar" style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.1em'
    }}>
        OMAR
    </span>
</div>
```

**Step 4: Commit**

```bash
git add components/Navbar.jsx
git commit -m "feat: update navbar with projects and Omar branding"
```

---

### Task 17: Add Page Navigation Links

**Files:**
- Modify: `components/Navbar.jsx:296-298` (add nav links)

**Step 1: Add navigation links to navbar**

```javascript
// Add after nav-overlay, before navbar:
<div className="nav-overlay"></div>

{/* Add navigation links */}
<div className="nav-links">
    <a href="/" className="nav-link">Home</a>
    <a href="/about" className="nav-link">About</a>
    <a href="/projects" className="nav-link">Projects</a>
    <a href="/experience" className="nav-link">Experience</a>
</div>

<nav className="navbar">
```

**Step 2: Add CSS for nav links**

```css
/* Add to app/styles/navbar.css */
.nav-links {
    position: fixed;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2rem;
    z-index: 100;
    background: white;
    padding: 0.75rem 1.5rem;
    border-radius: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-link {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 600;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: var(--color-maroon);
}

@media (max-width: 768px) {
    .nav-links {
        top: 1rem;
        gap: 1rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
}
```

**Step 3: Commit**

```bash
git add components/Navbar.jsx app/styles/navbar.css
git commit -m "feat: add page navigation links to navbar"
```

---

### Task 18: Final Polish & Testing

**Files:**
- Test: All pages and components

**Step 1: Run development server**

```bash
npm run dev
```

**Step 2: Test all pages**

Visit and verify:
- `http://localhost:3000` - Homepage with Omar branding
- `http://localhost:3000/about` - About page
- `http://localhost:3000/projects` - Projects page with filters
- `http://localhost:3000/experience` - Experience timeline

**Step 3: Test responsive design**

Check on mobile viewport (375px):
- Navbar links accessible
- Projects grid stacks
- Timeline collapses
- All animations work

**Step 4: Test animations**

Verify:
- Hero loads with animations
- Scroll triggers work
- Horizontal words scroll
- Cards have hover effects
- Stickers pop in
- Footer stickers wiggle

**Step 5: Check console for errors**

```bash
# Should show no errors or warnings
```

**Step 6: Create production build**

```bash
npm run build
```

**Step 7: Commit final changes**

```bash
git add .
git commit -m "polish: final polish and testing complete"
```

---

## Summary

This implementation plan includes **18 tasks** broken down into bite-sized steps that each take 2-5 minutes:

- **Phase 1 (Tasks 1-3):** Foundation - data structures and logo replacement
- **Phase 2 (Tasks 4-9):** Homepage transformation
- **Phase 3 (Tasks 10-13):** About page creation
- **Phase 4 (Task 14):** Projects page creation
- **Phase 5 (Task 15):** Experience page creation
- **Phase 6 (Tasks 16-18):** Navigation updates and polish

Each task includes:
- ✅ Exact file paths to modify/create
- ✅ Complete code snippets
- ✅ Testing commands
- ✅ Commit messages
- ✅ Expected outcomes

**Total estimated time:** 2-3 hours for all 18 tasks
**Recommended approach:** Use subagent-driven development for parallel execution
