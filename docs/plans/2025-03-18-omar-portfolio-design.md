# Omar Ashraf - Portfolio Transformation Design
**Date:** 2025-03-18
**Status:** Design Phase - Awaiting Approval
**Approach:** Homepage Transformation with New Portfolio Pages

---

## 🎯 Design Philosophy

**Preserve everything that makes this design exceptional:**
- ✅ Bold maximalist aesthetic with vibrant colors
- ✅ GSAP elastic animations & inertia effects
- ✅ Stickers, blobs, hand-drawn SVG elements
- ✅ Scroll-triggered reveals & stagger effects
- ✅ Playful wiggle animations on interactive elements
- ✅ All existing components & animation patterns

**Transform for portfolio purpose:**
- 🔄 Rebrand content from Truus → Omar Ashraf
- 🔄 Convert agency sections → portfolio sections
- 🔄 Add new pages: About, Projects, Experience
- 🔄 Replace brand logos with provided URLs
- 🔄 Showcase 13+ projects, skills, career journey

---

## 🏠 Homepage Transformation

### **Hero Section (VimeoHero → PersonalHero)**
**Keep:** Video background option, mute bubble animation, controls

**Transform:**
```
"we make advertising for the new mainstream"
↓
"Omar Ashraf" + tagline variants:
• "Full-Stack Engineer & Tech Solution Architect"
• "Building Scalable Platforms for the Future"
• "2040+ Hours • 13+ Projects • AI/ML • E-commerce"
```

**Elements to repurpose:**
- Smiley face sticker → Code bracket sticker `< >`
- Pink star → Terminal/star sticker for "tech"
- Oval underline → Keep (beautiful detail)
- Italic "advertising" → Italic tech keywords ("React", "Python")

---

### **HorizontalWords Section**
**Current:** "we wanna be where the people are"

**Transform to:** Tech stack showcase
```
"Next.js • React • Python • TypeScript • PostgreSQL • AWS"
"AI/ML • E-commerce • Education • Full-Stack"
```

**Keep:**
- ✅ Bouncing letters on scroll
- ✅ Thumbs up, cursor, phone stickers
- ✅ SVG arrow drawing animations
- ✅ Horizontal scroll pin effect

**New stickers to add:**
- GitHub logo sticker
- Terminal/command line sticker
- Cloud/sticker for AWS

---

### **MotionCards Section**
**Current:** "an agency built for the future. from TV to TikTok."

**Transform to:** **"Featured Projects"** showcase

**Structure:**
- **Heading:** "projects built for impact" + oval underline
- **4 Cards** → 4 Featured Projects:
  1. **Navaia Agentic** (AI/ML) - 300 hours
  2. **Graphic Tablet Store** (E-commerce) - 200 hours
  3. **Sportology Academy** (Education) - 200 hours
  4. **Tawaqlna** (QA Platform) - 280 hours

**Card content:**
- Project thumbnail/screenshot
- Floating labels: "AI-powered", "E-commerce", "Education", "Full-Stack"
- Colorful bars matching project category
- Hover: inertia effect + project details

**Bottom text:** Replace with project summary:
```
"From AI-powered market platforms to e-commerce solutions.
I build scalable, production-grade applications across
LMS, e-commerce, QA, and analytics platforms."
```

**Keep blue blob** - it's gorgeous!

---

### **ServiceCards → SkillsCards**
**Current:** "call us if you need:" + service categories

**Transform to:** **"expertise across:"** + skill categories

**5 Cards:**
1. **Frontend** (green) - sticker: monitor/browser
   - Next.js, React, TypeScript, Tailwind CSS
2. **Backend** (darkblue) - sticker: server/API
   - Node.js, Python, FastAPI, REST APIs
3. **Database** (lightblue) - sticker: database icon
   - PostgreSQL, MongoDB, Supabase, Prisma
4. **Cloud & DevOps** (orange) - sticker: cloud
   - AWS, Docker, CI/CD, Vercel
