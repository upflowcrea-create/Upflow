import { useRef, useState } from "react";
import { RevealText } from "../components/RevealText";
import { useCardsReveal } from "../hooks/useCardsReveal";
import { PROCESS_STEPS } from "../lib/config";

const STICKERS: Record<string, string> = {
  "01": "On papote !",
  "02": "Validé !",
  "03": "On visualise",
  "04": "En cours...",
  "05": "C'est prêt !",
};

function StepVisual({ n }: { n: string }) {
  switch (n) {
    case "01":
      return (
        <div className="step-visual step-visual--call">
          <div className="step-visual__avatars">
            <span className="step-visual__avatar step-visual__avatar--a" />
            <span className="step-visual__avatar step-visual__avatar--b" />
          </div>
          <div className="step-visual__call-bar">
            <span />
            <span />
            <span />
          </div>
        </div>
      );
    case "02":
      return (
        <div className="step-visual step-visual--script">
          <div className="step-visual__bubble">
            Script validé <span>✓</span>
          </div>
        </div>
      );
    case "03":
      return (
        <div className="step-visual step-visual--storyboard">
          <span className="step-visual__frame" />
          <span className="step-visual__frame" />
          <span className="step-visual__frame" />
          <span className="step-visual__frame" />
        </div>
      );
    case "04":
      return (
        <div className="step-visual step-visual--motion">
          <div className="step-visual__timeline">
            <span className="step-visual__timeline-fill" />
            <span className="step-visual__timeline-head">
              <span className="step-visual__timeline-marker" />
            </span>
          </div>
          <span className="step-visual__pill">Render…</span>
        </div>
      );
    case "05":
      return (
        <div className="step-visual step-visual--delivery">
          <div className="step-visual__file">
            <span className="step-visual__file-icon" />
            Video_Final.mp4
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function Process() {
  const listRef = useCardsReveal<HTMLDivElement>(".process-step", 3);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const setTrack = (el: HTMLDivElement | null) => {
    trackRef.current = el;
    listRef.current = el;
  };
  const [active, setActive] = useState(0);

  // Like motion-lab: numbered tabs over a swipeable row of step cards. A tab
  // scrolls its card into place; scrolling the row moves the active tab.
  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft - track.clientLeft, behavior: "smooth" });
    setActive(i);
  };
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.children] as HTMLElement[];
    const x = track.scrollLeft;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - track.offsetLeft - x) < Math.abs(cards[best].offsetLeft - track.offsetLeft - x)) best = i;
    });
    // At the very end the last card can't reach the left edge: select it.
    if (x + track.clientWidth >= track.scrollWidth - 4) best = cards.length - 1;
    setActive(best);
  };

  return (
    <section id="process" className="section process">
      <div className="container">
        <RevealText as="h2" className="process__heading" accent={2}>
          COMMENT ÇA MARCHE ?
        </RevealText>
        <p className="process__promise">
          De l'appel à la livraison : <strong>7 jours max</strong>.
        </p>

        <div className="process__tabs" role="tablist" aria-label="Étapes">
          {PROCESS_STEPS.map((step, i) => (
            <button
              key={step.n}
              role="tab"
              aria-selected={active === i}
              className={`process__tab${active === i ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="process__tab-n">{i + 1}</span>
              <span className="process__tab-label">{step.title}</span>
            </button>
          ))}
        </div>

        <div ref={setTrack} className="process__grid" onScroll={onScroll}>
          {PROCESS_STEPS.map((step) => (
            <div
              className={`process-step${step.n === "05" ? " process-step--final" : ""}`}
              key={step.n}
            >
              <span className="process-step__sticker">{STICKERS[step.n]}</span>
              <div className="process-step__visual">
                <StepVisual n={step.n} />
              </div>
              <div className="process-step__body">
                <span className="process-step__n">
                  {step.n} <span className="process-step__day">{step.day}</span>
                </span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
