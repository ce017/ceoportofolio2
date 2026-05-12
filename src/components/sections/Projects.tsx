'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import BorderGlow from '@/components/reactbits/BorderGlow/BorderGlow'
import { projects } from '@/data/projects'

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.project-card')
    if (!cards || cards.length === 0) return

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
      style={{
        padding: '120px 32px',
        background: '#0d0d0d',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <BlurText
            text="Work"
            delay={60}
            animateBy="characters"
            className=""
          />
        </div>

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
      </div>
    </section>
  )
}