5. **Testing & QA** (maroon) - sticker: checkmark/shield
   - Playwright, Jest, E2E testing, QA pipelines

**Keep elastic hover animation** - perfect for skills expansion!

---

### **Showreel Section**
**Current:** Placeholder

**Transform to:** **"Tech Stack Visualization"**

**Ideas:**
- Animated technology tree with bouncing icons
- OR "Project Categories" showcase (AI/ML, E-commerce, Education)
- OR "Skills Breakdown" with progress bars and stickers
- Keep minimal - maybe just a quote section:
  ```
  "Clean code quality, system reliability,
  and scalable architecture."
  ```

---

### **DoubleMarquee → ClientLogos**
**Current:** Brand logos scrolling

**Replace logos** with provided URLs:
- 19 PNG images from navaia.sa
- Keep the same marquee animation
- Keep the colored backgrounds (shuffle colors)
- Update heading: "proud to have worked with:"

**Logo URLs to use:**
```
https://www.navaia.sa/assets/image13-DpRbp2Sm.png
https://www.navaia.sa/assets/image14 2-Yt6no0oP.png
https://www.navaia.sa/assets/image14 3-CPm4i80o.png
... (all 19 URLs)
```

---

### **Footer Updates**
**Transform:**
```
"looking for a job?" → "looking for a developer?"
"not hiring right now :(" → "available for opportunities"

"office" → "location"
"papaverhof 21, 1032 LX amsterdam" → "Benha, Egypt"

"contact"
"hello@truus.co" → "omarasj445@gmail.com"
"+20 115 468 8628"
Social icons: Keep LinkedIn, replace Instagram/TikTok with:
- GitHub
- Portfolio (omarashraf.online)
```

**Keep credits section** (design by Jordan, code by Dennis) or update to Omar

**Keep all stickers** - smiley, heart, hands, 100, camera, boom!

---

## 📄 New Pages to Create

### **1. About Page (`/about`)**

**URL:** `/about`

**Sections:**

#### **Hero (reuse VimeoHero structure)**
- "About Me" heading + code sticker
- Professional summary
- Photo placeholder (optional)

#### **Bio Section (MotionCards-style)**
- Heading: "my journey" + underline
- Cards showing:
  - Benha University CS & AI graduate
  - 4+ years experience
  - Mid-Senior Full-Stack Engineer
  - Tech Solution Engineer at Navaia.sa

#### **Skills Breakdown (ServiceCards-style)**
- Expand on the 5 skill categories
- Add more technologies per category
- Keep elastic hover animations

#### **Tech Stack Visualization (new component)**
- Grid of technologies with icons
- Animated on scroll
- Color-coded by category

#### **Languages**
- Arabic: Native/Bilingual
- English: Fluent

---

### **2. Projects Page (`/projects`)**

**URL:** `/projects`

**Sections:**

#### **Hero**
- "Projects" heading + grid sticker
- Summary: "2040+ hours across 13 production-grade applications"

#### **Filter Tabs (new component)**
- All (13)
- AI/ML (3)
- E-commerce (2)
- Education (2)
- Web Development (3)
- Development Tools (1)
- Computer Vision (1)
- Investment/Real Estate (1)

**Animation:** Elastic hover + active state bounce

#### **Projects Grid (MotionCards-style but larger)**
Each project card:
- Thumbnail/screenshot
- Project name + category badge
- Hours invested
- Tech stack tags
- Live link + GitHub link
- Short description

**Hover:** Inertia effect + card expansion

#### **Featured Projects (top 3)**
- Navaia Agentic
- Graphic Tablet Store
- Sportology Academy

---

### **3. Experience Page (`/experience`)**

**URL:** `/experience`

**Sections:**

#### **Hero**
- "Experience" heading + timeline sticker
- Career summary

#### **Timeline (new component)**
**Design:** Vertical timeline with stickers and animations

**Entries:**
1. **Navaia.sa** (2025–Present) - KSA
   - Mid-Senior Full-Stack & Tech Solution Engineer
   - Achievements bullet points
   - Tech stack used

