import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar scrolled style
      setIsScrolled(window.scrollY > 40);

      // 2. Scroll progress bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(pct);

      // 3. Scrollspy active link
      const sections = ['home', 'about', 'cakes', 'gallery', 'reviews', 'contact', 'order'];
      let currentSection = 'home';
      const offset = 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && window.scrollY + offset >= el.offsetTop) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (!target) return;

    const navbarEl = document.getElementById('navbar');
    const navHeight = navbarEl ? navbarEl.offsetHeight + 10 : 80;

    window.scrollTo({
      top: target.offsetTop - navHeight,
      behavior: 'smooth',
    });

    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Cakes', href: '#cakes' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
    { label: 'Order', href: '#order', cta: true },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        id="scrollProgress" 
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <header 
        className={`navbar ${isScrolled ? 'is-scrolled' : ''}`} 
        id="navbar"
      >
        <div className="navbar__inner">
          <a href="#home" className="navbar__logo" onClick={(e) => handleLinkClick(e, '#home')}>
            <img src="/logo.png" alt="Bliss Mish Bakery Logo" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-main">Bliss <span className="script">Mish</span></span>
              <span className="navbar__logo-sub">Bakery</span>
            </div>
          </a>

          <nav className={`navbar__menu ${isOpen ? 'is-open' : ''}`} id="navMenu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''} ${link.cta ? 'nav-link--cta' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                data-link
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button 
            className={`navbar__toggle ${isOpen ? 'is-open' : ''}`} 
            id="navToggle" 
            aria-label="Toggle menu" 
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
    </>
  );
}
