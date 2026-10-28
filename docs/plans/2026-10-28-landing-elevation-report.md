# Landing Page + Loading Screen — Elevation Report

**Date:** 2026-10-28
**Scope:** `app/page.jsx` (landing route) and the first-load experience
**Method:** 2 parallel read-only audits (landing interactions / load & transitions) + runtime instrumentation of the production build at `localhost:3200` + LottieFiles asset review (13 candidates rendered and compared)
**Status:** Proposal only — **no code changed, no commits, no deploys**

---

## 0. The headline finding

**The site already has a loading screen. It is a 5-second dead page.**

`components/TransitionScribble.jsx:110` auto-fires the scribble overlay 100 ms after mount.
`lib/data.js:586-587` sets `durationIn: 2.2, durationOut: 2.7` → a **4.9 s** animation.
`app/styles/cursor.css:46` applies `body.is-transitioning { pointer-events: none !important }`.

Measured on the production build:

| Event | Time after navigation |
|---|---|
| `body.is-transitioning` applied | **842 ms** |
| `body.is-transitioning` removed | **5,784 ms** |
| **Total unclickable window** | **4,942 ms** |

During that window `elementFromPoint` over the hero "Download CV" button returns `<html class="lenis">`, **not** the button. The page is fully painted and visible, but every link, button and card is dead for nearly five seconds.

> **Consequence for this request:** a new loading screen must **replace** this behaviour, never stack on top of it. Adding a loader on top would produce a 6–7 second unusable page.

---

## 1. Verified measurements (production build, `localhost:3200`)

| Metric | Measured | Note |
|---|---|---|
| Landing page dead time | **4,942 ms** | `body.is-transitioning` lock, see §0 |
| Landing total decoded weight | **3,881,340 B** (3.70 MB) | 62 resources |
| Hero LCP image | `wideBanner.png` **1,940,928 B** (1920×1080 RGBA) | 50 % of the entire page weight |
| Mobile hero image | `studio1.png` **1,739,216 B** | loaded on ≤ 768 px viewports |
| Self-hosted fonts | DM Sans TTF **238,984 B** + Epilogue TTF **201,584 B** = **440,568 B** | `format('truetype')` only — no woff2 |
| `next/font` Cairo subsets | 30,712 B + 33,644 B woff2 | OK |
| CLS | **0** | no layout shift — good, do not regress this |
| Lottie runtime cost | `lottie.min.js` **305,704 B raw / 76,582 B gzip** | dynamically imported, so it stays a separate chunk |
| `lottie-web` on landing today | **not loaded** | only `/projects` pulls it |
| Hero play/pause button | **dead** — click changes nothing | runtime-confirmed, see §3 |

### WebP conversion — measured, not estimated

Real conversions run with the local ffmpeg (`libwebp`), written to a temp folder, **not** into the repo:

| Source | Bytes | WebP q92 | WebP q82 |
|---|---|---|---|
| `wideBanner.png` (1920×1080) | 1,940,928 | 132,234 (**−93.2 %**) | **69,158 (−96.4 %)** |
| `studio1.png` | 1,739,216 | — | **57,342 (−96.7 %)** |

**3,553,570 bytes (3.39 MB) removed from the critical path.** Landing page goes from **3.70 MB → ~0.44 MB (−88 %)**.
At an effective 10 Mbps that is **~1.5 s** of transfer removed; at 4G (~6 Mbps) it is **~2.6 s**. This is the single largest LCP lever available — larger than anything a loader can do.

---

## 2. Dead / broken code found on the landing route (runtime- or cascade-confirmed)

