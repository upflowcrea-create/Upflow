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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(open);

  const handleNav = (href: string) => {
    if (!open) return scrollTo(href);
    setOpen(false);
    // The open menu locks the page (body position:fixed) and restores the
    // old scroll position when it unlocks — scrolling before that happens
    // gets undone. Wait for the unlock, then scroll.
    const go = () => (document.body.style.position === "fixed" ? requestAnimationFrame(go) : scrollTo(href));
    requestAnimationFrame(go);
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
              <span className="navbar__whatsapp-label">WhatsApp</span>
            </a>

            <button className="navbar__burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`navbar__mobile ${open ? "navbar__mobile--open" : ""}`}>
        {LINKS.map((link, i) => (
          <button
            key={link.href}
            className="navbar__mobile-link"
            style={{ transitionDelay: open ? `${0.05 + i * 0.05}s` : "0s" }}
            onClick={() => handleNav(link.href)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
