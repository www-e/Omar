# Truus.co — Awwward-Winning Web Design Clone

A highly interactive, visually stunning recreation of the **Truus.co** website, rebuilt as a **Next.js + React** application. This project was originally built with vanilla HTML/CSS/JS and has been fully transformed into a modern, component-based architecture — while preserving every pixel of the original design and every frame of animation.

<table>
  <tr>
    <td align="center"><b>Header Section</b><br/><img width="100%" alt="Header Section" src="" /></td>
    <td align="center"><b>Service Card Section</b><br/><img width="100%" alt="Service Card Section" src="https://github.com/user-attachments/assets/cb80f406-998e-4853-9ea5-7dec87952117" /></td>
  </tr>
  <tr>
    <td align="center"><b>Double Marquee Section</b><br/><img width="100%" alt="Double marquee section" src="https://github.com/user-attachments/assets/9ca5af12-5e0b-4b81-954c-1dcb484c671a" /></td>
    <td align="center"><b>Footer Section</b><br/><img width="100%" alt="Footer section" src="https://github.com/user-attachments/assets/6335c2ee-a2ad-4795-96ad-e1b9841cacf0" /></td>
  </tr>
</table>

---

## 🚀 Overview

This project is a high-fidelity clone of the Truus advertising agency website. It captures the bold aesthetics, playful interactivity, and smooth motion design that are characteristic of Awwward-winning websites.

The codebase was originally built in vanilla HTML/CSS/JS and has been **fully transformed to Next.js 15 + React 19**, with all animations, interactions, and assets ported 1:1.

### ⚠️ Note on the Hero Video
The original Truus.co website uses a privately-hosted Vimeo video for its hero section background. Due to **Vimeo's Domain-Level Privacy Settings**, the original video (`1100291628`) is restricted to play *only* on the `truus.co` domain. Attempting to embed the original iframe URL in a local development environment (or any other domain) will result in CORB (Cross-Origin Read Blocking) network errors and infinite buffering.

To prevent these issues, the hero component was migrated from a Vimeo `<iframe src="...">` element to a standard HTML5 `<video src="...">` element. Currently, the video `src` property in `components/VimeoHero.jsx` is intentionally commented out, rendering a solid dark background. This allows the typography, SVGs, and animations on top of it to be perfectly styled without distraction. Once your design is set, simply place your personal `.mp4` video inside the `public/` directory and update the `<video>` source in `VimeoHero.jsx`!

---

## ✨ Key Features

- **Page Transition Mask Effect**: A custom GSAP-powered scribble animation that dynamically masks the entire screen. Includes smart logo contrast inversion and a perfectly synced "wipe" vanish effect.
- **Dynamic Navigation System**: Context-aware navbar that automatically adapts its colour theme (light/dark) based on the current scroll section.
- **React Component Architecture**: Every section (Navbar, Hero, Cards, Marquee, Footer) is its own clean, isolated React component.
- **Elastic Card Interactions**: Custom GSAP-powered hover effects on service cards — horizontal repulsion, elastic scaling, and smooth clustering.
- **Smart Randomized Marquee**: Infinite scrolling logo section with advanced randomisation logic:
  - No two identical logos appear consecutively (matched by image `src`).
  - No two identical background colours appear consecutively.
  - Both constraints also hold at the seamless scroll seam (loop wrap-around).
- **Scroll-Triggered SVG Animations**: Hand-drawn style underlines and path animations that reveal as the user explores the page.
- **Footer Sticker — Velocity Push Effect**: Footer stickers react to fast cursor swipes nearby. Strength is proportional to swipe speed; auto-springs back when the cursor slows.
- **Centralized Wiggle Config**: All hover-wiggle intensities are controlled from a single `WIGGLE_CONFIG` object in `lib/data.js`.
- **High-End Typography**: Premium variable fonts (*Epilogue* and *DM Sans*), self-hosted locally.
- **Interactive Micro-details**:
  - Visibility-triggered tab title change (`"Hey, over here! 👋"`) to re-engage users.
  - Custom SVG cursor with context-aware states.
  - Configurable per-element wiggle animations on hover.
- **Self-Hosted SVG Logos**: All 8 brand logos are stored locally in `public/assets/` — no CDN dependency at runtime.
- **Responsive & Semantic**: Fully responsive design with mobile-first media queries and a GSAP-powered card stack on mobile.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework, App Router, file-based routing |
| **React 19** | Component-based UI architecture |
| **Vanilla CSS** | Full design system via CSS Variables — zero Tailwind |
| **GSAP + ScrollTrigger** | All animations, scroll-driven effects, elastic physics |
| **Lenis** | Ultra-smooth inertia scrolling |

---

## 📦 Project Structure

