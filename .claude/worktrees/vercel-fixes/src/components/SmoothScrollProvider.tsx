'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap'
import gsap from 'gsap'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis()
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      delete window.__lenis
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return <>{children}</>
}
