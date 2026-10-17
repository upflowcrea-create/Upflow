import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, TikTokIcon, LinkedInIcon } from "./SocialIcons";
import { CONTACT, BRAND, LOCATION, PARTNER, PORTFOLIO_ITEMS } from "../lib/config";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo height={44} />
          <p className="footer__tagline">{BRAND.tagline}</p>
        </div>

        <div className="footer__contact">
          <a href={`mailto:${CONTACT.email}`} className="footer__email">
            <Mail size={16} />
            {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.whatsappNumber}`} className="footer__email">
            <Phone size={16} />
            {CONTACT.whatsappDisplay}
          </a>
          <a href={LOCATION.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="footer__email">
            <MapPin size={16} />
            Studio à {LOCATION.district} · Paris &amp; Île-de-France
          </a>

          <div className="footer__socials">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon size={18} />
            </a>
            {CONTACT.linkedin && (
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      <nav className="container footer__projects" aria-label="Projets">
        <span>Projets :</span>
        {PORTFOLIO_ITEMS.filter((item) => item.date).map((item) => (
          <a key={item.id} href={`/projets/${item.id}/`}>
            {item.title.split(" — ")[0]}
          </a>
        ))}
      </nav>

      <p className="footer__bottom">
        © {new Date().getFullYear()} {BRAND.name}. Tous droits réservés. · Agence web partenaire :{" "}
        <a href={PARTNER.url} target="_blank" rel="noopener noreferrer" className="footer__partner">
          {PARTNER.name}
        </a>
      </p>
    </footer>
  );
}
