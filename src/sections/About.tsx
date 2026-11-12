import { MessageCircle } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FOUNDER, WHATSAPP_URL } from "../lib/config";

// "Moi c'est Eliot": the person behind UPFLOW, right after the services, so
// visitors meet a face before they browse the projects.
export function About() {
  const cardRef = useScrollReveal<HTMLDivElement>({ y: 30, blur: 6 });

  return (
    <section id="about" className="section about">
      <div className="container">
        <div ref={cardRef} className="about__card">
          <img className="about__photo" src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.role}`} loading="lazy" />
          <div className="about__text">
            <p className="eyebrow">Derrière UPFLOW</p>
            <RevealText as="h2" className="about__title" accent={1}>
              {`MOI C'EST ${FOUNDER.name.toUpperCase()}.`}
            </RevealText>
            <p className="about__body">
              Salut&nbsp;! Je suis celui qui confectionne vos vidéos, du script à l'animation. Motion designer à
              Paris, je m'occupe de tout moi-même&nbsp;: vous parlez directement à la personne qui crée votre vidéo.
            </p>
            <a className="btn btn-ghost about__cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> Écrire à {FOUNDER.name}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
