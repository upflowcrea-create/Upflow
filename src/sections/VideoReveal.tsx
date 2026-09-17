import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { gsap, ScrollTrigger } from "../lib/smoothScroll";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { ASSETS } from "../lib/config";

export function VideoReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const text = textRef.current;
    if (!section || !frame || !text) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(frame, { width: "94vw", height: "82vh", borderRadius: 18 });
        return;
      }

      if (isMobile) {
        gsap.fromTo(
          frame,
          { width: "88vw", height: "38vh", borderRadius: 24 },
          {
            width: "94vw",
            height: "56vh",
            borderRadius: 16,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 70%", end: "top 20%", scrub: 0.6 },
          },
        );
        return;
      }

      gsap.set(frame, { width: "52vw", height: "42vh", borderRadius: 32 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(text, { autoAlpha: 0, yPercent: -30, duration: 0.35, ease: "power1.out" }, 0).to(
        frame,
        {
          width: "96vw",
          height: "92vh",
          borderRadius: 14,
          duration: 1,
          ease: "power2.inOut",
        },
        0.05,
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    // Keep ScrollTrigger measurements correct once fonts/layout settle.
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="video" ref={sectionRef} className="video-section">
      <div className="video-section__inner">
        <div ref={textRef} className="video-section__text">
          <p className="eyebrow">C'est moi. C'est UPFLOW.</p>
          <h2 className="video-section__title">30 secondes pour tout comprendre.</h2>
        </div>

        <div ref={frameRef} className="video-frame">
          {videoAvailable ? (
            <video
              ref={videoRef}
              className="video-frame__video"
              src={ASSETS.introVideo}
              poster={ASSETS.introPoster}
              playsInline
              controls={isPlaying}
              onError={() => setVideoAvailable(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <div className="video-frame__placeholder">
              <span className="video-frame__placeholder-text">Vidéo de présentation UPFLOW</span>
            </div>
          )}

          {!isPlaying && (
            <button className="video-frame__play" onClick={togglePlay} aria-label="Lire la vidéo">
              <Play size={28} fill="currentColor" strokeWidth={0} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
