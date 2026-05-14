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
        padding: '200px 32px 120px',
        background: '#0a0a0a',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#888888',
          textTransform: 'uppercase' as const,
        }}>
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
            gridTemplateColumns: '160px 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid #222',
              background: '#111',
              flexShrink: 0,
            }}
          >
            <Image
              src="https://i.ibb.co/k6SjzLzL/immagine-2026-02-19-173630960.png"
              alt="Ceo"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>

          <div ref={paragraphsRef} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ color: '#ffffff', fontSize: '15px', lineHeight: 1.8 }}>
              Hi, I&apos;m Ceo. I&apos;m a Roblox builder, graphic artist, scripter, and community manager who has spent years building large-scale environments and leading military communities on the platform.
            </p>
            <p style={{ color: '#aaaaaa', fontSize: '14px', lineHeight: 1.8 }}>
              I&apos;ve built leadership, communication, collaboration, and teamwork skills from courses I took at a research center in Northern Italy. Working on group projects helped me learn how to manage tasks, lead, and communicate effectively.
            </p>
            <p style={{ color: '#aaaaaa', fontSize: '14px', lineHeight: 1.8 }}>
              As a builder, I&apos;ve worked on whole maps for RP groups, army groups, hangout games, and real-life games — specialising in realistic buildings using my own assets. As a graphic artist I&apos;ve made gamepass logos, division logos, restaurant menus, propaganda, and all kinds of graphic design work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
