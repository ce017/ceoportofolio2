'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import CodeBackground from '@/components/CodeBackground'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Subtle fade-out of the scroll cue as user scrolls
    gsap.to(scrollCueRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '40% top',
        scrub: true,
      },
    })
  })

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      <CodeBackground />

      <div
        ref={scrollCueRef}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '40px',
          transform: 'translateX(-50%)',
          color: '#666',
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono), monospace',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span>scroll</span>
        <span style={{ fontSize: '14px', animation: 'scroll-bob 1.6s ease-in-out infinite' }}>↓</span>
      </div>

      <style>{`
        @keyframes scroll-bob {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
