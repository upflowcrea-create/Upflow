import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { PROCESS_STEPS } from "../lib/config";

export function Process() {
  const listRef = useScrollReveal<HTMLDivElement>({ selector: ".process-step", y: 30, blur: 6, stagger: 0.12 });

  return (
    <section id="process" className="section process">
      <div className="container">
        <RevealText as="h2" className="process__heading">
          COMMENT ÇA MARCHE ?
        </RevealText>

        <div ref={listRef} className="process__list">
          {PROCESS_STEPS.map((step) => (
            <div className="process-step" key={step.n}>
              <span className="process-step__n">{step.n}</span>
              <div className="process-step__body">
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
