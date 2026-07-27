# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal-dark, single-page portfolio with a Spline 3D hero, GSAP scroll animations, and ReactBits interactive components, deployable to Vercel.

**Architecture:** Next.js 15 App Router, single `page.tsx` assembles all sections vertically. Lenis smooth scroll is initialized in root layout and integrated with GSAP's ticker. Each section is a `'use client'` component that registers its own GSAP ScrollTrigger animations via `useGSAP`. ReactBits components are installed via jsrepo CLI into `src/components/reactbits/`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, GSAP 3 + ScrollTrigger + @gsap/react, Lenis, @splinetool/react-spline, three.js, ReactBits (AsciiText, BlurText, BorderGlow, GlassSurface, ClickSpark)

**Note on "testing":** This is a pure UI project with no business logic. TypeScript compilation replaces unit tests. Each task ends with `npm run build` (or `tsc --noEmit`) to catch type errors, plus a dev server smoke test in the browser.

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout — Lenis init, global font, metadata |
| `src/app/page.tsx` | Assembles all sections top-to-bottom |
| `src/app/globals.css` | Tailwind v4 import + CSS custom properties (design tokens) |
| `src/lib/gsap.ts` | GSAP plugin registration (run once on import) |
| `src/lib/lenis.ts` | Lenis singleton creation |
| `src/data/projects.ts` | `Project` interface + data array |
| `src/data/experiences.ts` | `Experience` interface + data array |
| `src/components/Navbar.tsx` | Fixed navbar, scroll-triggered backdrop blur |
| `src/components/sections/Hero.tsx` | Full-screen hero: Spline bg, AsciiText, BlurText, ClickSpark CTA |
| `src/components/sections/Projects.tsx` | 2-col card grid with BorderGlow + GSAP stagger |
| `src/components/sections/About.tsx` | Photo + bio, GSAP paragraph fade |
| `src/components/sections/Experiences.tsx` | Vertical timeline, GSAP slide-in per entry |
| `src/components/sections/Contact.tsx` | GlassSurface link cards, ClickSpark |
| `src/components/sections/Footer.tsx` | Minimal copyright footer |
| `src/components/reactbits/AsciiText/` | Installed via jsrepo |
| `src/components/reactbits/BlurText/` | Installed via jsrepo |
| `src/components/reactbits/BorderGlow/` | Installed via jsrepo |
| `src/components/reactbits/GlassSurface/` | Installed via jsrepo |
| `src/components/reactbits/ClickSpark/` | Installed via jsrepo |

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: entire project via `create-next-app`

- [ ] **Step 1: Scaffold in the current directory**

Run inside `D:/websites/PortofolioNEW` (directory must be empty):
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
When prompted: accept all defaults. This gives you Next.js 15, Tailwind v4, App Router, TypeScript.

- [ ] **Step 2: Verify the scaffold**

```bash
npm run dev
```
Expected: dev server starts on `http://localhost:3000`, default Next.js page visible in browser. Stop the server with Ctrl+C.

- [ ] **Step 3: Commit the scaffold**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 project"
```

---

### Task 2: Install dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install gsap @gsap/react lenis @splinetool/react-spline three
```

- [ ] **Step 2: Install type definitions**

```bash
npm install -D @types/three
```

- [ ] **Step 3: Verify installation**

```bash
npm run build
```
Expected: build succeeds with no errors (only the default Next.js page exists at this point).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install gsap, lenis, spline, three dependencies"
```

---

### Task 3: Design tokens and global CSS

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (font + background color)

- [ ] **Step 1: Replace globals.css with design tokens**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-border: #1f1f1f;
  --color-text-primary: #ffffff;
  --color-text-secondary: #666666;
  --color-text-muted: #333333;
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: #0a0a0a;
  color: #ffffff;
  scroll-behavior: auto; /* Lenis overrides this */
}

body {
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #ffffff22;
}
```

