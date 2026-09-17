import { useEffect, useRef, useState } from "react";
import { X, CalendarCheck, Loader2 } from "lucide-react";
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_URL } from "../lib/config";
import { useScrollLock } from "../hooks/useScrollLock";

type Status = "idle" | "submitting" | "success" | "error";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset the form each time the modal is reopened.
  useEffect(() => {
    if (open) setStatus("idle");
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal__close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="booking-success">
            <CalendarCheck size={40} />
            <h3>C'est noté !</h3>
            <p>
              Votre demande est bien partie. On vous recontacte très vite pour confirmer le créneau.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <form ref={formRef} className="booking-form" onSubmit={handleSubmit}>
            <p className="eyebrow">Book a call</p>
            <h3 className="booking-form__title">Choisissez un créneau</h3>

            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="Nouvelle demande de rendez-vous — UPFLOW" />
            <input type="hidden" name="from_name" value="Site UPFLOW" />

            <div className="booking-form__row">
              <label>
                Date
                <input type="date" name="date" min={todayISO()} required />
              </label>
              <label>
                Heure
                <input type="time" name="heure" min="09:00" max="19:00" required />
              </label>
            </div>

            <label>
              Nom
              <input type="text" name="name" placeholder="Votre nom" required />
            </label>

            <label>
              Email
              <input type="email" name="email" placeholder="vous@exemple.com" required />
            </label>

            <label>
              Téléphone (optionnel)
              <input type="tel" name="telephone" placeholder="06 12 34 56 78" />
            </label>

            <label>
              Votre projet
              <textarea name="message" rows={3} placeholder="Quelques mots sur ce que vous voulez faire..." />
            </label>

            <button type="submit" className="btn btn-primary booking-form__submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="booking-form__spinner" /> Envoi...
                </>
              ) : (
                "Envoyer la demande →"
              )}
            </button>

            {status === "error" && (
              <p className="booking-form__error">
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
    </div>
  );
}
