import { useState } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import PurpleWipe from './components/PurpleWipe'
import WhatsAppButton from './components/WhatsAppButton'
import Hero from './sections/Hero'
import WhyVideo from './sections/WhyVideo'
import Showreel from './sections/Showreel'
import Offers from './sections/Offers'
import Work from './sections/Work'
import Process from './sections/Process'
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
      <WhatsAppButton />

      <main className="relative bg-black">
        <Hero />
        <PurpleWipe />
        <WhyVideo />
        <Showreel />
        <PurpleWipe />
        <Offers />
        <PurpleWipe />
        <Work />
        <PurpleWipe />
        <Process />
        <PurpleWipe />
        <CTA />
        <Footer />
      </main>
    </SoundProvider>
  )
}

export default App