- [ ] **Step 2: Update layout.tsx with dark background metadata**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Your Name — Roblox Creator',
  description: 'Portfolio of Roblox creative work and digital experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Replace src/app/page.tsx with a blank dark page**

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <p className="p-8 text-text-secondary">coming soon</p>
    </main>
  )
}
```

- [ ] **Step 4: Smoke test**

```bash
npm run dev
```
Expected: page renders with `#0a0a0a` background and "coming soon" in grey text. No errors in console.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add design tokens and minimal dark global styles"
```

---

### Task 4: Data model files

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/experiences.ts`

- [ ] **Step 1: Create projects data file**

```ts
// src/data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  image: string       // relative path: /projects/your-image.jpg
  tags: string[]
  link?: string       // Roblox game page URL or undefined
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-1.jpg',
    tags: ['Roblox', 'Building'],
    link: 'https://www.roblox.com/games/...',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-2.jpg',
    tags: ['Roblox', 'Scripting'],
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-3.jpg',
    tags: ['Roblox', 'Design'],
    link: 'https://www.roblox.com/games/...',
  },
  {
    id: 'project-4',
    title: 'Project Four',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-4.jpg',
    tags: ['Roblox'],
  },
]
```

> **Action needed:** Replace placeholder entries with your real projects. Add images to `public/projects/`.

- [ ] **Step 2: Create experiences data file**

```ts
// src/data/experiences.ts
export interface Experience {
  id: string
  title: string
  dateRange: string
  description: string
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Experience Title',
    dateRange: '2024 — present',
    description: 'What you did, what you built, what you learned.',
  },
  {
    id: 'exp-2',
    title: 'Experience Title',
    dateRange: '2023 — 2024',
    description: 'What you did, what you built, what you learned.',
  },
  {
    id: 'exp-3',
    title: 'Experience Title',
    dateRange: '2022 — 2023',
    description: 'What you did, what you built, what you learned.',
  },
]
```

> **Action needed:** Replace placeholder entries with your real experiences.

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add Project and Experience data types with placeholder data"
```

---

### Task 5: GSAP + Lenis library setup and root layout integration

**Files:**
- Create: `src/lib/gsap.ts`
- Create: `src/lib/lenis.ts`
- Create: `src/components/SmoothScrollProvider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create GSAP plugin registration file**

```ts
// src/lib/gsap.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export { gsap, ScrollTrigger, useGSAP }
```

- [ ] **Step 2: Create Lenis smooth scroll provider**

This must be a client component because it uses `useEffect`.

```tsx
// src/components/SmoothScrollProvider.tsx
'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap' // registers GSAP plugins
import gsap from 'gsap'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 3: Wrap layout with SmoothScrollProvider**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Your Name — Roblox Creator',
  description: 'Portfolio of Roblox creative work and digital experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```
