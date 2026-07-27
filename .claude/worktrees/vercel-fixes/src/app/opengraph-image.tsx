import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ceo — Roblox builder, scripter, community manager'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Subtle dotted backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Logo "17" pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              background: '#0a0a0a',
              border: '2px solid #ffffff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            17
          </div>
          <div
            style={{
              fontSize: '18px',
              letterSpacing: '0.4em',
              color: '#888888',
              textTransform: 'uppercase',
            }}
          >
            portfolio
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '92px',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-2px',
            }}
          >
            Ceo
          </div>
          <div
            style={{
              fontSize: '26px',
              color: '#aaaaaa',
              marginTop: '20px',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Roblox builder · scripter · graphic artist · community manager
          </div>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '28px',
              fontSize: '18px',
              color: '#666666',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <span>5+ Years</span>
            <span>·</span>
            <span>56K Community</span>
            <span>·</span>
            <span>10+ Groups Led</span>
          </div>
        </div>

        {/* Bottom corner accent */}
        <div
          style={{
            position: 'absolute',
            right: '80px',
            top: '80px',
            fontSize: '14px',
            letterSpacing: '0.3em',
            color: '#444444',
          }}
        >
          ce-17.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
