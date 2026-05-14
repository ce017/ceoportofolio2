'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Professional from '@/components/sections/Professional'
import Experiences from '@/components/sections/Experiences'
import Awards from '@/components/sections/Awards'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)

  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <About />
      <Projects />
      <Professional />
      <Experiences />
      <Awards />
      <Contact />
      <Footer />
    </main>
  )
}
