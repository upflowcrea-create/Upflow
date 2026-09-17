import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { BOOKING_URL } from "../lib/config";
import { useScrollLock } from "../hooks/useScrollLock";

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="calendly-overlay" onClick={onClose}>
      <div className="calendly-modal" onClick={(e) => e.stopPropagation()}>
        <button className="calendly-modal__close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>
        <iframe title="Book a call — UPFLOW" src={BOOKING_URL} className="calendly-modal__frame" loading="lazy" />
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="calendly-modal__fallback"
        >
          Le calendrier ne s'affiche pas ? Ouvrir dans un nouvel onglet <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
