import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, TikTokIcon, LinkedInIcon } from "./SocialIcons";
import { CONTACT, BRAND } from "../lib/config";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo height={24} />
          <p className="footer__tagline">{BRAND.tagline}</p>
        </div>

        <div className="footer__contact">
          <a href={`mailto:${CONTACT.email}`} className="footer__email">
            <Mail size={16} />
            {CONTACT.email}
          </a>

          <div className="footer__socials">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon size={18} />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      <p className="footer__bottom">© {new Date().getFullYear()} {BRAND.name}. Tous droits réservés.</p>
    </footer>
  );
}
