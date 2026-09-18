import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../lib/config";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Contacter UPFLOW sur WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={2.2} />
    </a>
  );
}
