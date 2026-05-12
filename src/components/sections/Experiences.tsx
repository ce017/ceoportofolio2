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
      style={{
        padding: '120px 32px',
        background: '#0d0d0d',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <BlurText
            text="Experiences"
            delay={60}
            animateBy="characters"
            className=""
          />
        </div>

        <div
          ref={listRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
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
      </div>
    </section>
  )
}