Expected: page loads, no console errors about GSAP or Lenis.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ src/components/SmoothScrollProvider.tsx src/app/layout.tsx
git commit -m "feat: add GSAP plugin registration and Lenis smooth scroll"
```

---

### Task 6: Install ReactBits components

**Files:**
- Create: `src/components/reactbits/BlurText/`
- Create: `src/components/reactbits/AsciiText/`
- Create: `src/components/reactbits/BorderGlow/`
- Create: `src/components/reactbits/GlassSurface/`
- Create: `src/components/reactbits/ClickSpark/`

- [ ] **Step 1: Install jsrepo CLI and add BlurText**

Visit https://reactbits.dev/text-animations/blur-text, click the **CLI** tab, copy the install command. It will look like:

```bash
npx jsrepo add github/davidhdev/react-bits/TextAnimations/BlurText
```

When prompted for output directory, enter: `src/components/reactbits`

- [ ] **Step 2: Install AsciiText**

Visit https://reactbits.dev/text-animations/ascii-text, CLI tab:

```bash
npx jsrepo add github/davidhdev/react-bits/TextAnimations/AsciiText
```

Output directory: `src/components/reactbits`

AsciiText depends on `three` (already installed in Task 2).

- [ ] **Step 3: Install BorderGlow**

Visit https://reactbits.dev/components/border-glow, CLI tab:

```bash
npx jsrepo add github/davidhdev/react-bits/Components/BorderGlow
```

Output directory: `src/components/reactbits`

- [ ] **Step 4: Install GlassSurface**

Visit https://reactbits.dev/components/glass-surface, CLI tab:

```bash
npx jsrepo add github/davidhdev/react-bits/Components/GlassSurface
```

Output directory: `src/components/reactbits`

- [ ] **Step 5: Install ClickSpark**

Visit https://reactbits.dev/animations/click-spark, CLI tab:

```bash
npx jsrepo add github/davidhdev/react-bits/Animations/ClickSpark
```

Output directory: `src/components/reactbits`

- [ ] **Step 6: Note the actual output paths**

After each install, note where jsrepo placed the file (it may differ from above). The actual file paths determine the import paths used in later tasks. Update imports in later tasks accordingly if paths differ.

- [ ] **Step 7: Type-check all installed components**

```bash
npx tsc --noEmit
```
Expected: no errors. If AsciiText has Three.js type errors, ensure `@types/three` is installed (`npm install -D @types/three`).

- [ ] **Step 8: Commit**

```bash
git add src/components/reactbits/
git commit -m "feat: install ReactBits components (BlurText, AsciiText, BorderGlow, GlassSurface, ClickSpark)"
```

---

### Task 7: Navbar component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
// src/components/Navbar.tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'nav-scrolled', targets: navRef.current },
    })
  })

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .nav-scrolled {
          background: rgba(10, 10, 10, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid #1f1f1f !important;
        }
      `}</style>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          background: 'transparent',
          borderBottom: '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: '13px',
            letterSpacing: '0.2em',
            fontWeight: 600,
          }}
        >
          YN
        </span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['projects', 'about', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
            >
              {id}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
```

- [ ] **Step 2: Add Navbar to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <p className="p-8 pt-24 text-text-secondary">sections coming soon</p>
    </main>
  )
}
```

- [ ] **Step 3: Smoke test**

```bash
npm run dev
```
Expected: navbar renders top-right with WORK · ABOUT · CONTACT links. After scrolling 80px, backdrop blur appears.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/page.tsx
git commit -m "feat: add fixed navbar with scroll-triggered backdrop blur"
```

---

### Task 8: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Note on Spline scene URL:** Before implementing, go to https://app.spline.design, open one of the two community files you liked (fork it to your account first), then Export → Web → copy the scene URL (format: `https://prod.spline.design/XXXXX/scene.splinecode`). Replace `YOUR_SPLINE_SCENE_URL` below with that URL.

- [ ] **Step 1: Create Hero component**

```tsx
// src/components/sections/Hero.tsx
'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Dynamic imports — both use browser APIs, must be client-only
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
})

// Update this import path if jsrepo placed files elsewhere
const AsciiText = dynamic(
  () => import('@/components/reactbits/AsciiText/AsciiText'),
  { ssr: false, loading: () => null }
)

import BlurText from '@/components/reactbits/BlurText/BlurText'
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark'

const SPLINE_SCENE = 'YOUR_SPLINE_SCENE_URL'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Parallax exit: content shrinks slightly and fades as user scrolls away
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Spline 3D background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Spline scene={SPLINE_SCENE} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Foreground content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* ASCII art name — replace "YOUR NAME" with your actual name */}
        <div style={{ width: '100%', maxWidth: '600px', height: '120px' }}>
          <AsciiText
            text="YOUR NAME"
            enableWaves={true}
            asciiFontSize={8}
            textFontSize={140}
            textColor="#ffffff"
            planeBaseHeight={6}
          />
        </div>

        {/* Tagline */}
        <BlurText
          text="Roblox Creator"
          delay={80}
          animateBy="words"
          className=""
          style={{
            fontSize: '14px',
            letterSpacing: '0.3em',
            color: '#666666',
            textTransform: 'uppercase',
          }}
        />

        {/* CTA */}
        <ClickSpark
          sparkColor="#ffffff"
          sparkSize={8}
          sparkRadius={60}
          sparkCount={8}
          duration={400}
        >
          <button
            onClick={handleViewWork}
            style={{
              marginTop: '12px',
              background: 'transparent',
              border: '1px solid #333',
              color: '#888',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '12px 24px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#666'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.color = '#888'
            }}
          >
            View Work →
          </button>
        </ClickSpark>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <p style={{ padding: '4rem 2rem', color: '#666' }}>more sections coming...</p>
    </main>
  )
}
```

- [ ] **Step 3: Smoke test**

```bash
npm run dev
```
Expected: full-screen dark section with Spline 3D in background, ASCII art name, blurred-in tagline, and "View Work →" button with sparks on click.

If Spline URL is placeholder, the background will be empty — that is expected at this stage.

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with Spline background, AsciiText, BlurText, ClickSpark CTA"
```

---

### Task 9: Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Add project images to public/**

Create the directory and add placeholder images:
```bash
mkdir -p public/projects
```
Copy your Roblox project screenshots as `public/projects/project-1.jpg`, `project-2.jpg`, etc. Update `src/data/projects.ts` with the correct filenames.

For now, continue without images — `next/image` with a missing `src` will show a broken image placeholder, which is fine during dev.

- [ ] **Step 2: Create Projects section**

```tsx
// src/components/sections/Projects.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import BorderGlow from '@/components/reactbits/BorderGlow/BorderGlow'
import { projects } from '@/data/projects'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.project-card')
    if (!cards) return

    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  })

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: '120px 32px',
        background: '#0d0d0d',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <BlurText
        text="Work"
        delay={60}
        animateBy="letters"
        style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555',
          textTransform: 'uppercase',
          marginBottom: '48px',
          display: 'block',
        }}
      />

      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <BorderGlow
              backgroundColor="#111111"
              borderRadius={8}
              glowColor="0 0 90"
              glowRadius={30}
              glowIntensity={0.8}
              animated={false}
            >
              <div
                style={{
                  cursor: project.link ? 'pointer' : 'default',
                  overflow: 'hidden',
                  borderRadius: '8px',
                }}
                onClick={() => {
                  if (project.link) window.open(project.link, '_blank')
                }}
              >
                {/* Project image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    background: '#1a1a1a',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Card body */}
                <div style={{ padding: '20px' }}>
                  <h3
                    style={{
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 500,
                      marginBottom: '6px',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      marginBottom: '12px',
                    }}
                  >
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          color: '#444',
                          border: '1px solid #222',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add Projects to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Projects />
      <p style={{ padding: '4rem 2rem', color: '#666' }}>more sections coming...</p>
    </main>
  )
}
```

- [ ] **Step 4: Smoke test**

```bash
npm run dev
```
Expected: 2-column grid of project cards after the hero. Cards have a white edge glow that follows the cursor. Cards stagger in from below when scrolled into view.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Projects.tsx src/app/page.tsx public/projects/
git commit -m "feat: add Projects section with BorderGlow cards and GSAP stagger reveal"
```

