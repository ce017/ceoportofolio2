'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'

// The profile README's art is generated into the ce017/ce017 repo and refreshed
// daily by a workflow, so pointing at raw keeps this embed live rather than a copy.
const RAW = 'https://raw.githubusercontent.com/ce017/ce017/main'
const PROFILE = 'https://github.com/ce017'

const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function Prompt({ cmd }: { cmd: string }) {
  return (
    <div
      className="gh-item"
      style={{
        marginBottom: '14px',
        fontFamily: mono,
        fontSize: '12px',
        color: '#7d8590',
        letterSpacing: '0.02em',
      }}
    >
      <span style={{ color: '#3d6fa5' }}>ce017@github</span>
      <span style={{ color: '#4a5058' }}> ~ $ </span>
      {cmd}
    </div>
  )
}

export default function Github() {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = contentRef.current?.querySelectorAll<HTMLElement>('.gh-item')
    if (!items || items.length === 0) return
    gsap.from(items, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
    })
  })

  return (
    <section id="github" style={{ padding: '120px 32px', background: '#0a0a0a' }}>
      <style>{`
        .gh-split {
          display: grid;
          grid-template-columns: 322fr 538fr;
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 720px) {
          .gh-split { grid-template-columns: 1fr; }
        }
        .gh-art {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#aaaaaa',
          textTransform: 'uppercase' as const,
        }}>
          <BlurText text="GitHub" delay={60} animateBy="characters" className="" />
        </div>

        <div ref={contentRef} style={{ maxWidth: '880px', margin: '0 auto' }}>
          {/* Header row — mirrors the project header treatment */}
          <div
            className="gh-item"
            style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
              justifyContent: 'space-between', gap: '20px',
              marginBottom: '36px', borderBottom: '1px solid #222', paddingBottom: '16px',
            }}
          >
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '26px', fontWeight: 500, letterSpacing: '0.01em' }}>
                @ce017
              </h3>
              <p style={{ color: '#888', fontSize: '13px', marginTop: '6px' }}>
                My profile README — the contribution graph regenerates itself every day.
              </p>
            </div>
            <a
              href={PROFILE}
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
              View on GitHub ↗
            </a>
          </div>

          <Prompt cmd="./contributions.sh" />
          <a
            className="gh-item"
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', marginBottom: '48px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="gh-art"
              src={`${RAW}/contrib-heatmap.svg`}
              alt="ce017's GitHub contribution graph, refreshed daily"
              width={869}
              height={265}
              loading="lazy"
            />
          </a>

          <Prompt cmd="whoami" />
          <div className="gh-split gh-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="gh-art"
              src={`${RAW}/ascii-portrait.svg`}
              alt="Braille art portrait of a lion"
              width={640}
              height={1040}
              loading="lazy"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="gh-art"
              src={`${RAW}/info-card.svg`}
              alt="ce017 — stack, links and highlights"
              width={480}
              height={468}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
