'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import BlurText from '@/components/reactbits/BlurText/BlurText'
import GlassSurface from '@/components/reactbits/GlassSurface/GlassSurface'
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark'

const contactLinks = [
  { label: 'Discord', value: 'yourhandle', href: 'https://discord.com/users/YOUR_ID' },
  { label: 'Email', value: 'you@email.com', href: 'mailto:you@email.com' },
  { label: 'Roblox', value: 'YourRobloxName', href: 'https://www.roblox.com/users/YOUR_ID/profile' },
]

export default function Contact() {
  const linksRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = linksRef.current?.querySelectorAll<HTMLElement>('.contact-item')
    if (!items || items.length === 0) return

    gsap.from(items, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: linksRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  })

  return (
    <section
      id="contact"
      style={{
        padding: '120px 32px',
        background: '#0a0a0a',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          marginBottom: '48px',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#555555',
          textTransform: 'uppercase' as const,
        }}>
          <BlurText
            text="Contact"
            delay={60}
            animateBy="characters"
            className=""
          />
        </div>

        <div
          ref={linksRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '480px',
          }}
        >
          {contactLinks.map((link) => (
            <div key={link.label} className="contact-item">
              <ClickSpark
                sparkColor="#ffffff"
                sparkSize={8}
                sparkRadius={20}
                sparkCount={8}
                duration={400}
              >
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <GlassSurface
                    width="100%"
                    height={72}
                    borderRadius={8}
                    brightness={30}
                    opacity={0.85}
                    blur={8}
                    backgroundOpacity={0.05}
                    className=""
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        height: '100%',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: '#444',
                            fontSize: '10px',
                            letterSpacing: '0.12em',
                            marginBottom: '4px',
                          }}
                        >
                          {link.label}
                        </div>
                        <div
                          style={{
                            color: '#fff',
                            fontSize: '14px',
                          }}
                        >
                          {link.value}
                        </div>
                      </div>
                      <span style={{ color: '#444', fontSize: '16px' }}>↗</span>
                    </div>
                  </GlassSurface>
                </a>
              </ClickSpark>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