---

### Task 10: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About component**

```tsx
// src/components/sections/About.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'

export default function About() {
  const paragraphsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const paras = paragraphsRef.current?.querySelectorAll<HTMLElement>('p')
    if (!paras) return

    gsap.from(paras, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: paragraphsRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  })

  return (
    <section
      id="about"
      style={{
        padding: '120px 32px',
        background: '#0a0a0a',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <BlurText
        text="About"
        delay={60}
        animateBy="letters"
        style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555',
          textTransform: 'uppercase',
          marginBottom: '48px',
          display: 'block',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Photo */}
        <div
          style={{
            position: 'relative',
            width: '200px',
            height: '240px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #222',
            background: '#111',
            flexShrink: 0,
          }}
        >
          <Image
            src="/about/photo.jpg"
            alt="Your photo"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Bio text */}
        <div ref={paragraphsRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ color: '#fff', fontSize: '15px', lineHeight: 1.8 }}>
            {/* Replace with your real bio */}
            Hi — I'm Your Name. I build things on Roblox and spend a lot of time
            online. This is a place for the work I'm proud of.
          </p>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8 }}>
            {/* Replace with your real story */}
            I started creating on Roblox in [year]. Since then I've built [X], worked
            on [Y], and met a lot of interesting people along the way.
          </p>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8 }}>
            {/* Real life / IRL context */}
            Outside of that, I'm [age/location/vibe]. This portfolio is a mix of
            the digital and the real.
          </p>
        </div>
      </div>
    </section>
  )
}
```

