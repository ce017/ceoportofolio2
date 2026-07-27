'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  alpha: number
  phase: number
  phaseSpeed: number
  hue: number
  kind: 'star' | 'orb'
}

const STAR_COUNT = 109
const ORB_COUNT = 17
const REPEL_RADIUS = 160
const REPEL_FORCE = 0.9

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    let dpr = 1
    let particles: Particle[] = []
    const sprites = new Map<number, HTMLCanvasElement>()
    const mouse = { x: -9999, y: -9999, active: false }

    // Build a sprite for a given hue. Cached.
    const getSprite = (hue: number): HTMLCanvasElement => {
      const key = Math.round(hue)
      const cached = sprites.get(key)
      if (cached) return cached

      const s = document.createElement('canvas')
      s.width = s.height = 64
      const sctx = s.getContext('2d')!
      const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, `hsla(${hue}, 90%, 85%, 1)`)
      g.addColorStop(0.18, `hsla(${hue}, 90%, 75%, 0.75)`)
      g.addColorStop(0.45, `hsla(${hue}, 90%, 60%, 0.18)`)
      g.addColorStop(1, `hsla(${hue}, 90%, 50%, 0)`)
      sctx.fillStyle = g
      sctx.fillRect(0, 0, 64, 64)
      sprites.set(key, s)
      return s
    }

    const spawnStar = (initial = false): Particle => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 20,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(0.05 + Math.random() * 0.22),
      size: 0.5 + Math.random() * 1.6,
      baseAlpha: 0.275 + Math.random() * 0.55,
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.015 + Math.random() * 0.035,
      // Mostly white-ish (200 hue ~ pale blue) with occasional cool blue
      hue: Math.random() < 0.7 ? 210 : 195 + Math.random() * 30,
      kind: 'star',
    })

    const spawnOrb = (initial = false): Particle => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 60,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.03 + Math.random() * 0.1),
      size: 3 + Math.random() * 4.5,
      baseAlpha: 0.132 + Math.random() * 0.198,
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.004 + Math.random() * 0.012,
      // Bigger orbs lean blue/cyan
      hue: 195 + Math.random() * 40,
      kind: 'orb',
    })

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const init = () => {
      resize()
      const stars = Array.from({ length: STAR_COUNT }, () => spawnStar(true))
      const orbs = Array.from({ length: ORB_COUNT }, () => spawnOrb(true))
      particles = [...orbs, ...stars] // orbs first → drawn behind stars
    }

    init()

    const onResize = () => init()
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onMouseLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999 }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseout', onMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Cursor repel
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const distSq = dx * dx + dy * dy
          if (distSq < REPEL_RADIUS * REPEL_RADIUS && distSq > 0.01) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / REPEL_RADIUS
            // Cubic falloff: gentle at the edge, sharply stronger as cursor closes in
            const strength = t * t * t * REPEL_FORCE
            p.vx += (dx / dist) * strength
            p.vy += (dy / dist) * strength
          }
        }

        // Damping so they ease back to their drift
        p.vx *= 0.96
        p.vy *= 0.96
        // Keep baseline upward drift
        const baselineVy = p.kind === 'orb' ? -0.05 : -0.12
        p.vy += (baselineVy - p.vy) * 0.015

        p.x += p.vx
        p.y += p.vy
        p.phase += p.phaseSpeed
        p.alpha = p.baseAlpha * (0.45 + 0.55 * Math.sin(p.phase))

        const sprite = getSprite(p.hue)
        const renderSize = p.size * (p.kind === 'orb' ? 18 : 9)
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha))
        ctx.drawImage(
          sprite,
          p.x - renderSize / 2,
          p.y - renderSize / 2,
          renderSize,
          renderSize
        )

        // Recycle
        if (
          p.y < -renderSize ||
          p.x < -renderSize ||
          p.x > width + renderSize ||
          p.y > height + renderSize * 2
        ) {
          particles[i] = p.kind === 'orb' ? spawnOrb(false) : spawnStar(false)
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  )
}
