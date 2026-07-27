'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { CEO_ASCII } from '@/lib/ascii'

type Phase = 'init' | 'ready' | 'typing' | 'response' | 'closing'

const AUTH_MSG = "# session authentication required — type 'enter' to continue"
const PROMPT_PREFIX = 'PS C:\\Users\\Ceo>'

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('init')
  const phaseRef = useRef<Phase>('init')
  phaseRef.current = phase
  const [authTyped, setAuthTyped] = useState('')
  const [promptTyped, setPromptTyped] = useState('')
  const [inputTyped, setInputTyped] = useState('')

  // Choreographed typing sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    const typeString = (
      str: string,
      setter: (s: string) => void,
      speed: number,
      onDone?: () => void
    ) => {
      let i = 0
      const tick = () => {
        i++
        setter(str.slice(0, i))
        if (i < str.length) {
          timers.push(setTimeout(tick, speed + (Math.random() * 16 - 8)))
        } else {
          onDone?.()
        }
      }
      tick()
    }

    // Start after a tiny breath
    timers.push(
      setTimeout(() => {
        typeString(AUTH_MSG, setAuthTyped, 18, () => {
          timers.push(
            setTimeout(() => {
              typeString(PROMPT_PREFIX, setPromptTyped, 26, () => {
                setPhase('ready')
              })
            }, 280)
          )
        })
      }, 350)
    )

    return () => { timers.forEach(clearTimeout) }
  }, [])

  const inputRef = useRef('')
  inputRef.current = inputTyped

  const submit = () => {
    setPhase('response')
    setTimeout(() => {
      setPhase('closing')
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power3.inOut',
        onComplete: onDone,
      })
    }, 1500)
  }

  // Button (or auto): types "enter" for the user then submits
  const runSequence = () => {
    if (phaseRef.current !== 'ready') return
    setPhase('typing')

    const word = 'enter'
    let i = inputRef.current.length
    // Clear any partial input first if it doesn't match the prefix of "enter"
    if (!word.startsWith(inputRef.current.toLowerCase())) {
      setInputTyped('')
      i = 0
    }
    const tick = () => {
      i++
      if (i <= word.length) {
        setInputTyped(word.slice(0, i))
        setTimeout(tick, 105 + Math.random() * 44)
      } else {
        setTimeout(submit, 300)
      }
    }
    tick()
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const phase = phaseRef.current
      if (phase !== 'ready') return

      if (e.key === 'Enter') {
        if (inputRef.current.toLowerCase() === 'enter') {
          e.preventDefault()
          setPhase('typing')
          submit()
        }
        // If they pressed Enter without typing "enter", ignore — they must type it
        return
      }

      if (e.key === 'Backspace') {
        e.preventDefault()
        setInputTyped(inputRef.current.slice(0, -1))
        return
      }

      // Accept single printable characters, cap length
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (inputRef.current.length >= 16) return
        e.preventDefault()
        setInputTyped(inputRef.current + e.key)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const showInputCursor = phase === 'ready' || phase === 'typing'
  const showPromptCursor = phase === 'init' && promptTyped.length < PROMPT_PREFIX.length
  const showAuthCursor = phase === 'init' && authTyped.length < AUTH_MSG.length

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Cascadia Code", "Cascadia Mono", Consolas, var(--font-geist-mono), "Courier New", monospace',
        padding: '24px',
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes pulse-twice {
          0% { opacity: 1; }
          25% { opacity: 0.25; }
          50% { opacity: 1; }
          75% { opacity: 0.25; }
          100% { opacity: 1; }
        }
        @keyframes ceo-glow {
          0%, 100% {
            color: #cccccc;
            text-shadow: 0 0 4px rgba(255,255,255,0.15);
          }
          50% {
            color: #ffffff;
            text-shadow:
              0 0 10px rgba(255,255,255,0.6),
              0 0 24px rgba(255,255,255,0.25);
          }
        }
        @keyframes ceo-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ps-cursor { animation: blink 1s steps(1) infinite; }
        .ps-response { animation: pulse-twice 1.5s ease-in-out forwards; }
        .ceo-banner-wrap {
          animation: ceo-fade-in 0.4s ease-out both;
        }
        .ceo-banner {
          animation: ceo-glow 3s ease-in-out infinite;
          color: #cccccc;
        }
        .ps-tab-close, .ps-tab-add, .ps-win-ctrl {
          background: transparent;
          border: none;
          font-family: inherit;
          color: #cccccc;
          cursor: default;
          transition: background 0.12s;
        }
        .ps-win-ctrl {
          width: 46px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        .ps-win-ctrl:hover { background: #2a2a2a; }
        .ps-win-ctrl.close:hover { background: #e81123; color: #fff; }
        .ps-tab-close {
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          font-size: 10px;
          color: #888;
          margin-left: 4px;
        }
        .ps-tab-close:hover { background: #3a3a3a; color: #fff; }
        .ps-tab-add {
          width: 28px;
          height: 28px;
          margin: 2px 4px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #aaa;
        }
        .ps-tab-add:hover { background: #2a2a2a; color: #fff; }
        .ps-enter-btn {
          align-self: flex-start;
          font-family: inherit;
          background: transparent;
          border: 1px solid #555;
          color: #ccc;
          padding: 8px 22px;
          font-size: 12px;
          letter-spacing: 0.25em;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, opacity 0.3s;
        }
        .ps-enter-btn:hover {
          border-color: #aaa;
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          background: '#0c0c0c',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.02) inset',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          background: '#1f1f1f', paddingTop: '4px',
          height: '36px', borderBottom: '1px solid #2a2a2a',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '0 10px', height: '32px', background: '#0c0c0c',
            borderTopLeftRadius: '6px', borderTopRightRadius: '6px',
            minWidth: '200px', maxWidth: '240px',
            borderTop: '2px solid #4cc2ff',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '16px', height: '16px', background: '#012456', color: '#fff',
              fontSize: '9px', fontWeight: 700, borderRadius: '2px',
            }}>
              &gt;_
            </span>
            <span style={{
              fontSize: '12px', color: '#ffffff', flex: 1,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              PowerShell
            </span>
            <button className="ps-tab-close" aria-label="close tab">✕</button>
          </div>
          <button className="ps-tab-add" aria-label="new tab">+</button>
          <div style={{ flex: 1, height: '32px' }} />
          <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <button className="ps-win-ctrl" aria-label="minimize">─</button>
            <button className="ps-win-ctrl" aria-label="maximize">▢</button>
            <button className="ps-win-ctrl close" aria-label="close">✕</button>
          </div>
        </div>

        {/* Body — all rendered from start with reserved heights */}
        <div style={{
          padding: '20px 20px 22px',
          display: 'flex', flexDirection: 'column', gap: '14px',
          color: '#cccccc', fontSize: '13px', lineHeight: 1.5,
          minHeight: '320px',
        }}>
          {/* CEO banner */}
          <div className="ceo-banner-wrap">
            <pre
              className="ceo-banner"
              style={{
                margin: 0,
                fontSize: 'clamp(8px, 1.3vw, 14px)',
                lineHeight: 1.1,
                whiteSpace: 'pre',
                fontFamily: 'inherit',
              }}
            >
              {CEO_ASCII}
            </pre>
          </div>

          {/* Auth message — typed */}
          <div style={{ color: '#888888', minHeight: '1.5em' }}>
            {authTyped}
            {showAuthCursor && <span className="ps-cursor" style={{ color: '#888' }}>▊</span>}
          </div>

          {/* Prompt line — typed */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '14px', minHeight: '1.5em', flexWrap: 'wrap',
          }}>
            <span style={{ color: '#ffffff', whiteSpace: 'pre' }}>{promptTyped}</span>
            {showPromptCursor && <span className="ps-cursor" style={{ color: '#fff' }}>▊</span>}
            {phase !== 'init' && (
              <>
                <span style={{ color: '#ffffff', marginLeft: '6px' }}>{inputTyped}</span>
                {showInputCursor && <span className="ps-cursor" style={{ color: '#fff' }}>▊</span>}
              </>
            )}
          </div>

          {/* Response or button area — reserved height so layout doesn't shift */}
          <div style={{ minHeight: '38px', display: 'flex', alignItems: 'center' }}>
            {phase === 'response' || phase === 'closing' ? (
              <div
                className="ps-response"
                style={{
                  color: '#22c55e',
                  fontSize: '14px',
                  textShadow: '0 0 18px rgba(34,197,94,0.6)',
                  letterSpacing: '0.02em',
                }}
              >
                ✓ credentials accepted
              </div>
            ) : (
              <button
                onClick={runSequence}
                className="ps-enter-btn"
                disabled={phase !== 'ready'}
                style={{
                  pointerEvents: phase === 'ready' ? 'auto' : 'none',
                  opacity: phase === 'ready' ? 1 : 0.35,
                }}
              >
                [ ENTER ]
              </button>
            )}
          </div>

          <div style={{ color: '#555', fontSize: '11px', minHeight: '1.5em' }}>
            {phase === 'ready' && "type 'enter' and press Enter, or click the button"}
          </div>
        </div>
      </div>
    </div>
  )
}
