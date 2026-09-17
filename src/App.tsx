import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { BookingModal } from "./components/BookingModal";
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initSmoothScroll();
  }, []);

  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onDone={() => setReady(true)} />
      <Navbar onBookCall={openBooking} />

      <main>
        <Hero onBookCall={openBooking} ready={ready} />
        <VideoReveal />
        <Services onCta={openBooking} />
        <Portfolio />
        <Humor onCta={openBooking} />
        <Process />
        <Pricing onCta={openBooking} />
        <FinalCta onBookCall={openBooking} />
      </main>

      <Footer />
      <WhatsAppButton />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

export default App;
