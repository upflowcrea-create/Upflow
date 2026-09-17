import { useEffect, useRef } from "react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { gsap } from "../lib/smoothScroll";
import { PROCESS_STEPS } from "../lib/config";

export function Process() {
  const listRef = useScrollReveal<HTMLDivElement>({ selector: ".process-step", y: 30, blur: 6, stagger: 0.12 });
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        },
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="section process">
      <div className="container">
        <RevealText as="h2" className="process__heading">
          COMMENT ÇA MARCHE ?
        </RevealText>

        <div ref={listRef} className="process__list">
          <div className="process__line-track">
            <div ref={lineRef} className="process__line-fill" />
          </div>
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
