'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import { developerRoles, communityRoles } from '@/data/professional'

export default function Professional() {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = contentRef.current?.querySelectorAll<HTMLElement>('.prof-item')
    if (!items || items.length === 0) return
    gsap.from(items, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: { trigger: contentRef.current, start: 'top 75%', once: true },
    })
  })

  return (
    <section id="professional" style={{ padding: '120px 32px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#aaaaaa',
          textTransform: 'uppercase' as const,
        }}>
          <BlurText text="Professional Experience" delay={50} animateBy="characters" className="" />
        </div>

        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {/* Developer */}
          <div>
            <h3 className="prof-item" style={{
              color: '#ffffff', fontSize: '20px', fontWeight: 500,
              marginBottom: '24px', borderBottom: '1px solid #222', paddingBottom: '12px',
            }}>
              Developer
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {developerRoles.map((role) => (
                <div key={role.title} className="prof-item">
                  <div style={{
                    color: '#ffffff', fontSize: '14px', fontWeight: 600,
                    marginBottom: '6px', letterSpacing: '0.02em',
                  }}>
                    {role.title}
                  </div>
                  <p style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: 1.75 }}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Management */}
          <div>
            <h3 className="prof-item" style={{
              color: '#ffffff', fontSize: '20px', fontWeight: 500,
              marginBottom: '24px', borderBottom: '1px solid #222', paddingBottom: '12px',
            }}>
              Community Management & Staff
            </h3>
            <p className="prof-item" style={{ color: '#bbbbbb', fontSize: '14px', lineHeight: 1.75, marginBottom: '20px' }}>
              I have been high-ranking staff in lots of big communities (1k+ active members) — Roblox RP communities, Roblox armies, developing studios, shops, hangouts, and game communities. Some examples:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {communityRoles.map((role) => (
                <li key={role} className="prof-item" style={{
                  color: '#cccccc', fontSize: '13px', lineHeight: 1.6,
                  paddingLeft: '16px', position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: '9px',
                    width: '6px', height: '1px', background: '#666',
                  }} />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
