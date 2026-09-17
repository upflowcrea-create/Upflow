import { useEffect, useState } from "react";
import { X, CalendarCheck, Loader2 } from "lucide-react";
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_URL } from "../lib/config";
import { useScrollLock } from "../hooks/useScrollLock";
import { BookingCalendar } from "./BookingCalendar";

type Status = "idle" | "submitting" | "success" | "error";

const DATE_LABEL = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" });

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setMessage("");
  }, [open]);

  if (!open) return null;

  const canSubmit = Boolean(selectedDate && selectedTime && name.trim() && email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !selectedDate || !selectedTime) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Nouvelle demande de rendez-vous — UPFLOW",
          from_name: "Site UPFLOW",
          name,
          email,
          date: DATE_LABEL.format(selectedDate),
          heure: selectedTime,
          message,
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
    <div className="booking-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal__close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="booking-success">
            <CalendarCheck size={40} />
            <h3>C'est noté !</h3>
            <p>Votre demande est bien partie. On vous recontacte très vite pour confirmer le créneau.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Fermer
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <p className="eyebrow">Book a call</p>
            <h3 className="booking-form__title">Choisissez un créneau</h3>

            <BookingCalendar
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDate={(d) => {
                setSelectedDate(d);
                setSelectedTime(null);
              }}
              onSelectTime={setSelectedTime}
            />

            {selectedDate && selectedTime && (
              <div className="booking-form__contact">
                <label>
                  Nom
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    required
                  />
                </label>
                <label>
                  Votre projet (optionnel)
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    placeholder="Quelques mots sur ce que vous voulez faire..."
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary booking-form__submit"
              disabled={!canSubmit || status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="booking-form__spinner" /> Envoi...
                </>
              ) : (
                "Confirmer le rendez-vous →"
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
