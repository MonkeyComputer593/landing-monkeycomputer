import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

// Links: Inicio, Proyectos, Servicios, Contacto
const links = {
  es: [
    { href: "#inicio", text: "Inicio" },
    { href: "#proyectos", text: "Proyectos" },
    { href: "#servicios", text: "Servicios" },
    { href: "#contacto", text: "Contacto" },
  ],
  en: [
    { href: "#inicio", text: "Home" },
    { href: "#proyectos", text: "Projects" },
    { href: "#servicios", text: "Services" },
    { href: "#contacto", text: "Contact" },
  ],
};

const ctaTexts = { es: "Cotizar", en: "Quote" };

// WhatsApp link
const WhatsApp_URL =
  "https://wa.me/5491136000797?text=Hola,%20me%20contacto%20desde%20la%20web";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") === "en" ? "en" : "es";
    setCurrentLang(lang);
  }, []);

  const toggleLang = () => {
    const newLang = currentLang === "es" ? "en" : "es";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.location.href = url.toString();
  };

  const closeMenu = () => setIsOpen(false);

  const currentLinks = links[currentLang] || links.es;
  const ctaText = ctaTexts[currentLang] || ctaTexts.es;

  return (
    <>
      {/* Navbar Sticky Fijo */}
      <motion.nav
        className="nav-fixed"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Logo */}
        <a href="#inicio" className="nav-logo" onClick={closeMenu}>
          <span className="nav-logo-text">Monkey</span>
        </a>

        {/* Desktop: Links + CTA + WhatsApp */}
        <div className="nav-desktop">
          <ul className="nav-links">
            {currentLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              onClick={toggleLang}
              className="nav-lang"
              aria-label="Switch language"
            >
              {currentLang === "es" ? "EN" : "ES"}
            </button>
            {/* WhatsApp en navbar */}
            <a
              href={WhatsApp_URL}
              className="nav-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="22"
                height="22"
              >
                <circle cx="16" cy="16" r="15" fill="#25D366" />
                <path
                  fill="#FFF"
                  d="M22.2 18.1l-3.4-.8c-.3-.7-.7-1.5-1.3-2.1l2-3c.4-.5.4-1.2-.1-1.6l-2.3-2.3c-.4-.4-1.1-.5-1.6-.1l-3 2c-.6-.5-1.4-1-2.1-1.3l-.8-3.4c-.3-1.1-1.3-1.7-2.4-1.7H6.3c-1.1 0-2.1.7-2.4 1.7L2 7.3c-.7 3.1 1.3 6.3 4.4 7l3.4.8c.3.7.7 1.5 1.3 2.1l-2 3c-.4.5-.4 1.2.1 1.6l2.3 2.3c.4.4 1.1.5 1.6.1l3-2c.6.5 1.4 1 2.1 1.3l.8 3.4c.3 1.1 1.3 1.7 2.4 1.7h1.5c1.1 0 2.1-.7 2.4-1.7l.8-3.4zM16 23.5c-1.9 0-3.7-.5-5.3-1.4-1.6-.9-2.8-2.3-3.5-3.9-.7-1.6-.7-3.4 0-5 1.3-2.9 3.9-4.9 6.8-5.2 1-.1 2-.1 2.9.3 1 .4 1.8 1.1 2.4 2 .6.9.8 1.9.6 2.9-.2 1-.8 1.9-1.6 2.5-.8.6-1.8 1-2.8 1-.5 0-1-.1-1.5-.3l-1.2.4c-.5.2-.8.7-.8 1.3v1.8c0 .6.4 1.2 1 1.5l1.2.4c.5.2 1 .3 1.5.3 2.5 0 4.7-1.3 6-3.5 1.3-2.2 1.4-4.8.3-7-.7-2.3-2.1-4.3-4-5.6-1.9-1.3-4.2-1.9-6.5-1.6z"
                />
                <circle fill="#FFF" cx="16.5" cy="12" r="2" />
              </svg>
            </a>
            <a href="#contacto" className="nav-cta">
              {ctaText}
            </a>
          </div>
        </div>

        {/* Mobile: Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="nav-mobile-links">
              {currentLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="nav-mobile-link"
                    onClick={closeMenu}
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: currentLinks.length * 0.05 }}
              >
                <a
                  href="#contacto"
                  className="nav-mobile-cta"
                  onClick={closeMenu}
                >
                  {ctaText}
                </a>
              </motion.li>
            </ul>

            <button className="nav-lang-mobile" onClick={toggleLang}>
              {currentLang === "es" ? "🇪🇸 Español" : "🇺🇸 English"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