```text
truus/
├── app/
│   ├── globals.css          # Full design system — CSS Variables, typography, layout
│   ├── layout.jsx           # Root layout — <html>, metadata, favicon
│   └── page.jsx             # Main page — assembles all section components
│
├── components/
│   ├── CursorBubble.jsx     # Custom "click" cursor bubble with GSAP tracking
│   ├── DoubleMarquee.jsx    # Randomised logo marquee + scroll-triggered animations
│   ├── Footer.jsx           # Full footer — credits, stickers, social icons, wiggles
│   ├── HeroSection.jsx      # "call us if you need:" title + underline draw animation
│   ├── Navbar.jsx           # Fixed navbar + scroll color logic + logo wiggle
│   ├── ServiceCards.jsx     # 5 service cards — desktop hover spread + mobile scroll stack
│   ├── SmoothScroll.jsx     # Lenis init + GSAP ticker sync (renders null)
│   ├── SvgSymbols.jsx       # Hidden SVG <symbol> defs (bullet, card divider)
│   └── TransitionScribble.jsx # Full-screen scribble mask animation on logo click
│
├── lib/
│   └── data.js              # All static data as ES module exports
│
├── public/
│   ├── assets/
│   │   ├── Brand Logos SVG/     # 8 self-hosted marquee brand logos
│   │   ├── Card-Sticker SVG/    # Stickers on service cards
│   │   ├── Cursor SVG/          # Custom cursor SVG states
│   │   ├── Footer-Sticker SVG/  # 6 decorative footer stickers
│   │   ├── Marquee-blob SVG/    # Blob + hand in marquee section
│   │   └── Navbar SVG/          # Navbar blob + work icon
│   └── fonts/
│       ├── DMSans-VariableFont_opsz,wght.ttf
│       └── Epilogue-VariableFont_wght.ttf
│
├── .gitignore
├── jsconfig.json            # @/ import alias configuration
├── next.config.mjs          # Next.js config with webpack @/ alias
├── package.json
└── README.md
```

---

## 📊 `lib/data.js` — Centralized Data

All static data lives in `lib/data.js` as named ES module exports:

| Export | Purpose |
|---|---|
| `brands[]` | 8 brand objects `{ name, src }` pointing to `/public/assets/` |
| `colors[]` | Background colour pool for the marquee |
| `SOCIAL_ICONS[]` | LinkedIn, Instagram, TikTok — href + SVG markup |
| `CARDS_DATA[]` | 5 service card definitions with color, sticker, title, services |
| `WIGGLE_CONFIG` | Single source of truth for all hover-wiggle intensities |
| `ANIMATION_CONFIG` | Scribble transition timing and stroke width settings |

### `WIGGLE_CONFIG` — Tune all wiggles from one place

```js
export const WIGGLE_CONFIG = {
    logoTruus:  4,  // The navbar Truus logo
    socials:    5,  // LinkedIn / Instagram / TikTok icons
    jobHeading: 1,  // "not hiring right now" heading
    googleMap:  1,  // Google Maps link text
    email:      1,  // hello@truus.co
    whatsapp:   1,  // send us a whatsapp
};
```

Higher number = more rotation (degrees). Set to `0` to disable for any element.

---

## 🎲 Marquee Randomisation Logic

The marquee uses two constraint-aware helpers in `components/DoubleMarquee.jsx`:

- **`shuffleNoAdjacentSrc(brands)`** — Fisher-Yates shuffle + post-processing to ensure no two cards with the same logo appear next to each other, **including at the loop seam**.
- **`assignColorsNoAdjacent(count, colors)`** — Assigns background colours one-by-one, always excluding the previous colour (and the first colour on the last item, to fix the seam).

---

## 🎨 SVG Architecture

All SVGs are handled using one of three strategies:

| Strategy | Used For | Why |
|---|---|---|
| External `.svg` + `<img>` | Brand logos, stickers, blobs | No CSS dependency; best for large, non-reused shapes |
| Inline `<symbol>` + `<use>` | Repeated icons (`bullet-icon`, `card-divider`) | Defined once in `SvgSymbols.jsx`, rendered many times; supports `currentColor` |
| Inline `<svg>` | Animated paths (title underline, map link, scribble) | Required for `stroke-dasharray` draw animations |

---

## ⚙️ Setup & Installation

This project uses Next.js, so you need Node.js installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/truus.git
   cd truus
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   ```
   http://localhost:3000
   ```

---

## 👨‍💻 Developed By

Made with ❤️ by **Arkyadeep Pal**, **Soumyakanta Mitra** and **Anshu Ram**, powered by **Antigravity AI**.

## 📄 License

This project is for educational and portfolio purposes. All original brand assets belong to Truus.co.