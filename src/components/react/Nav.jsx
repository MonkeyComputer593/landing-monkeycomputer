import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

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

const WhatsApp_URL =
  "https://wa.me/5491136000797?text=Hola,%20me%20contacto%20desde%20la%20web";

export default function Nav({ locale: serverLocale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(serverLocale || "es");

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
      <motion.nav
        className="nav-fixed"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <a href="#inicio" className="nav-logo" onClick={closeMenu}>
          <span className="nav-logo-text">Monkey</span>
        </a>

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
              aria-label={currentLang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              {currentLang === "es" ? "EN" : "ES"}
            </button>
            <a
              href={WhatsApp_URL}
              className="nav-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={currentLang === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="22"
                height="22"
              >
                <path fill="#25D366" d="M16 0C7.16 0 0 7.16 0 16c0 3.1.88 6 2.4 8.46L.05 31.95l7.72-2.35A15.94 15.94 0 0016 32c8.84 0 16-7.16 16-16S24.84 0 16 0z"/>
                <path fill="#FFF" d="M22.96 19.06c-.26-.13-1.54-.76-1.78-.84-.24-.09-.42-.13-.6.13-.18.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.09-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.06-.13-.58-1.4-.8-1.92-.21-.5-.42-.43-.58-.44-.15-.01-.32-.01-.5-.01s-.45.06-.69.32c-.24.26-.91.89-.91 2.16 0 1.27.93 2.5 1.06 2.68.13.17 1.55 2.4 3.82 3.14.53.2.95.32 1.27.42.53.16 1.02.14 1.4.06.43-.08 1.07-.38 1.43-.9.36-.52.31-.97.26-1.1-.06-.13-.2-.19-.46-.32z"/>
              </svg>
            </a>
            <a href="#contacto" className="nav-cta">
              {ctaText}
            </a>
          </div>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? (currentLang === "es" ? "Cerrar menú" : "Close menu") : (currentLang === "es" ? "Abrir menú" : "Open menu")}
          aria-expanded={isOpen}
        >
          <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${isOpen ? "open" : ""}`} />
        </button>
      </motion.nav>

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
