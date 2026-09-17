import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CalendlyModal } from "./components/CalendlyModal";
import { Preloader } from "./components/Preloader";
import { Hero } from "./sections/Hero";
import { VideoReveal } from "./sections/VideoReveal";
import { Services } from "./sections/Services";
import { Portfolio } from "./sections/Portfolio";
import { Humor } from "./sections/Humor";
import { Process } from "./sections/Process";
import { Pricing } from "./sections/Pricing";
import { FinalCta } from "./sections/FinalCta";
import { initSmoothScroll } from "./lib/smoothScroll";

function App() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initSmoothScroll();
  }, []);

  const openCalendly = () => setCalendlyOpen(true);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onDone={() => setReady(true)} />
      <Navbar onBookCall={openCalendly} />

      <main>
        <Hero onBookCall={openCalendly} ready={ready} />
        <VideoReveal />
        <Services onCta={openCalendly} />
        <Portfolio />
        <Humor onCta={openCalendly} />
        <Process />
        <Pricing onCta={openCalendly} />
        <FinalCta onBookCall={openCalendly} />
      </main>

      <Footer />
      <WhatsAppButton />
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}

export default App;
