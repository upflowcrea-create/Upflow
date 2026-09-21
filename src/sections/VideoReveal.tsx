import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { gsap } from "../lib/smoothScroll";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { isTouchDevice } from "../lib/device";
import { ASSETS } from "../lib/config";

export function VideoReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const text = textRef.current;
    const video = videoRef.current;
    const vignette = vignetteRef.current;
    if (!section || !frame || !text) return;

    // Mobile keeps the frame locked to 16:9 (the video's real aspect ratio)
    // instead of stretching its height toward the portrait viewport — that
    // stretch was forcing a tall, heavily-cropped frame and made the "zoom"
    // look broken. Only width is animated; height follows automatically via
    // the CSS aspect-ratio below (GSAP can't reliably tween a calc() height).
    const end = isMobile ? { w: "94vw", radius: 16 } : { w: "96vw", h: "92svh", radius: 14 };
    const start = isMobile ? { w: "82vw", radius: 24 } : { w: "52vw", h: "42svh", radius: 32 };

    // Blurring a live, playing <video> forces the browser to re-filter every
    // decoded frame — on a phone GPU that's often enough on its own to make
    // the scrub feel like it's stalling. Touch devices keep the zoom (cheap:
    // transform/width) and drop the blur specifically on the video element.
    const touch = isTouchDevice();

    const ctx = gsap.context(() => {
      const words = text.querySelectorAll(".eyebrow, .video-section__title");

      if (isMobile) gsap.set(frame, { aspectRatio: "16 / 9", height: "auto" });

      if (reducedMotion) {
        gsap.set(frame, { width: end.w, height: "h" in end ? end.h : "auto", borderRadius: end.radius });
        gsap.set(words, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(frame, { width: start.w, height: "h" in start ? start.h : "auto", borderRadius: start.radius });
      if (video) gsap.set(video, touch ? { scale: 1.22 } : { scale: 1.22, filter: "blur(6px)" });
      if (vignette) gsap.set(vignette, { autoAlpha: 1 });

      // Entrance: kicker + title reveal as the section comes into view.
      gsap.fromTo(
        words,
        touch ? { autoAlpha: 0, y: 36 } : { autoAlpha: 0, y: 36, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          ...(touch ? {} : { filter: "blur(0px)" }),
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );

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
          width: end.w,
          ...("h" in end ? { height: end.h } : {}),
          borderRadius: end.radius,
          duration: 1,
          ease: "power2.inOut",
        },
        0.05,
      );

      if (video) {
        tl.to(video, { scale: 1, ...(touch ? {} : { filter: "blur(0px)" }), duration: 1, ease: "power2.inOut" }, 0.05);
      }
      if (vignette) {
        tl.to(vignette, { autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, 0.1);
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile, reducedMotion]);

  // Pause the video once it's scrolled well out of view instead of leaving
  // it decoding in the background for the rest of its ~45s runtime — one
  // less thing competing for the GPU/CPU while the user scrolls elsewhere.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.ended) video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
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
              poster={ASSETS.introPoster}
              playsInline
              autoPlay
              muted
              controls={isPlaying}
              onError={() => setVideoAvailable(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={ASSETS.introVideoWebm} type="video/webm" />
              <source src={ASSETS.introVideo} type="video/mp4" />
            </video>
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

          <div ref={vignetteRef} className="video-frame__vignette" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
