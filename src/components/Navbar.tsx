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
