import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { Marquee } from "./components/Marquee";
import { Hero } from "./sections/Hero";
import { VideoReveal } from "./sections/VideoReveal";
import { Services } from "./sections/Services";
import { Portfolio } from "./sections/Portfolio";
import { Humor } from "./sections/Humor";
import { Process } from "./sections/Process";
import { Pricing } from "./sections/Pricing";
import { FinalCta } from "./sections/FinalCta";
import { initSmoothScroll, setupScrollTriggerRefresh } from "./lib/smoothScroll";
import { WHATSAPP_URL } from "./lib/config";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initSmoothScroll();
    return setupScrollTriggerRefresh();
  }, []);

  // WhatsApp is the priority contact channel site-wide, including for what
  // used to be a "book a call" calendar flow — every CTA that talked about
  // the project opens a chat instead of a multi-step booking modal.
  const openWhatsApp = () => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero onBookCall={openWhatsApp} ready={ready} />
        <VideoReveal />
        <Marquee />
        <Services onCta={openWhatsApp} />
        <Portfolio />
        <Humor onCta={openWhatsApp} />
        <Process />
        <Pricing onCta={openWhatsApp} />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}

export default App;
