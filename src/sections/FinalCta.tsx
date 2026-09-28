import { useState } from "react";
import { MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useMagnetic } from "../hooks/useMagnetic";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_URL } from "../lib/config";

type Status = "idle" | "submitting" | "success" | "error";

export function FinalCta() {
  const [script, setScript] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const subRef = useScrollReveal<HTMLParagraphElement>({ y: 16, blur: 6 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, blur: 8, start: "top 85%" });
  const submitBtn = useMagnetic<HTMLButtonElement>(0.25);
  const waBtn = useMagnetic<HTMLAnchorElement>(0.25);

  const canSubmit = Boolean(script.trim() && phone.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouveau script reçu — UPFLOW",
          from_name: "Site UPFLOW",
          telephone: phone,
          script,
        }),
      });
      const json = await res.json();
      if (json.success) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section final-cta" id="contact">
      <div className="final-cta__bg" aria-hidden="true">
        <div className="final-cta__blob" />
      </div>

      <div className="container final-cta__inner">
        <RevealText as="h2" className="final-cta__title">
          VOUS AVEZ DÉJÀ VOTRE SCRIPT ?
        </RevealText>
        <RevealText as="h2" className="final-cta__title final-cta__title--accent">
          ENVOYEZ-LE. ON S'OCCUPE DU RESTE.
        </RevealText>

        <p ref={subRef} className="final-cta__sub">
          Pas besoin d'un brief de 48 pages.
          <br />
          Script, téléphone, envoyé — c'est tout ce qu'il nous faut pour démarrer.
        </p>

        <div ref={gridRef} className="script-cta__grid">
          <div className="script-cta__panel">
            {status === "success" ? (
              <div className="script-cta__success">
                <CheckCircle2 size={40} />
                <h3>C'est reçu !</h3>
                <p>Votre script est bien arrivé. On vous rappelle très vite pour en parler.</p>
              </div>
            ) : (
              <form className="script-form" onSubmit={handleSubmit}>
                <label className="script-form__field">
                  <span className="script-form__label">Votre script</span>
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Collez votre script ici…"
                    rows={9}
                    required
                  />
                  <span className="script-form__hint">
                    Vous avez déjà votre script ? Envoyez-le directement ici.
                  </span>
                </label>

                <label className="script-form__field">
                  <span className="script-form__label">Votre numéro de téléphone</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </label>

                <button
                  ref={submitBtn}
                  type="submit"
                  className="btn btn-primary script-form__submit"
                  disabled={!canSubmit || status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="script-form__spinner" /> Envoi...
                    </>
                  ) : (
                    "Envoyer mon script →"
                  )}
                </button>

                {status === "error" && (
                  <p className="script-form__error">
                    Oups, l'envoi a échoué.{" "}
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Contactez-nous sur WhatsApp
                    </a>{" "}
                    à la place.
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="script-cta__divider" aria-hidden="true">
            <span>OU</span>
          </div>

          <div className="script-cta__whatsapp">
            <MessageCircle size={32} className="script-cta__whatsapp-icon" />
            <p className="script-cta__whatsapp-title">Une question avant de vous lancer ?</p>
            <p className="script-cta__whatsapp-sub">Pas besoin de remplir quoi que ce soit pour ça.</p>
            <a
              ref={waBtn}
              className="btn btn-ghost script-cta__whatsapp-btn"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Écrivez-nous sur WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
