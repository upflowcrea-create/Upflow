import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
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
            <span className="step-visual__timeline-marker" />
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
  const listRef = useScrollReveal<HTMLDivElement>({
    selector: ".process-step",
    y: 30,
    blur: 8,
    stagger: 0.1,
    start: "top 85%",
  });

  return (
    <section id="process" className="section process">
      <div className="container">
        <RevealText as="h2" className="process__heading">
          COMMENT ÇA MARCHE ?
        </RevealText>

        <div ref={listRef} className="process__grid">
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
                <span className="process-step__n">{step.n}</span>
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