| # | Issue | Evidence | Files |
|---|---|---|---|
| D1 | **Hero play/pause button does nothing.** `aria-pressed` stuck at `"true"`, label stuck at `"Pause"`, container class stuck at `is-playing is-muted`. The ref points at an `<img>` (no `play`/`pause` API) so the guard always returns early. | **runtime-confirmed** | `components/VimeoHero.jsx:20,114-116,271` |
| D2 | **Hero mute is dead twice** — the button *and* the whole-hero `onClick={toggleMute}` — same guard. `.vimeo-hero` still shows a pointer cursor, advertising clickability. | runtime + source | `components/VimeoHero.jsx:126-128,183` |
| D3 | **The hover "mute bubble" can never be clicked** (`pointerEvents:'none'`, no handler) and its icon is inverted relative to `isMuted`. It is decoration that advertises a control. | source | `components/VimeoHero.jsx:150` + `app/styles/vimeo-hero.css:353-359` |
| D4 | **Dead state classes** — `is-playing / is-paused / is-muted / is-unmuted` appear in **zero** CSS files. | grep | `components/VimeoHero.jsx:181` |
| D5 | **Dead CSS** — `.vimeo-hero__placeholder`, `.vimeo-hero__loading`, `.vimeo-hero__spinner`, `.home-header__title-line-path` + `@keyframes draw-oval-underline` have no JSX counterpart. | grep | `app/styles/vimeo-hero.css` |
| D6 | **Mobile ServiceCards deck is visually dead.** `.card { left/top/transform: … !important }` (author `!important` beats GSAP's inline transform) → all 5 cards stack at `left:50%; top:40px`; only opacity animates. The "swipe" is a fade. | cascade-confirmed | `app/styles/cards.css:161-167` vs `components/ServiceCards.jsx:166-248` |
| D7 | **MotionCards floating labels swallow clicks.** `pointer-events:auto` on a `z-index:10` layer over `z-index:2` cards → the 4 project card links are unreachable under the labels. | confirmed | `app/styles/motion-cards.css:202-204` |
| D8 | **Infinite marquee with no pause** — two 22 s CSS loops, no `animation-play-state`, no stop control. Fails WCAG 2.2.2 (moving content > 5 s). | confirmed | `app/styles/marquee.css:161-167` |
| D9 | **TransitionScribble's "route push" does not exist.** It binds to `.logo-truus` (a class that is nowhere in the repo) → falls back to `.logo-omar`, a plain `<div>`. `e.preventDefault()` (:23) swallows the click and nothing navigates. There is **no `router.push` anywhere in `app/` or `components/`**. | grep | `components/TransitionScribble.jsx:9,23,46` |
| D10 | **Every route mounts its own shell** (SmoothScroll, CursorBubble, Navbar, TransitionScribble), so the scribble replays on **every** client-side navigation, not just first load. | source | `app/page.jsx:21-22,24,43` + all other routes |
| D11 | **Navbar desktop work-drawer entries are `<div>`s** — not tabbable, no role, no `aria`. Only "View all projects" is a real link. No focus trap, no Escape on desktop. | source | `components/Navbar.jsx:595-627` |
| D12 | **Navbar thumbs are `loading="eager"`** — 3 extra requests on every route. | source | `components/Navbar.jsx:602,611,620` |
| D13 | **`HorizontalWords` creates ~58 ScrollTriggers** for one section (49 letters + 3 stickers + 4 paths + timeline + pin). | source | `components/HorizontalWords.jsx:90-139` |
| D14 | **No `ScrollTrigger.refresh()` anywhere** — trigger positions are computed before the 1.94 MB hero decodes, so the pinned words / fan-out cards can be mis-measured. | grep | repo-wide |
| D15 | **`Showreel` is a placeholder with no video** — it advertises a showreel and delivers text. | source | `components/Showreel.jsx:5-14` + `app/globals.css:15` |
| D16 | **Hero headline contrast fails above the 62 % mark** — scrim is transparent→0.45→0.85; the upper headline lines fall in the 30–62 % band ≈ 3.35:1 worst case against a white frame. | source | `app/styles/vimeo-hero.css:52-64` |

### Verified as already-correct — do **not** "fix" these

- Reduced-motion handling is right in all 6 animated sections (JS bail + CSS fallback + global guard).
- Alt text is meaningful; decorative art correctly uses `alt=""` + `aria-hidden`.
- CLS is 0.
- The `/projects` page Lottie mascot + filter rework from the previous session is sound.

---

## 3. Landing-page enhancement proposals

Ranked by **impact ÷ effort**. Each row names the files it touches.

### Tier 1 — high impact, low effort

| # | Proposal | Files | Effect |
|---|---|---|---|
| **L1** | **Kill the 5-second dead page.** Remove the `setTimeout` auto-run at `TransitionScribble.jsx:110`; make the scribble fire only on real navigation, and remove the `body.is-transitioning` pointer-lock from first load. | `components/TransitionScribble.jsx`, `app/styles/cursor.css` | Dead time **4,942 ms → ~0**. Biggest single UX win on the page. |
| **L2** | **Hero images → WebP + responsive `srcset`/`sizes`.** Ship `wideBanner-1920.webp` (69 KB), `wideBanner-960.webp`, `studio1-768.webp` (57 KB); keep PNG only as a fallback. Add `width`/`height` to kill any CLS risk. | `public/assets/omar/`, `components/VimeoHero.jsx:185-197` | **−3.39 MB (−88 % page weight)**; ~1.5 s LCP off a 10 Mbps link. |
| **L3** | **Remove the dead hero controls** (play/pause, mute, the mute bubble) — or convert the hero to a real `<video>` with a proper poster. Deleting is the honest, cheap fix; a video is the "elevate" fix (see L4). | `components/VimeoHero.jsx:112-131,150,271-277`, `app/styles/vimeo-hero.css` | Kills a button that lies to screen readers (`aria-pressed` permanently "true"). |
| **L4** | **Hero → real video with a poster.** `wideBanner.png` is a still of Omar in a studio. Convert to a 6–8 s silent WebM/MP4 (H.264 + VP9), keep the PNG as the `poster`, add `<track>`-free audio-free `<video muted playsinline loop autoplay>`; the existing play/pause + mute UI then becomes real. | `components/VimeoHero.jsx`, `public/assets/omar/` | Turns the "hero video" the component was clearly written for into an actual video. **Optional, larger scope.** |
| **L5** | **Floating labels → `pointer-events: none`.** | `app/styles/motion-cards.css:202-204` | Restores the 4 project card links on the landing page. One-line fix. |
| **L6** | **Marquee pause control** (WCAG 2.2.2): pause on hover/focus + a visible ⏸ button, `animation-play-state: paused`. | `app/styles/marquee.css`, `components/DoubleMarquee.jsx` | Accessibility pass on a section that currently cannot be stopped. |

### Tier 2 — high impact, medium effort

| # | Proposal | Files | Effect |
|---|---|---|---|
| **L7** | **Loader (see §4) replacing the dead window.** A branded Lottie splash that dismisses on **hero image decode + `document.fonts.ready`**, never on a fixed timer. | new `components/PageLoader.jsx`, `app/layout.jsx` | Turns 4.9 s of dead time into ~0.3 s of *branded* time. This is the "elevate" headline. |
| **L8** | **Fix the mobile ServiceCards deck** — remove the `!important` cascade, or delete the drag code and make the cards a normal stacked list with links. Add keyboard access (`tabIndex`, Enter/Space, `role="button"`). | `app/styles/cards.css:161-167`, `components/ServiceCards.jsx` | Restores the swipe interaction on mobile; fixes WCAG 2.5.7. |
| **L9** | **Fonts → woff2 + preload.** Convert DM Sans / Epilogue TTFs to woff2 (TTF→woff2 is typically −60 %). | `public/fonts/`, `app/styles/base.css:3-15` | **−440 KB → ~170 KB**; kills the FOUT window on the display face. |
| **L10** | **`ScrollTrigger.refresh()` after hero decode** + batch the 49 per-letter triggers into one timeline with per-element offsets. | `components/SmoothScroll.jsx`, `components/HorizontalWords.jsx:90-139` | Fixes scroll-position drift; ~58 triggers → ~3. |
| **L11** | **Navbar drawer keyboard access** — make the 3 project entries real links, add Escape-to-close and focus return. Make the thumbs `loading="lazy"`. | `components/Navbar.jsx:595-627` | Tabbable drawer, 3 fewer eager requests per route. |
| **L12** | **Hero headline contrast fix** — deepen the scrim in the 30–62 % band or add a text-shadow, so the upper headline lines clear 4.5:1. | `app/styles/vimeo-hero.css:52-64` | WCAG 1.4.3 on the most-read element on the site. |

### Tier 3 — the "elevate" layer (new capability, no bug fix)

| # | Proposal | What it adds |
|---|---|---|
| **L13** | **Scroll-scrubbed "How I work" strip** — a 4-step process section (Discover → Architect → Build → Ship) where the active step advances with scroll, each step with its own icon/illustration. | A narrative section the site currently lacks; gives the page a second act between the hero and the projects. |
| **L14** | **Count-up stats** on "1,120+ client hours • 17 selected projects" — animate the numbers when the section enters the viewport. | Makes the proof points feel alive; tiny code, big perceived polish. |
| **L15** | **Magnetic CTAs** — the custom cursor already exists (`CursorBubble`); add magnetic pull + a label morph on "Download CV" and the primary nav links. | High perceived quality, low risk, on the elements people click. |
| **L16** | **3D tilt + shadow on MotionCards / ServiceCards hover**, echoing the existing InertiaPlugin fling. | Ties the card system together. Must respect reduced-motion. |
| **L17** | **Route-transition flourish** — reuse the scribble *as intended* (draw → logo → wipe → navigate) and add the confetti Lottie as a short exit flourish on client-side navigation only. | Turns the currently-broken scribble into the site signature. |
| **L18** | **Build the Showreel** — a real 30 s reel (or a 3-item auto-playing project montage) in the placeholder section. | The section currently promises and does not deliver. |
| **L19** | **Section Lottie accents** — small looped Lottie per section (sparkle on the expertise cards, a small character on the CTA block). Reuse the `LottieCharacter` component already shipped for `/projects`. | The "Lottie files" ask, spread tastefully rather than concentrated in one loader. |
| **L20** | **Scroll progress indicator** in the navbar (a thin brand-gradient bar). | Orientation on a long page; cheap. |

---

## 4. Loading screen — design options

### 4.1 Constraints any loader MUST satisfy

Derived from the audit and **runtime-verified**:

| Constraint | Why |
|---|---|
| Must **not** delay the LCP surface | The hero + headline are the LCP. A loader that covers them raises LCP unless dismissal is tied to a real signal (hero decode / `fonts.ready`), never a fixed timer. |
| Must **not** reuse `body.is-transitioning` | `TransitionScribble.jsx:24` guards on that class → a loader sharing it deadlocks both. |
| Must not add a `pointer-events: none` window ≥ 1 s | The page is *already* inert for 4.9 s today. |
| Must sit at **z-index > 10000** | `.cursor-bubble` = 10000, `.skip-link` = 10000, `.transition-scribble` = 9999, `.vimeo-mute-bubble` = 9998. |
| Must not cover the **skip link** | `base.css:111-131` — it must stay focus-reachable while the loader is up. |
| Must have a **reduced-motion path** | `matchMedia` check must come before any tween (pattern: `TransitionScribble.jsx:22`). |
| Must be **first-load only** | Every route mounts its own shell; without a gate it replays on every navigation. |
| Must not **trap focus** | No focus trap on first paint; no `inert` on `body`. |
| Must be **remount-safe** and must tolerate a late `ScrollTrigger.refresh()`. | Dismiss on `requestAnimationFrame` after hydration, not on marquee/pin measurements. |

### 4.2 Lottie candidates — rendered and compared

13 assets downloaded and rendered side by side. Full contact sheet reviewed:

| Asset | Look | Size | Duration | Brand fit | Licence |
|---|---|---|---|---|---|
| **`YJFfSUf5D7`** | 4-point **sparkle**, blue→purple→pink gradient | **7.25 KB** | 2.04 s | ★★★★★ — gradient maps exactly onto `--color-darkblue #4b69f0` → purple → `--color-pink #f0befa` | check at impl. |
| **`grad01`** (JAStudio "gradient loader 01") | soft purple/blue/pink **orb** | 42 KB | 9.9 s | ★★★★☆ — on-palette, but 5× the payload and 10 s loop | Lottie Simple ✓ |
| **`grad02`** (JAStudio "gradient loader 02") | blue/teal **orb** | 53 KB | 8.03 s | ★★★☆☆ — teal is off-brand | Lottie Simple ✓ |
| **`HSrB72jp4j`** (Evanthia "Confetti - Animation 01") | **confetti burst**, brand-adjacent colours | 45 KB | 1.77 s | ★★★★☆ — better as a *transition flourish* than a loader | Lottie Simple ✓ |
| **`BPlZjqXijB`** (Raymond "Loader animation") | single **orange arc** | 5.4 KB | 2.0 s | ★★★★☆ — matches `--color-orange #f5693c` exactly | Lottie Simple ✓ |
| **`Q0vzUfWOJr`** | three **circles** (navy / purple / cyan) | 2.8 KB | 2.0 s | ★★★☆☆ — cyan is off-brand | check at impl. |
| **`dots`** (Umer Khawer "Loading Dots Blue") | 3 blue dots | 5.5 KB | 1.35 s | ★★★☆☆ — clean, generic, 1920×1080 canvas | Lottie Simple ✓ |
| `75DMbZL534` | navy cat | 23 KB | 1.28 s | ★★☆☆☆ — cute, off-theme | check at impl. |
| `JR0JIPZcOE` / `jND1FaeDfE` / `FKE8yf5H9U` / `2KzKA3idKx` / `PXRs33DNlI` | scribble / sleeping cat / plant / cat+hearts / lounging cat | 326 KB – 5.1 MB **as GIF** | — | ★★☆☆☆ — GIF payloads are unusable; the JSON equivalents are small but the theme is "cat" | — |

> **Note on licences:** "Lottie Simple License" (free commercial use, no attribution) was **verified on 5 of the 13** by reading each animation's own page. The two finalists' licences are unconfirmed and must be checked on their LottieFiles page at implementation time — the check is one click. The already-shipped `/projects` mascot ("Doug", Anwar Hossain) is on the same Lottie Simple License.

### 4.3 The four loader designs

All four share the same shell: a fixed full-viewport overlay on `--bg-color #f0ebe6`, `z-index: 10001`, the brand wordmark, a thin progress hairline, and a dismissal driven by **hero image decode + `document.fonts.ready`** (with a 2.5 s hard ceiling so a slow network can never trap the visitor).

| | **A — Sparkle Splash** ⭐ | **B — Gradient Orb** | **C — Character Loader** | **D — Scribble Rebuild** |
|---|---|---|---|---|
| **Animation** | `YJFfSUf5D7` sparkle (7.25 KB) | `grad01` orb (42 KB) | a new Lottie character + speech bubble | the site's own stroke draw (no new asset) |
| **Extra payload** | 7.25 KB JSON + 76.6 KB gzip lottie-web | 42 KB + 76.6 KB gzip | ≈ 15 KB + 76.6 KB gzip | **0** (lottie-web not needed) |
| **Personality** | high, but abstract | premium, calm | highest — "fun and engaging" | on-brand, signature |
| **Brand fit** | blue→purple→pink = the exact palette | purple/blue/pink, softer | matches the `/projects` mascot | strongest — it *is* the brand mark |
| **Effort** | medium (new component + Lottie plumbing) | medium | medium-high (new asset to source/license) | medium (rewrite the broken trigger) |
| **Risk** | lottie-web chunk on the landing route | +42 KB, 10 s loop must be trimmed | new licence to clear | must not regress the nav logo |
| **Best for** | the fastest path to "wow" | a calm, premium first impression | a playful, human first impression | the most *elevated* signature |

**My recommendation:** **A (Sparkle Splash)** for the loader, with **D** rebuilt as the *route-transition* flourish (fire only on real navigation), and **confetti** (`HSrB72jp4j`) as an optional celebratory flourish after the loader exits. This also means the visitor sees the brand palette in motion within the first 300 ms instead of staring at a frozen page for five seconds.

---

## 5. Impact summary

| Dimension | Today | After L1 + L2 + L7 | Δ |
|---|---|---|---|
| Dead / unclickable time | 4,942 ms | ~0 ms (loader is decorative, not blocking) | **−4.9 s** |
| Landing page weight | 3.70 MB | ~0.44 MB | **−88 %** |
| Hero LCP transfer | 1.94 MB | 69 KB (WebP) | **−96 %** |
| Font bytes | 440 KB | ~170 KB (woff2) | **−61 %** |
| CLS | 0 | 0 | unchanged |
| Lottie on landing | not loaded | 7.25 KB JSON + 76.6 KB gzip chunk | +84 KB |
| Dead UI elements | 5 (D1–D5) | 0 | −5 |
| WCAG failures on the route | 4 (D6, D8, D11, D16) | 0 | −4 |
| ScrollTriggers on one section | ~58 | ~3 | −95 % |

### Risks to watch

- **A loader can make LCP worse** if it covers the hero image. Mitigation: dismissal on decode, never a timer; the overlay is `pointer-events: none` after the hero is interactive.
- **`lottie-web` is 76.6 KB gzip.** On the landing route that is new weight. Mitigation: `import('lottie-web')` is already dynamic — it becomes its own chunk loaded only when the loader renders, and the loader is dismissed before the hero decodes in most sessions.
- **WebP/AVIF support.** WebP is supported by every browser since 2020 (Safari 14+); the PNG fallback stays in `<picture>` so nothing breaks.
- **Removing the scribble auto-run** changes the site's first impression. The replacement must feel intentional, not like a missing animation.

---

## 6. Proposed execution order

| Wave | Scope | Depends on |
|---|---|---|
| **W1 — Performance & dead code** | L1 (dead-page kill), L2 (WebP + srcset), L5 (label pointer-events), L3 (remove dead controls) | — |
| **W2 — Accessibility & correctness** | L6 (marquee pause), L8 (mobile deck + keyboard cards), L11 (navbar drawer), L12 (hero contrast) | W1 |
| **W3 — The loader** | L7 + the chosen loader design + `components/PageLoader.jsx` + `app/layout.jsx` wiring + reduced-motion path | W1 (L1 must land first) |
| **W4 — Elevation layer** | L13, L14, L15, L16, L17, L20 — pick the subset that ships | W3 |
| **W5 — Optional content** | L18 (real showreel), L4 (hero video), L19 (section accents) | W4 |

Each wave is verified with: `npm run build` → Playwright run on the production build → screenshot + runtime probe (dead-time window, CLS, transferred bytes, reduced-motion emulation).

---

## 7. Open decisions (pick before any code is written)

1. **Which loader design** — A / B / C / D.
2. **Hero: keep the still image, or build the real video?** (L3 vs L4 — the video is the bigger lift but the component was clearly written for it.)
3. **How much of the elevation layer** — ship W1–W3 only (fix + loader), or include W4 (new sections, count-ups, magnetic CTAs, transitions).
4. **Showreel** — build it, rename the section, or leave it.

**Nothing in this report has been implemented.** No files were modified, no commits were made, no servers were started or stopped beyond the temporary preview server used for the Lottie comparison (now terminated).
