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

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const btn = e.currentTarget
    const target = document.getElementById(id)
    if (!target) return

    // 1. Button click feedback — quick pop + color flash
    gsap.fromTo(
      btn,
      { scale: 1, color: '#ffffff' },
      {
        scale: 1.12,
        duration: 0.18,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          btn.style.color = '#666'
        },
      }
    )

    // 2. Underline sweep beneath the button
    const underline = btn.querySelector('.nav-underline')
    if (underline) {
      gsap.fromTo(
        underline,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(underline, {
              scaleX: 0,
              transformOrigin: 'right center',
              duration: 0.35,
              ease: 'power2.in',
              delay: 0.2,
            })
          },
        }
      )
    }

    // 3. Smooth scroll via Lenis (native scrollIntoView jumps instantly — Lenis doesn't intercept it)
    const lenis = window.__lenis
    if (lenis) {
      lenis.scrollTo(target, { duration: 2.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }

    // 4. After scroll, pulse the target section's heading
    setTimeout(() => {
      const heading = target.firstElementChild?.firstElementChild as HTMLElement | null
      if (heading) {
        gsap.fromTo(
          heading,
          { color: '#aaaaaa', textShadow: '0 0 0 rgba(255,255,255,0)' },
          {
            color: '#ffffff',
            textShadow: '0 0 18px rgba(255,255,255,0.6)',
            duration: 0.45,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
          }
        )
      }
    }, 700)
  }

  return (
    <>
      <style>{`
        .nav-scrolled {
          background: rgba(10, 10, 10, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid #1f1f1f !important;
        }
        .nav-btn { position: relative; white-space: nowrap; }
        /* Phones: the five links don't fit, so the row scrolls sideways instead of widening the page. */
        @media (max-width: 720px) {
          .site-nav { padding: 14px 16px !important; gap: 16px; }
          .nav-links {
            gap: 18px !important;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-mask-image: linear-gradient(90deg, #000 85%, transparent);
            mask-image: linear-gradient(90deg, #000 85%, transparent);
            padding-right: 24px;
          }
          .nav-links::-webkit-scrollbar { display: none; }
          .nav-btn { font-size: 10px !important; letter-spacing: 0.15em !important; flex-shrink: 0; }
        }
        .nav-underline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: #ffffff;
          transform: scaleX(0);
          pointer-events: none;
        }
      `}</style>
      <nav
        ref={navRef}
        className="site-nav"
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
            fontSize: '10px',
            letterSpacing: '0.2em',
            fontWeight: 600,
          }}
        >
          17
        </span>
        <div className="nav-links" style={{ display: 'flex', gap: '32px', minWidth: 0 }}>
          {['about', 'projects', 'experiences', 'awards', 'contact'].map((id) => (
            <button
              key={id}
              onClick={(e) => handleNavClick(e, id)}
              className="nav-btn"
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
            >
              {id}
              <span className="nav-underline" />
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
