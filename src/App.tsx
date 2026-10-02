import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { Marquee } from "./components/Marquee";
import { PageBackdrop } from "./components/PageBackdrop";
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

  // Marks each top-level section .is-inview while it's on screen; the CSS
  // pauses every looping animation inside sections that aren't.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-inview", e.isIntersecting)),
      { rootMargin: "100px" },
    );
    document.querySelectorAll("main > *").forEach((el) => io.observe(el));
    return () => io.disconnect();
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
      {/* Rendered last so its scroll triggers are created after the video
          section's pin, and measure the page with the pin spacing in place. */}
      <PageBackdrop />
    </>
  );
}

export default App;
