import { useState } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import PurpleWipe from './components/PurpleWipe'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Showreel from './sections/Showreel'
import Offers from './sections/Offers'
import Work from './sections/Work'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import { useSmoothScroll } from './lib/smoothScroll'
import { SoundProvider } from './lib/sound'

function App() {
  const [loading, setLoading] = useState(true)
  useSmoothScroll(true)

  return (
    <SoundProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="grain" />
      <Cursor />
      <Nav />

      <main className="relative bg-black">
        <Hero />
        <PurpleWipe />
        <Manifesto />
        <Showreel />
        <PurpleWipe />
        <Offers />
        <PurpleWipe />
        <Work />
        <PurpleWipe />
        <CTA />
        <Footer />
      </main>
    </SoundProvider>
  )
}

export default App
