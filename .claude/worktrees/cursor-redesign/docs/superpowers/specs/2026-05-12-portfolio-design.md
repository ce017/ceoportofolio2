# Portfolio Website Design Spec

**Date:** 2026-05-12  
**Status:** Approved

---

## Overview

A full remake of the personal portfolio at ce-17.vercel.app. Single-page scroll site showcasing Roblox creative work and personal/online experiences. Minimal dark aesthetic with cinematic scroll animations, a Spline 3D hero scene, and ReactBits interactive components throughout.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14+ (App Router) | Framework, SSG, Vercel deployment |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| GSAP + ScrollTrigger | Scroll animations, staggered reveals, timeline pins |
| Lenis | Smooth scroll |
| @splinetool/react-spline | Hero 3D scene |
| ReactBits | Interactive UI components (see below) — installed via `npx jsrepo add github/davidhdev/react-bits` copy-paste CLI |

### ReactBits Components

| Component | Where used |
|-----------|-----------|
| `AsciiText` | Hero — name rendered as ASCII art with wave animation (depends on `three`) |
| `BlurText` | Hero tagline + section headings (word-by-word blur-in on scroll entry) |
| `BorderGlow` | Project cards — cursor-tracked edge glow on hover |
| `GlassSurface` | Contact section — frosted-glass link cards |
| `ClickSpark` | Hero CTA button + any interactive buttons sitewide |

---

## Site Architecture

Single HTML document, all sections stacked vertically. Next.js App Router with a single root `page.tsx`. No routing needed. Content lives in a `src/data/` TypeScript file (projects array, experiences array).

```
src/
  app/
    layout.tsx        # global font, metadata, Lenis smooth scroll init
    page.tsx          # assembles all sections
  components/
    Navbar.tsx
    sections/
      Hero.tsx
      Projects.tsx
      About.tsx
      Experiences.tsx
      Contact.tsx
  data/
    projects.ts       # Roblox project entries (title, description, image, link)
    experiences.ts    # Past experiences (title, date range, description)
  lib/
    gsap.ts           # GSAP + ScrollTrigger init
```

---

## Sections

### 1. Navbar
- Fixed top, `position: fixed`, starts transparent
- Fades in with background blur after scrolling past hero (`ScrollTrigger` toggle class)
- Left: initials logo. Right: WORK · ABOUT · CONTACT anchor links
- No mobile hamburger in v1 (can add later)

### 2. Hero
- Full viewport height (`100dvh`)
- Spline 3D scene rendered as background layer (`z-index: 0`), `pointer-events: none`
- Layered on top (centered):
  - `AsciiText` — name, `enableWaves: true`, white text
  - `BlurText` — tagline ("Roblox Creator"), delay after AsciiText loads
  - `ClickSpark`-wrapped CTA: "View Work →" button, sparks on click, scrolls to #projects
- GSAP: hero content fades/scales out slightly as user scrolls away (parallax exit)

### 3. Projects (`#projects`)
- Section label "WORK" in small caps with `BlurText` on scroll entry
- 2-column masonry-style grid (CSS grid, auto rows)
- Each card:
  - Project image (fill, aspect-ratio 16/9)
  - Title + short description
  - `BorderGlow` wrapper with white/grey glow (`glowColor: "0 0 90"`, `backgroundColor: "#111"`)
  - Click → opens external link (e.g. Roblox game page); if no link, card is non-clickable
- GSAP ScrollTrigger: cards stagger in from `y: 40, opacity: 0` as section enters viewport

### 4. About (`#about`)
- Two-column layout on desktop, stacked on mobile
- Left: photo (rounded, border `1px solid #222`)
- Right: bio text — who you are, real life + online experiences narrative
- `BlurText` on section heading
- GSAP: paragraphs fade in sequentially on scroll

### 5. Past Experiences (`#experiences`)
- Vertical timeline layout
- Each entry: left dot + vertical line, right side has title, date range, short description
- `BlurText` on section heading
- GSAP ScrollTrigger: each timeline entry animates in from left as it enters viewport
- Data driven from `src/data/experiences.ts`

### 6. Contact (`#contact`)
- `BlurText` section heading
- Row of `GlassSurface` link cards: Discord, Email, any social links
- Each card: icon + label + arrow, hover lifts slightly (CSS transform)
- `ClickSpark` on each card click

### 7. Footer
- Minimal: copyright line, "Built with Next.js" — single row, dark, small text

---

## Visual Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Surface | `#111111` |
| Border | `#1f1f1f` |
| Text primary | `#ffffff` |
| Text secondary | `#666666` |
| Text muted | `#333333` |
| Font | Inter (or Geist — Next.js default) |
| Letter spacing labels | `0.2em` |
| Border radius cards | `8px` |

No accent color. All interactive states use white/grey glow (via BorderGlow and GlassSurface).

---

## Animation System

All scroll animations managed by GSAP ScrollTrigger, initialized in a single `useGSAP` hook per section component.

| Animation | Trigger | Effect |
|-----------|---------|--------|
| Hero exit parallax | scroll past hero | content scales to 0.95, opacity fades |
| Navbar appearance | scroll past 100px | background blur fades in |
| Project cards | each card enters viewport | stagger `y:40→0, opacity:0→1`, 80ms delay between |
| About text | section enters viewport | paragraphs fade in sequentially |
| Timeline entries | each entry enters viewport | `x:-20→0, opacity:0→1` |
| Section headings | enter viewport | `BlurText` component handles this natively |

Smooth scroll: Lenis initialized in root layout, integrated with GSAP ticker.

---

## Data Model

```ts
// src/data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  image: string        // path to /public/projects/...
  tags: string[]
  link?: string        // external URL or undefined
}

// src/data/experiences.ts
export interface Experience {
  id: string
  title: string
  dateRange: string    // e.g. "2023 — present"
  description: string
}
```

---

## Performance Notes

- Spline 3D scene options (user provided): `https://app.spline.design/community/file/0b6036a3-d6f4-4257-bf1d-8dffdb0cf373` or `https://app.spline.design/community/file/08eaa6ef-051e-4158-8bb4-b20cb1d0707c` — user picks one; exported as embed URL via Spline's "Export → Web" flow
- Spline scene loaded with `next/dynamic` + `ssr: false` to avoid hydration issues
- `AsciiText` uses Three.js — also dynamically imported
- Images served via `next/image` (automatic WebP, lazy load)
- No CMS, no database — static build, ~zero runtime cost

---

## Out of Scope (v1)

- Mobile hamburger nav
- Dark/light mode toggle
- Blog or writing section
- Project detail pages (links go to external URL or modal)
- Analytics

---

## Success Criteria

- Loads fast on Vercel (LCP < 2.5s)
- Spline hero renders without layout shift
- All ReactBits components render correctly
- Scroll animations feel smooth (no jank at 60fps)
- Roblox project images display clearly
- Contact links work
