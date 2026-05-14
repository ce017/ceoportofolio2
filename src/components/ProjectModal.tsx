'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ClickSpark from '@/components/reactbits/ClickSpark/ClickSpark'
import { Project } from '@/data/projects'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setSelected((i) => Math.min(i + 1, project.images.length - 1))
      if (e.key === 'ArrowLeft') setSelected((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, project.images.length])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          borderBottom: '1px solid #1f1f1f',
          flexShrink: 0,
        }}
      >
        <div>
          <h2 style={{ color: '#fff', fontSize: '17px', fontWeight: 500, marginBottom: '3px' }}>
            {project.title}
          </h2>
          <p style={{ color: '#666', fontSize: '12px' }}>
            {selected + 1} / {project.images.length} — use ← → or click thumbnails
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {project.link && (
            <ClickSpark sparkColor="#ffffff" sparkSize={6} sparkRadius={30} sparkCount={8} duration={400}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  color: '#0a0a0a',
                  background: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ddd'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff'
                }}
              >
                View on Roblox ↗
              </a>
            </ClickSpark>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '22px',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '4px 8px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 72px',
          minHeight: 0,
        }}
      >
        <button
          onClick={() => setSelected((i) => Math.max(i - 1, 0))}
          disabled={selected === 0}
          style={{
            position: 'absolute',
            left: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid #222',
            borderRadius: '4px',
            color: selected === 0 ? '#333' : '#aaa',
            fontSize: '20px',
            cursor: selected === 0 ? 'default' : 'pointer',
            padding: '8px 14px',
            transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => { if (selected > 0) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' } }}
          onMouseLeave={(e) => { if (selected > 0) { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' } }}
        >
          ←
        </button>

        <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '960px' }}>
          <Image
            key={project.images[selected]}
            src={project.images[selected]}
            alt={`${project.title} screenshot ${selected + 1}`}
            fill
            style={{ objectFit: 'contain' }}
            sizes="960px"
            unoptimized
          />
        </div>

        <button
          onClick={() => setSelected((i) => Math.min(i + 1, project.images.length - 1))}
          disabled={selected === project.images.length - 1}
          style={{
            position: 'absolute',
            right: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid #222',
            borderRadius: '4px',
            color: selected === project.images.length - 1 ? '#333' : '#aaa',
            fontSize: '20px',
            cursor: selected === project.images.length - 1 ? 'default' : 'pointer',
            padding: '8px 14px',
            transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => { if (selected < project.images.length - 1) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' } }}
          onMouseLeave={(e) => { if (selected < project.images.length - 1) { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' } }}
        >
          →
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          gap: '6px',
          padding: '12px 32px',
          overflowX: 'auto',
          borderTop: '1px solid #1f1f1f',
          flexShrink: 0,
        }}
      >
        {project.images.map((img, i) => (
          <div
            key={img}
            onClick={() => setSelected(i)}
            style={{
              position: 'relative',
              width: '72px',
              height: '48px',
              flexShrink: 0,
              borderRadius: '4px',
              overflow: 'hidden',
              border: `1px solid ${i === selected ? '#888' : '#222'}`,
              cursor: 'pointer',
              opacity: i === selected ? 1 : 0.45,
              transition: 'opacity 0.15s, border-color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = i === selected ? '1' : '0.45' }}
          >
            <Image
              src={img}
              alt={`thumbnail ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="72px"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}
