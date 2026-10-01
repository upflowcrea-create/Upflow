import { useState } from "react";
import { MessageCircle, Loader2, CheckCircle2, Mail } from "lucide-react";
import { RevealText } from "../components/RevealText";
import { useMagnetic } from "../hooks/useMagnetic";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_URL, CONTACT } from "../lib/config";

type Status = "idle" | "submitting" | "success" | "error";

export function FinalCta() {
  const [script, setScript] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const subRef = useScrollReveal<HTMLParagraphElement>({ y: 16, blur: 6 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, blur: 8, start: "top 85%" });
  const waSendBtn = useMagnetic<HTMLAnchorElement>(0.2);

  const canSubmit = Boolean(script.trim() && phone.trim());

  // WhatsApp is the priority channel: a "send" link pre-fills the script and
  // phone as a message to UPFLOW's number — the visitor just has to hit send
  // in WhatsApp. Email (Web3Forms) stays as the secondary option below it.
  const scriptWhatsAppUrl = `https://wa.me/${CONTACT.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Bonjour UPFLOW, voici mon script :\n\n${script}\n\nMon numéro : ${phone}`,
  )}`;

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

                <div className="script-form__actions">
                  <a
                    ref={waSendBtn}
                    className="btn btn-primary script-form__submit"
                    href={canSubmit ? scriptWhatsAppUrl : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!canSubmit}
                    onClick={(e) => {
                      if (!canSubmit) e.preventDefault();
                    }}
                  >
                    <MessageCircle size={16} /> Envoyer sur WhatsApp →
                  </a>

                  <button
                    type="submit"
                    className="btn btn-ghost script-form__submit"
                    disabled={!canSubmit || status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="script-form__spinner" /> Envoi...
                      </>
                    ) : (
                      <>
                        <Mail size={16} /> Envoyer par email
                      </>
                    )}
                  </button>
                </div>

                <p className="script-form__promise">On vous répond en moins de 48h, promis.</p>

                <p className="script-form__question">
                  Juste une question avant de vous lancer ?{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Écrivez-nous sur WhatsApp
                  </a>
                  , sans rien remplir.
                </p>

                {status === "error" && (
                  <p className="script-form__error">
                    Oups, l'envoi par email a échoué.{" "}
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Essayez WhatsApp
                    </a>{" "}
                    à la place.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
