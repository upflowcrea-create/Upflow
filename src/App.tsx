import { useState } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Showreel from './sections/Showreel'
import Services from './sections/Services'
import Work from './sections/Work'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import { useSmoothScroll } from './lib/smoothScroll'

function App() {
  const [loading, setLoading] = useState(true)
  useSmoothScroll(true)

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="grain" />
      <Cursor />
      <Nav />

      <main className="relative bg-noir">
        <Hero />
        <Manifesto />
        <Showreel />
        <Services />
        <Work />
        <CTA />
        <Footer />
      </main>
    </>
  )
}

export default App