> **Action needed:** Add your photo as `public/about/photo.jpg`. Replace placeholder bio text with your real story.

- [ ] **Step 2: Add About to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <p style={{ padding: '4rem 2rem', color: '#666' }}>more sections coming...</p>
    </main>
  )
}
```

- [ ] **Step 3: Smoke test**

```bash
npm run dev
```
Expected: photo on left, bio paragraphs on right, paragraphs fade in sequentially when scrolled into view.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx public/about/
git commit -m "feat: add About section with photo and GSAP paragraph fade"
```

---

### Task 11: Experiences section

**Files:**
- Create: `src/components/sections/Experiences.tsx`

- [ ] **Step 1: Create Experiences component**

```tsx
// src/components/sections/Experiences.tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import { experiences } from '@/data/experiences'

export default function Experiences() {
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const entries = listRef.current?.querySelectorAll<HTMLElement>('.exp-entry')
    if (!entries) return

    gsap.from(entries, {
      x: -20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  })

  return (
    <section
      id="experiences"
      style={{
        padding: '120px 32px',
        background: '#0d0d0d',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <BlurText
        text="Experiences"
        delay={60}
        animateBy="letters"
        style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555',
          textTransform: 'uppercase',
          marginBottom: '48px',
          display: 'block',
        }}
      />

      <div
        ref={listRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          maxWidth: '640px',
        }}
      >
        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            className="exp-entry"
            style={{
              display: 'grid',
              gridTemplateColumns: '20px 1fr',
              gap: '24px',
              paddingBottom: i < experiences.length - 1 ? '40px' : '0',
            }}
          >
            {/* Timeline line + dot */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '4px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#333',
                  flexShrink: 0,
                }}
              />
              {i < experiences.length - 1 && (
                <div
                  style={{
                    width: '1px',
                    flex: 1,
                    background: '#1f1f1f',
                    marginTop: '6px',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div>
              <h3
                style={{
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 500,
                  marginBottom: '4px',
                }}
              >
                {exp.title}
              </h3>
              <div
                style={{
                  color: '#444',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                {exp.dateRange}
              </div>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.7 }}>
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Experiences to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import Experiences from '@/components/sections/Experiences'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experiences />
      <p style={{ padding: '4rem 2rem', color: '#666' }}>contact coming...</p>
    </main>
  )
}
```

- [ ] **Step 3: Smoke test**

```bash
npm run dev
```
Expected: vertical timeline with dot + line for each entry, each entry slides in from left on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experiences.tsx src/app/page.tsx
git commit -m "feat: add Experiences timeline section with GSAP slide-in"
```

---

### Task 12: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact component**

```tsx
// src/components/sections/Contact.tsx
'use client'

import BlurText from '@/components/reactbits/BlurText/BlurText'
import GlassSurface from '@/components/reactbits/GlassSurface/GlassSurface'
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark'

interface ContactLink {
  label: string
  value: string
  href: string
}

// Replace with your actual contact links
const links: ContactLink[] = [
  { label: 'Discord', value: 'yourhandle', href: 'https://discord.com/users/YOUR_ID' },
  { label: 'Email', value: 'you@email.com', href: 'mailto:you@email.com' },
  { label: 'Roblox', value: 'YourRobloxName', href: 'https://www.roblox.com/users/YOUR_ID/profile' },
]

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '120px 32px 80px',
        background: '#0a0a0a',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <BlurText
        text="Contact"
        delay={60}
        animateBy="letters"
        style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555',
          textTransform: 'uppercase',
          marginBottom: '48px',
          display: 'block',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '480px',
        }}
      >
        {links.map((link) => (
          <ClickSpark
            key={link.label}
            sparkColor="#ffffff"
            sparkSize={6}
            sparkRadius={50}
            sparkCount={6}
            duration={350}
          >
            <a
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <GlassSurface
                style={{
                  padding: '16px 20px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                }}
              >
                <div>
                  <div style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>
                    {link.label}
                  </div>
                  <div style={{ color: '#555', fontSize: '12px', marginTop: '2px' }}>
                    {link.value}
                  </div>
                </div>
                <span style={{ color: '#444', fontSize: '16px' }}>→</span>
              </GlassSurface>
            </a>
          </ClickSpark>
        ))}
      </div>
    </section>
  )
}
```

> **Note on GlassSurface props:** After installing via jsrepo, check the installed component's actual prop interface — `style`, `onMouseEnter`, `onMouseLeave` may need to be passed differently depending on the version installed. Adjust the props to match what the component accepts.

- [ ] **Step 2: Add Contact to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import Experiences from '@/components/sections/Experiences'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experiences />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Smoke test**

```bash
npm run dev
```
Expected: 3 frosted-glass link cards. Clicking each fires white sparks. Cards lift slightly on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.tsx src/app/page.tsx
git commit -m "feat: add Contact section with GlassSurface cards and ClickSpark"
```