2. **Outlier** (2024–2025) - Remote
   - Tech Solution Engineer
   - Achievements

3. **Freelance** (2024–Present) - Remote
   - Full-Stack Developer
   - Client projects

4. **Google Developer Student Club** (2021–2022)
   - Frontend Web Tutor

**Animations:**
- Timeline draws in (SVG path animation)
- Each entry pops with sticker
- Hover reveals details

#### **Education**
- B.Sc. Computer Science & AI
- Benha University

---

## 🎨 New Components to Build

### **1. ProjectCard Component**
Based on MotionCards but for individual projects:
- Thumbnail image
- Category badge (color-coded)
- Title + hours
- Tech stack tags
- Live/GitHub links
- Hover: inertia + expansion

### **2. Timeline Component**
Vertical line with:
- SVG path animation (draws in)
- Entry nodes with stickers
- Date, title, company
- Expandable details
- Scroll-triggered reveals

### **3. FilterTabs Component**
- Category filters
- Elastic hover animation
- Active state bounce
- Filters projects grid

### **4. TechStack Component**
- Grid of technology icons/names
- Color-coded by category
- Animated on scroll
- Hover: wiggle + scale

---

## 🔄 Navigation Updates

### **Navbar Left ("work" → "projects")**
**Current:**
- "work" → Shows 3 project cards

**Transform:**
- "projects" → Shows 3 featured projects + "View all projects" button
- Link: `/projects`

**Projects to showcase:**
1. Navaia Agentic (AI/ML)
2. Graphic Tablet Store (E-commerce)
3. Sportology Academy (Education)

---

### **Navbar Center (logo → name)**
**Current:** Truus SVG logo

**Transform:**
- Option 1: Create "Omar" SVG logo in same style
- Option 2: Keep it simple text with wiggle
- Option 3: Initials "OA" monogram

**Keep wiggle animation!**

---

### **Navbar Right (WhatsApp → Email)**
**Current:** WhatsApp QR code

**Transform to:** Contact options
- Email: omarasj445@gmail.com
- Phone: +20 115 468 8628
- LinkedIn: [profile URL]
- Portfolio: omarashraf.online

**OR** keep QR code but for:
- vCard contact download
- OR portfolio QR

---

## 📐 Responsive Strategy

**Keep existing responsive patterns:**
- Mobile: Stacked cards reveal on scroll
- Desktop: Elastic hover expansion
- Tablet: Adjusted grid layouts

**New pages must be responsive:**
- Projects grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Timeline: Vertical (works for all)
- Skills: Stacked → grid

---

## 🎭 Animation Standards

**All new animations must follow established patterns:**

### **Entry Animations:**
```javascript
gsap.from(element, {
  scale: 0,
  opacity: 0,
  rotation: -30,
  duration: 1.7,
  ease: "elastic.out(1, 0.4)"
});
```

### **Hover Animations:**
```javascript
gsap.to(element, {
  scale: 1.08,
  rotation: 0,
  duration: 0.9,
  ease: "elastic.out(1, 0.5)"
});
```

### **Scroll Reveals:**
```javascript
scrollTrigger: {
  trigger: element,
  start: "top 70%",
  toggleActions: "play none none reverse"
}
```

### **SVG Drawing:**
```javascript
gsap.fromTo(path,
  { strokeDashoffset: pathLength },
  { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }
);
```

### **Wiggle:**
```javascript
gsap.to(element, {
  rotation: intensity,
  duration: 0.17,
  repeat: -1,
  yoyo: true,
  ease: "steps(1)"
});
```

---

## 🎨 Color Palette (Keep Same)

```css
--color-green: #7AC74A;
--color-lightblue: #5CB3E7;
--color-darkblue: #2C5F8D;
--color-lightgreen: #B4E550;
--color-orange: #F59D31;
--color-maroon: #C1403D;
--color-pink: #EC87C0;
```

**Use for:**
- Project category badges
- Skills cards
- Timeline nodes
- Filter tabs

