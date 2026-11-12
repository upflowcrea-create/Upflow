import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FAQ } from "../lib/config";

// French typography: keep "?", ":" and "!" on the same line as the word before.
const nbsp = (text: string) => text.replace(/ ([?:!;])/g, "\u00a0$1");

export function Faq() {
  const listRef = useScrollReveal<HTMLDivElement>({ selector: ".faq-item", y: 24, blur: 6, stagger: 0.08 });

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <RevealText as="h2" className="faq__heading" accent={2}>
          {"VIDÉO MOTION DESIGN\u00a0: VOS QUESTIONS."}
        </RevealText>

        {/* Native <details>: every answer is in the HTML (indexable) even while collapsed. */}
        <div ref={listRef} className="faq__list">
          {FAQ.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary className="faq-item__q">
                <h3>{nbsp(item.q)}</h3>
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <p className="faq-item__a">{nbsp(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
