'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()
  const targetName = (pathname || '/').slice(1) || 'missing-page'
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily:
          '"Cascadia Code", "Cascadia Mono", Consolas, var(--font-geist-mono), "Courier New", monospace',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          background: '#0c0c0c',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.02) inset',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            background: '#1f1f1f',
            paddingTop: '4px',
            height: '36px',
            borderBottom: '1px solid #2a2a2a',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 10px',
              height: '32px',
              background: '#0c0c0c',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              minWidth: '220px',
              maxWidth: '260px',
              borderTop: '2px solid #ff4d4d',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                background: '#7a0019',
                color: '#fff',
                fontSize: '9px',
                fontWeight: 700,
                borderRadius: '2px',
              }}
            >
              !
            </span>
            <span style={{ fontSize: '12px', color: '#ffffff' }}>
              error.exe
            </span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <span
              style={{
                width: '46px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '13px',
              }}
            >
              ─
            </span>
            <span
              style={{
                width: '46px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '13px',
              }}
            >
              ▢
            </span>
            <span
              style={{
                width: '46px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '13px',
              }}
            >
              ✕
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '24px 22px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            color: '#cccccc',
            fontSize: '13px',
            lineHeight: 1.6,
          }}
        >
          <div style={{ color: '#888' }}>PS C:\Users\Ceo&gt; cd .\{targetName}</div>

          <div style={{ color: '#ff5e5e' }}>
            cd : Cannot find path because it does not exist.
          </div>
          <div style={{ color: '#ff5e5e', marginLeft: '20px' }}>
            At line:1 char:1
          </div>
          <div style={{ color: '#ff5e5e', marginLeft: '20px' }}>
            + CategoryInfo : ObjectNotFound: [404]
          </div>
          <div style={{ color: '#ff5e5e', marginLeft: '20px' }}>
            + FullyQualifiedErrorId : PathNotFound
          </div>

          <pre
            style={{
              margin: '8px 0',
              color: '#ffffff',
              fontSize: 'clamp(14px, 3vw, 26px)',
              lineHeight: 1.1,
              whiteSpace: 'pre',
              textShadow: '0 0 12px rgba(255,90,90,0.45)',
            }}
          >
{` ██   ██   ██████   ██   ██
 ██   ██  ██    ██  ██   ██
 ███████  ██    ██  ███████
      ██  ██    ██       ██
      ██   ██████        ██`}
          </pre>

          <div style={{ color: '#888' }}>
            the requested page could not be located on this server.
          </div>

          <div style={{ marginTop: '14px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                fontFamily: 'inherit',
                background: 'transparent',
                border: '1px solid #555',
                color: '#ccc',
                padding: '8px 22px',
                fontSize: '12px',
                letterSpacing: '0.25em',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#aaa'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#555'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ccc'
              }}
            >
              [ cd .. ]
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
