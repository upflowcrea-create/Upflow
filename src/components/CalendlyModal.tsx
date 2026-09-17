import { useEffect } from "react";
import { X } from "lucide-react";
import { CALENDLY_URL } from "../lib/config";
import { useScrollLock } from "../hooks/useScrollLock";

export function CalendlyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
        <iframe
          title="Book a call — UPFLOW"
          src={CALENDLY_URL}
          className="calendly-modal__frame"
          loading="lazy"
        />
      </div>
    </div>
  );
}
