'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { usePresence } from '@/hooks/usePresence'
import { ACCENTS, type Activity, type ActivityKind } from '@/data/presence'

/* --------------------------------------------------------------- formatting */

function elapsed(sinceMs: number): string {
  const secs = Math.max(0, Math.floor((Date.now() - sinceMs) / 1000))
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${secs}s`
}

function clock(ms: number): string {
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/* --------------------------------------------------------------------- icons */

function Icon({ kind }: { kind: ActivityKind }) {
  const c = ACCENTS[kind]
  if (kind === 'spotify') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill={c} aria-hidden>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.871 7.077-.496 9.712 1.115.293.18.386.563.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 11-.452-1.492c3.632-1.102 8.147-.568 11.232 1.329a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.815 9.375 8.641 6.412 9.54a.935.935 0 11-.542-1.79c3.4-1.031 9.272-.832 12.93 1.342a.935.935 0 11-.955 1.607z" />
      </svg>
    )
  }
  if (kind === 'roblox') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="1.6" stroke={c} strokeWidth="1.8" />
        <rect x="9" y="9" width="6" height="6" rx="0.6" fill={c} />
      </svg>
    )
  }
  if (kind === 'claude') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" aria-hidden>
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'github') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill={c} aria-hidden>
        <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.09.68-.22.68-.49 0-.24-.01-.89-.01-1.74-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0022 12.23C22 6.58 17.52 2 12 2z" />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
}

/* ---------------------------------------------------------------------- card */

function Card({ a }: { a: Activity }) {
  const accent = ACCENTS[a.kind]
  const isIdle = a.kind === 'idle'

  // Spotify progress bar
  let pct: number | null = null
  if (a.since && a.until && a.until > a.since) {
    pct = Math.min(100, Math.max(0, ((Date.now() - a.since) / (a.until - a.since)) * 100))
  }

  const inner = (
    <>
      <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
        {a.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={a.imageUrl}
            alt=""
            width={38}
            height={38}
            style={{ width: 38, height: 38, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <span style={{
            width: 38, height: 38, borderRadius: 4, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#141414', border: '1px solid #222',
          }}>
            <Icon kind={a.kind} />
          </span>
        )}

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            color: isIdle ? '#5c5c5c' : '#e9e9e9',
            fontSize: 10.5, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0,
              boxShadow: isIdle ? 'none' : `0 0 6px ${accent}`,
            }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {a.title}
            </span>
          </div>

          {a.detail && (
            <div
              title={a.detail}
              style={{
                color: '#ffffff', fontSize: 12, marginTop: 3, lineHeight: 1.35,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}
            >
              {a.detail}
            </div>
          )}

          {a.sub && (
            <div style={{
              color: '#8a8a8a', fontSize: 10.5, marginTop: 1,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {a.sub}
            </div>
          )}

          {a.since && (
            <div style={{ color: '#6f6f6f', fontSize: 10, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>
              {a.ago ? `${elapsed(a.since)} ago` : `since ${clock(a.since)} · ${elapsed(a.since)}`}
            </div>
          )}
        </div>
      </div>

      {pct !== null && (
        <div style={{ height: 2, background: '#1e1e1e', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: accent, borderRadius: 2 }} />
        </div>
      )}
    </>
  )

  const style: React.CSSProperties = {
    display: 'block',
    background: 'rgba(13,13,13,0.82)',
    border: '1px solid #1f1f1f',
    borderLeft: `2px solid ${accent}`,
    borderRadius: 7,
    padding: '9px 11px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    textDecoration: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  }

  if (a.href) {
    return (
      <a
        className="act-card"
        href={a.href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,20,20,0.92)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(13,13,13,0.82)' }}
      >
        {inner}
      </a>
    )
  }
  return <div className="act-card" style={style}>{inner}</div>
}

/* -------------------------------------------------------------------- widget */

export default function ActivityWidget() {
  const activities = usePresence()
  const wrapRef = useRef<HTMLDivElement>(null)
  const shown = activities.length > 0
    ? activities
    : [{ key: 'idle', kind: 'idle' as const, title: 'Idle', detail: 'Nothing right now' }]

  // Slide each card in the first time its key shows up, and forget keys that go
  // away so the animation replays if the activity comes back later.
  const seen = useRef(new Set<string>())
  const keySig = shown.map((a) => a.key).join(',')
  useEffect(() => {
    const cards = wrapRef.current?.querySelectorAll<HTMLElement>('.act-card-wrap')
    const live = new Set<string>()
    cards?.forEach((el) => {
      const k = el.dataset.key ?? ''
      live.add(k)
      if (seen.current.has(k)) return
      seen.current.add(k)
      gsap.from(el, { x: -14, opacity: 0, duration: 0.45, ease: 'power2.out' })
    })
    seen.current.forEach((k) => { if (!live.has(k)) seen.current.delete(k) })
  }, [keySig])

  return (
    <>
      <style>{`
        .act-widget {
          position: fixed;
          top: 72px;
          left: 24px;
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 236px;
          pointer-events: none;
        }
        .act-widget > * { pointer-events: auto; }
        @media (max-width: 900px) {
          .act-widget { width: 200px; left: 14px; top: 64px; }
        }
        /* Below this the fixed overlay would sit on top of the content it is
           meant to decorate, so it steps out of the way. */
        @media (max-width: 620px) {
          .act-widget { display: none; }
        }
      `}</style>

      <div className="act-widget" ref={wrapRef} aria-label="Current activity">
        {shown.map((a) => (
          <div key={a.key} data-key={a.key} className="act-card-wrap">
            <Card a={a} />
          </div>
        ))}
      </div>
    </>
  )
}
