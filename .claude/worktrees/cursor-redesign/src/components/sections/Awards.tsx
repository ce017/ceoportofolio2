'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import { awards } from '@/data/awards'

const MedalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15l-3.5 7L12 19l3.5 3L12 15z" />
    <circle cx="12" cy="9" r="6" />
  </svg>
)

const RibbonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2v8l6 6 6-6V2" />
    <path d="M12 16v6" />
  </svg>
)

export default function Awards() {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = contentRef.current?.querySelectorAll<HTMLElement>('.award-item')
    if (!items || items.length === 0) return
    gsap.from(items, {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.02,
      scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
    })
  })

  return (
    <section id="awards" style={{ padding: '120px 32px', background: '#0d0d0d' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#aaaaaa',
          textTransform: 'uppercase' as const,
        }}>
          <BlurText text="Awards & Decorations" delay={50} animateBy="characters" className="" />
        </div>

        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {awards.map((branch) => (
            <div key={branch.branch}>
              <h3 className="award-item" style={{
                color: '#ffffff', fontSize: '20px', fontWeight: 500,
                marginBottom: '24px', borderBottom: '1px solid #222',
                paddingBottom: '12px', letterSpacing: '0.05em',
              }}>
                {branch.branch}
              </h3>

              {/* Badges */}
              <div style={{ marginBottom: '32px' }}>
                <div className="award-item" style={{
                  color: '#888888', fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginBottom: '14px',
                }}>
                  Badges
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '8px 24px',
                }}>
                  {branch.badges.map((badge) => (
                    <div key={badge} className="award-item" style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      color: '#cccccc', fontSize: '13px',
                    }}>
                      <span style={{ color: '#888', flexShrink: 0, display: 'flex' }}>
                        <MedalIcon />
                      </span>
                      {badge}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ribbons */}
              <div>
                <div className="award-item" style={{
                  color: '#888888', fontSize: '11px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', marginBottom: '14px',
                }}>
                  Ribbons
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '8px 24px',
                }}>
                  {branch.ribbons.map((ribbon) => (
                    <div key={ribbon} className="award-item" style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      color: '#cccccc', fontSize: '13px',
                    }}>
                      <span style={{ color: '#888', flexShrink: 0, display: 'flex' }}>
                        <RibbonIcon />
                      </span>
                      {ribbon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
