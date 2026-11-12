import type { CSSProperties } from "react";
import { Check, X } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";

const WITHOUT = [
  "On arrive sur votre site, on survole, on repart.",
  "Votre offre a l'air compliquée. Le prospect décroche.",
  "Vous ressemblez à vos concurrents.",
  "On vous oublie juste après la visite.",
];

const WITH = [
  "En 30 secondes, on comprend ce que vous faites.",
  "Votre offre devient simple, évidente.",
  "Vous paraissez plus pro : on vous fait confiance plus vite.",
  "On se souvient de vous. Et on en parle.",
  "Et elle est prête en 7 jours, pas dans 2 mois.",
];

// "Sans vidéo / Avec UPFLOW": the ✕ lines get struck through and the ✓ pop in
// as the section scrolls into view (CSS keyed on main's .is-inview flag).
export function Benefits() {
  const gridRef = useScrollReveal<HTMLDivElement>({ selector: ".benefits__col", y: 40, blur: 6, stagger: 0.15 });

  return (
    <section id="benefits" className="section benefits">
      <div className="container">
        <RevealText as="h2" className="benefits__heading" accent={2}>
          UNE VIDÉO, ÇA CHANGE QUOI ?
        </RevealText>

        <div ref={gridRef} className="benefits__grid">
          <div className="benefits__col benefits__col--without">
            <p className="benefits__label">Sans vidéo</p>
            <ul>
              {WITHOUT.map((line, i) => (
                <li key={line} style={{ "--i": i } as CSSProperties}>
                  <span className="benefits__icon">
                    <X size={14} strokeWidth={3} />
                  </span>
                  <span className="benefits__text">
                    <span>{line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="benefits__col benefits__col--with">
            <p className="benefits__label">Avec une vidéo UPFLOW</p>
            <ul>
              {WITH.map((line, i) => (
                <li key={line} style={{ "--i": i } as CSSProperties}>
                  <span className="benefits__icon">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="benefits__text">
                    <span>{line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
