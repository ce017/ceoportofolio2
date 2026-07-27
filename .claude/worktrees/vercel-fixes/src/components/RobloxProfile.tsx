'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface RobloxData {
  displayName: string
  username: string
  avatarUrl: string | null
  profileUrl: string
  created?: string
}

export default function RobloxProfile() {
  const [data, setData] = useState<RobloxData | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/roblox')
      .then((r) => r.json())
      .then((d) => { if (active) setData(d) })
      .catch(() => {})
    return () => { active = false }
  }, [])

  if (!data) {
    return (
      <div
        style={{
          border: '1px solid #1f1f1f',
          background: '#0d0d0d',
          borderRadius: '8px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minHeight: '70px',
        }}
      >
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#1a1a1a' }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: '110px', height: '12px', background: '#1a1a1a', borderRadius: '3px', marginBottom: '6px' }} />
          <div style={{ width: '80px', height: '10px', background: '#161616', borderRadius: '3px' }} />
        </div>
      </div>
    )
  }

  return (
    <a
      href={data.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? '#333' : '#1f1f1f'}`,
        background: hovered ? '#101010' : '#0d0d0d',
        borderRadius: '8px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#1a1a1a',
          flexShrink: 0,
        }}
      >
        {data.avatarUrl && (
          <Image
            src={data.avatarUrl}
            alt={data.displayName}
            fill
            sizes="44px"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 500 }}>
            {data.displayName}
          </span>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.15em',
            color: '#666',
            border: '1px solid #2a2a2a',
            padding: '1px 5px',
            borderRadius: '3px',
            textTransform: 'uppercase',
          }}>
            Roblox
          </span>
        </div>
        <div style={{ color: '#888', fontSize: '11px' }}>
          @{data.username}
        </div>
      </div>
      <span style={{ color: hovered ? '#fff' : '#555', fontSize: '12px', transition: 'color 0.2s' }}>↗</span>
    </a>
  )
}
