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
    if (!entries || entries.length === 0) return

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
      style={{ padding: '120px 32px', background: '#0d0d0d' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#aaaaaa',
          textTransform: 'uppercase' as const,
        }}>
          <BlurText text="Experiences" delay={60} animateBy="characters" className="" />
        </div>

        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', maxWidth: '720px' }}>
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="exp-entry"
              style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr',
                gap: '24px',
                paddingBottom: i < experiences.length - 1 ? '48px' : '0',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#555', flexShrink: 0 }} />
                {i < experiences.length - 1 && (
                  <div style={{ width: '1px', flex: 1, background: '#222', marginTop: '6px' }} />
                )}
              </div>

              <div>
                <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
                  {exp.title}
                </h3>
                <div style={{ color: '#777', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {exp.dateRange}
                </div>
                <p style={{ color: '#bbbbbb', fontSize: '13px', lineHeight: 1.75, marginBottom: '16px' }}>
                  {exp.description}
                </p>

                {exp.roles.map((group) => (
                  <div key={group.group} style={{ marginBottom: '12px' }}>
                    <div style={{
                      color: '#888888',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}>
                      {group.group}
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {group.items.map((item) => (
                        <li
                          key={item}
                          style={{
                            color: '#aaaaaa',
                            fontSize: '13px',
                            lineHeight: 1.65,
                            paddingLeft: '14px',
                            position: 'relative',
                            marginBottom: '3px',
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            top: '9px',
                            width: '5px',
                            height: '1px',
                            background: '#444',
                          }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {exp.links && exp.links.length > 0 && (
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                    {exp.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#777',
                          fontSize: '11px',
                          letterSpacing: '0.1em',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ccc')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#777')}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
