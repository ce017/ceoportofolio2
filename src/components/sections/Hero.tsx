'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
})

const AsciiText = dynamic(
  () => import('@/components/reactbits/AsciiText/AsciiText'),
  { ssr: false, loading: () => null }
)

import BlurText from '@/components/reactbits/BlurText/BlurText'
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark'

const SPLINE_SCENE = 'YOUR_SPLINE_SCENE_URL'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
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
    document.getElementById('projects')?.scrollIntoView()
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
        <div style={{ width: '100%', maxWidth: '600px', height: '120px', position: 'relative' }}>
          <AsciiText
            text="YOUR NAME"
            enableWaves={true}
            asciiFontSize={8}
            textFontSize={140}
            textColor="#ffffff"
            planeBaseHeight={6}
          />
        </div>

        {/* BlurText has no style prop — wrap in a div to apply custom styling */}
        <div
          style={{
            fontSize: '14px',
            letterSpacing: '0.3em',
            color: '#666666',
            textTransform: 'uppercase',
          }}
        >
          <BlurText
            text="Roblox Creator"
            delay={80}
            animateBy="words"
          />
        </div>

        {/* ClickSpark renders a 100%/100% div wrapper — give it an explicit size */}
        <div style={{ marginTop: '12px', display: 'inline-block' }}>
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
      </div>
    </section>
  )
}
