import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Simple links without query params - smooth scroll works naturally
const links = {
  es: [
    { href: "#servicios", text: "Servicios" },
    { href: "#proceso", text: "Proceso" },
    { href: "#proyectos", text: "Proyectos" },
    { href: "#contacto", text: "Contacto" },
  ],
  en: [
    { href: "#servicios", text: "Services" },
    { href: "#proceso", text: "Process" },
    { href: "#proyectos", text: "Projects" },
    { href: "#contacto", text: "Contact" },
  ]
};

const ctaTexts = { es: "Cotizar", en: "Quote" };

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  
  const [isHidden, setIsHidden] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const currentScrollY = scrollY.get();
    const scrollDiff = currentScrollY - lastScrollY.current;
    
    if (scrollDiff > 0 && currentScrollY > 50) {
      setIsHidden(true);
    } else if (scrollDiff < 0) {
      setIsHidden(false);
    }
    lastScrollY.current = currentScrollY;
  });

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

  const currentLinks = links[currentLang] || links.es;
  const ctaText = ctaTexts[currentLang] || ctaTexts.es;

  return (
    <AnimatePresence mode="sync">
      <motion.nav 
        layout 
        className="nav-react-container"
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.svg
          className="nav-react-logo"
          viewBox="0 0 32 32"
          fill="none"
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            rotate: [5, 18, 0],
          }}
          exit={{ opacity: 0, scale: 0.8, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          <circle cx="16" cy="16" r="14" stroke="#c084fc" strokeWidth="2"/>
          <circle cx="11" cy="12" r="3" fill="#c084fc"/>
          <circle cx="21" cy="12" r="3" fill="#c084fc"/>
          <path d="M9 22c0-3 2-5 5-5s5 2 5 5" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
        </motion.svg>

        <motion.ul layout className="nav-react-links">
          {currentLinks.map((link) => (
            <motion.li key={link.href} className="nav-react-list__item">
              <a href={link.href} className="nav-react-link">
                {link.text}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggleLang}
            className="nav-lang-switch"
            aria-label="Switch language"
          >
            {currentLang === "es" ? "EN" : "ES"}
          </button>

          <motion.a
            layout
            href="#contacto"
            className="nav-react-cta"
          >
            {ctaText}
          </motion.a>
        </div>

      </motion.nav>
    </AnimatePresence>
  );
}