import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { getLenis } from "../lib/smoothScroll";
import { useScrollLock } from "../hooks/useScrollLock";
import { WHATSAPP_URL } from "../lib/config";

const LINKS = [
  { label: "Travail", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Tarifs", href: "#pricing" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -20 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navbar({ onBookCall }: { onBookCall: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(open);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner container">
          <a
            href="#top"
            className="navbar__logo"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#top");
            }}
          >
            <Logo height={38} />
          </a>

          <nav className="navbar__links">
            {LINKS.map((link) => (
              <button key={link.href} className="navbar__link" onClick={() => handleNav(link.href)}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="navbar__actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__whatsapp"
              aria-label="Contacter UPFLOW sur WhatsApp"
            >
              <MessageCircle size={18} strokeWidth={2.2} />
            </a>
            <button className="btn btn-primary navbar__cta" onClick={onBookCall}>
              Parler du projet
            </button>
          </div>

          <button className="navbar__burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div className={`navbar__mobile ${open ? "navbar__mobile--open" : ""}`}>
        {LINKS.map((link) => (
          <button key={link.href} className="navbar__mobile-link" onClick={() => handleNav(link.href)}>
            {link.label}
          </button>
        ))}
        <button
          className="btn btn-primary navbar__mobile-cta"
          onClick={() => {
            setOpen(false);
            onBookCall();
          }}
        >
          Parler du projet
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__mobile-whatsapp"
          onClick={() => setOpen(false)}
        >
          <MessageCircle size={18} strokeWidth={2.2} /> Écrire sur WhatsApp
        </a>
      </div>
    </>
  );
}
