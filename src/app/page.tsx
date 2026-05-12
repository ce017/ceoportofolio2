import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Projects />
      <About />
    </main>
  )
}
