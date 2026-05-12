import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: '#ffffff' }}>
      <Navbar />
      <Hero />
      <p style={{ padding: '4rem 2rem', color: '#666' }}>more sections coming...</p>
    </main>
  )
}
