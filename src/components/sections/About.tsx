'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'

export default function About() {
  const paragraphsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const paras = paragraphsRef.current?.querySelectorAll<HTMLElement>('p')
    if (!paras || paras.length === 0) return

    gsap.from(paras, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: paragraphsRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  })

  return (
    <section
      id="about"
      style={{
        padding: '120px 32px',
        background: '#0a0a0a',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <BlurText
            text="About"
            delay={60}
            animateBy="characters"
            className=""
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '200px',
              height: '240px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #222',
              background: '#111',
              flexShrink: 0,
            }}
          >
            <Image
              src="/about/photo.jpg"
              alt="Profile photo"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div ref={paragraphsRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ color: '#fff', fontSize: '15px', lineHeight: 1.8 }}>
              Hi — I&apos;m Your Name. I build things on Roblox and spend a lot of time online.
            </p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8 }}>
              I started creating on Roblox and have built various projects since then.
            </p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8 }}>
              This portfolio is a mix of the digital and the real.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
