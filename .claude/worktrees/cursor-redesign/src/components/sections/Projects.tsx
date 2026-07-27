'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import { projects } from '@/data/projects'

interface LightboxState {
  projectIdx: number
  imageIdx: number
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  useGSAP(() => {
    // Per-image scroll trigger
    const imgs = sectionRef.current?.querySelectorAll<HTMLElement>('.gallery-img')
    imgs?.forEach((img) => {
      gsap.from(img, {
        y: 50,
        opacity: 0,
        scale: 0.94,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: img, start: 'top 92%', once: true },
      })
    })

    // Project header + subsection titles
    const headers = sectionRef.current?.querySelectorAll<HTMLElement>('.project-header, .subsection-header')
    headers?.forEach((header) => {
      gsap.from(header, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: header, start: 'top 88%', once: true },
      })
    })
  })

  useEffect(() => {
    if (!lightbox) return
    const allImages = projects[lightbox.projectIdx].subsections.flatMap((s) => s.images)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight' && lightbox.imageIdx < allImages.length - 1) {
        setLightbox({ ...lightbox, imageIdx: lightbox.imageIdx + 1 })
      }
      if (e.key === 'ArrowLeft' && lightbox.imageIdx > 0) {
        setLightbox({ ...lightbox, imageIdx: lightbox.imageIdx - 1 })
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  const lightboxImages = lightbox ? projects[lightbox.projectIdx].subsections.flatMap((s) => s.images) : []

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ padding: '120px 32px', background: '#0d0d0d' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#aaaaaa',
          textTransform: 'uppercase' as const,
        }}>
          <BlurText text="My Work Portfolio" delay={50} animateBy="characters" className="" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {projects.map((project, pIdx) => {
            // Compute starting flat index for each subsection (for lightbox)
            const subOffsets = project.subsections.map((_, i) =>
              project.subsections.slice(0, i).reduce((sum, s) => sum + s.images.length, 0)
            )

            return (
              <div key={project.id}>
                {/* Project header */}
                <div className="project-header" style={{
                  display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
                  justifyContent: 'space-between', gap: '20px',
                  marginBottom: '36px', borderBottom: '1px solid #222', paddingBottom: '16px',
                }}>
                  <h3 style={{ color: '#ffffff', fontSize: '26px', fontWeight: 500, letterSpacing: '0.01em' }}>
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flexShrink: 0,
                        display: 'inline-block',
                        color: '#0a0a0a',
                        background: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '11px 22px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#ddd' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff' }}
                    >
                      Visit on Roblox ↗
                    </a>
                  )}
                </div>

                {/* Subsections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                  {project.subsections.map((sub, sIdx) => (
                    <div key={sIdx}>
                      {sub.title && (
                        <div className="subsection-header" style={{
                          marginBottom: '20px',
                          fontSize: '12px',
                          letterSpacing: '0.25em',
                          color: '#888888',
                          textTransform: 'uppercase',
                        }}>
                          {sub.title}
                        </div>
                      )}

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '12px',
                      }}>
                        {sub.images.map((img, iIdx) => {
                          const flatIdx = subOffsets[sIdx] + iIdx
                          return (
                            <div
                              key={img}
                              className="gallery-img"
                              onClick={() => setLightbox({ projectIdx: pIdx, imageIdx: flatIdx })}
                              style={{
                                position: 'relative',
                                aspectRatio: '16/9',
                                overflow: 'hidden',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: '#111',
                                border: '1px solid #1a1a1a',
                                transition: 'transform 0.25s ease, border-color 0.25s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.borderColor = '#444'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.borderColor = '#1a1a1a'
                              }}
                            >
                              <Image
                                src={img}
                                alt={`${project.title} ${iIdx + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                unoptimized
                                priority={pIdx === 0 && sIdx === 0 && iIdx < 6}
                                loading={pIdx === 0 && sIdx === 0 && iIdx < 6 ? 'eager' : 'lazy'}
                              />
                            </div>
                          )
                        })}
                      </div>

                      {sub.note && (
                        <p style={{
                          marginTop: '14px',
                          color: '#888888',
                          fontSize: '12px',
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                        }}>
                          <span style={{ color: '#666', flexShrink: 0 }}>ⓘ</span>
                          {sub.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 28px', borderBottom: '1px solid #1f1f1f',
            }}
          >
            <div>
              <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 500 }}>
                {projects[lightbox.projectIdx].title}
              </h4>
              <p style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>
                {lightbox.imageIdx + 1} / {lightboxImages.length} — use ← → or Escape
              </p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                background: 'none', border: 'none', color: '#888',
                fontSize: '20px', cursor: 'pointer', padding: '6px 10px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
            >
              ✕
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px 72px', minHeight: 0,
            }}
          >
            {lightbox.imageIdx > 0 && (
              <button
                onClick={() => setLightbox({ ...lightbox, imageIdx: lightbox.imageIdx - 1 })}
                style={{
                  position: 'absolute', left: '20px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid #2a2a2a',
                  color: '#bbb', fontSize: '20px', padding: '10px 16px', cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                ←
              </button>
            )}
            <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1100px' }}>
              <Image
                key={lightboxImages[lightbox.imageIdx]}
                src={lightboxImages[lightbox.imageIdx]}
                alt="enlarged"
                fill
                style={{ objectFit: 'contain' }}
                sizes="1100px"
                unoptimized
              />
            </div>
            {lightbox.imageIdx < lightboxImages.length - 1 && (
              <button
                onClick={() => setLightbox({ ...lightbox, imageIdx: lightbox.imageIdx + 1 })}
                style={{
                  position: 'absolute', right: '20px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid #2a2a2a',
                  color: '#bbb', fontSize: '20px', padding: '10px 16px', cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