---

## 📦 Data Structure Updates

### **lib/data.js Changes:**

```javascript
// Replace brands array
export const brands = [
  { name: "navaia-1", src: "https://www.navaia.sa/assets/image13-DpRbp2Sm.png" },
  { name: "navaia-2", src: "https://www.navaia.sa/assets/image14 2-Yt6no0oP.png" },
  // ... all 19 URLs
];

// Add projects data
export const PROJECTS_DATA = [
  {
    id: 1,
    name: "Navaia Agentic",
    category: "AI/ML",
    hours: 300,
    status: "Completed",
    tech: ["Next.js", "Python", "OpenAI", "Azure", "TensorFlow"],
    live: "https://agentic.navaia.sa/dashboard",
    github: null, // or repo URL
    description: "AI-powered market platform with intelligent dashboards",
    featured: true,
    color: "green"
  },
  // ... all 13 projects
];

// Add skills data
export const SKILLS_DATA = [
  {
    category: "Frontend",
    color: "green",
    sticker: "monitor",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Responsive UI/UX"]
  },
  // ... all 5 categories
];

// Add experience data
export const EXPERIENCE_DATA = [
  {
    company: "Navaia.sa",
    role: "Mid-Senior Full-Stack & Tech Solution Engineer",
    period: "2025–Present",
    location: "KSA",
    type: "Full-time",
    achievements: [
      "Architected and maintained scalable QA platform",
      "Led end-to-end CI/CD deployments on AWS",
      "Implemented Playwright-based E2E test suites"
    ],
    tech: ["PostgreSQL", "MongoDB", "AWS", "Playwright", "Python", "Node.js"]
  },
  // ... all experience entries
];
```

---

## 🚀 Implementation Phases

### **Phase 1: Foundation**
1. Update `lib/data.js` with new data structures
2. Replace brand logos in marquee
3. Update footer contact info

### **Phase 2: Homepage Transformation**
1. Transform VimeoHero → PersonalHero
2. Update HorizontalWords text
3. Transform MotionCards → Featured Projects
4. Transform ServiceCards → SkillsCards
5. Update Showreel section

### **Phase 3: New Pages - About**
1. Create `/about` page
2. Build Bio section
3. Build Skills breakdown
4. Build Tech Stack visualization

### **Phase 4: New Pages - Projects**
1. Create `/projects` page
2. Build FilterTabs component
3. Build ProjectsGrid component
4. Implement filtering logic
5. Add project detail modals/pages

### **Phase 5: New Pages - Experience**
1. Create `/experience` page
2. Build Timeline component
3. Add experience entries
4. Add education section

### **Phase 6: Navigation & Polish**
1. Update navbar links and pop-outs
2. Add page transitions
3. Test all animations
4. Responsive testing
5. Performance optimization

---

## ✅ Success Criteria

**Design:**
- ✅ Maintains the bold, maximalist aesthetic
- ✅ All animations feel consistent with existing design
- ✅ Color palette preserved
- ✅ Stickers and SVG elements used throughout

**UX:**
- ✅ Clear navigation between pages
- ✅ Projects easily filterable and browsable
- ✅ Experience timeline easy to follow
- ✅ Contact information accessible

**Technical:**
- ✅ GSAP animations performant
- ✅ Mobile responsive
- ✅ Accessibility maintained
- ✅ Code follows existing patterns

**Portfolio Goals:**
- ✅ Showcases 13+ projects effectively
- ✅ Highlights skills and expertise
- ✅ Demonstrates career progression
- ✅ Appeals to both recruiters and freelance clients

---

## 🎬 Next Steps

**After this design is approved:**
1. Invoke `writing-plans` skill to create detailed implementation plan
2. Create tasks for each phase
3. Begin implementation following the phases above
4. Test and iterate based on feedback

---

**Design Document Status:** ⏳ Awaiting Approval
**Created by:** Claude (Frontend Design + Brainstorming Skills)
**Last Updated:** 2025-03-18