---

### Task 13: Footer + final page assembly

**Files:**
- Create: `src/components/sections/Footer.tsx`
- Finalize: `src/app/page.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// src/components/sections/Footer.tsx
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #1f1f1f',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#0a0a0a',
      }}
    >
      <span style={{ color: '#333', fontSize: '11px' }}>
        © {new Date().getFullYear()} Your Name
      </span>
      <span style={{ color: '#333', fontSize: '11px' }}>
        Built with Next.js
      </span>
    </footer>
  )
}
```

- [ ] **Step 2: Final page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
import Experiences from '@/components/sections/Experiences'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Experiences />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Full type-check + build**

```bash
npx tsc --noEmit
npm run build
```
Expected: both pass with no errors. If there are type errors from ReactBits components, fix them by adjusting prop types to match the installed component interfaces.

- [ ] **Step 4: Final smoke test in dev**

```bash
npm run dev
```
Walk through the full page:
- Hero loads with Spline scene + ASCII text + blurred tagline + sparking CTA
- Scrolling past hero triggers navbar backdrop
- Projects grid staggers in
- About paragraphs fade in
- Experiences entries slide in from left
- Contact cards have glass effect + click sparks
- Footer renders at the bottom

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete portfolio — all sections assembled and verified"
```

---

### Task 14: Vercel deployment

**Files:**
- None (Vercel reads `package.json` and Next.js config automatically)

- [ ] **Step 1: Create a GitHub repo and push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

1. Go to https://vercel.com/new
2. Import the GitHub repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

- [ ] **Step 3: Set your real Spline scene URL**

After getting your Spline export URL (see Task 8 Step 1), update `SPLINE_SCENE` in `Hero.tsx` and redeploy:
```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add real Spline scene URL"
git push
```
Vercel auto-redeploys on push.

- [ ] **Step 4: Replace all placeholder content**

- Update `src/data/projects.ts` with real projects and images in `public/projects/`
- Update `src/data/experiences.ts` with real experiences
- Update bio text in `About.tsx`
- Update contact links in `Contact.tsx`
- Update name in `Navbar.tsx` (initials), `Hero.tsx` (AsciiText), `Footer.tsx`, `layout.tsx` (metadata)

---

## Self-Review Checklist

- [x] Spec § Hero → Task 8 (Spline, AsciiText, BlurText, ClickSpark CTA, parallax exit)
- [x] Spec § Projects → Task 9 (BorderGlow cards, GSAP stagger, image grid)
- [x] Spec § About → Task 10 (photo + bio, GSAP paragraph fade)
- [x] Spec § Experiences → Task 11 (timeline, GSAP slide-in)
- [x] Spec § Contact → Task 12 (GlassSurface, ClickSpark)
- [x] Spec § Navbar → Task 7 (fixed, scroll-triggered backdrop)
- [x] Spec § GSAP + Lenis → Task 5
- [x] Spec § ReactBits components → Task 6
- [x] Spec § Data model (Project, Experience interfaces) → Tasks 4, 9, 11
- [x] Spec § Performance (dynamic imports for Spline + AsciiText, next/image) → Task 8
- [x] Spec § Design tokens → Task 3
- [x] Spec § Deployment → Task 14
