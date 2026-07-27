'use client'

import { useEffect, useRef } from 'react'

const FRAGMENTS = [
  'local player =', 'workspace:FindFirstChild', 'function onTouched(hit)',
  'game.Players', 'Vector3.new(0,', 'CFrame.new(', 'math.random(1,',
  'if hit.Parent then', 'end)', 'return true', 'Instance.new("Part")',
  'script.Parent', ':FireServer()', 'RemoteEvent', 'table.insert(',
  'pcall(function()', 'for i = 1, #', 'string.format(', 'task.wait(0.',
  '-- Kronos', 'game:GetService(', 'Players.LocalPlayer', ':WaitForChild(',
  'UDim2.new(0,', 'Color3.fromRGB(', 'TweenService:Create(', 'RunService',
  '{ 0xFF,', '0x1A,', 'local _G =', '[[deprecated]]', 'Enum.KeyCode.',
]

interface Stream {
  x: number
  y: number
  speed: number
  opacity: number
  text: string
  fontSize: number
}

export default function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let streams: Stream[] = []

    const randomStream = (width: number, height: number, randomY = true): Stream => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 40,
      speed: 0.18 + Math.random() * 0.28,
      opacity: 0.04 + Math.random() * 0.09,
      text: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
      fontSize: 10 + Math.floor(Math.random() * 3),
    })

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.max(18, Math.floor(window.innerWidth / 80))
      streams = Array.from({ length: count }, () =>
        randomStream(canvas.width, canvas.height)
      )
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of streams) {
        ctx.font = `${s.fontSize}px "Geist Mono", "Courier New", monospace`
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`
        ctx.fillText(s.text, s.x, s.y)

        s.y -= s.speed
        if (s.y < -20) {
          Object.assign(s, randomStream(canvas.width, canvas.height, false))
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
