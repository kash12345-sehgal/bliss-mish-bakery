import { scrollToSection } from '../utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Cakes', id: 'cakes' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
    { label: 'Order', id: 'order' },
  ];

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a 
          href="#home" 
          className="footer__logo" 
          onClick={(e) => handleLinkClick(e, 'home')}
          data-link
        >
          Bliss <span className="script">Mish</span> Bakery
        </a>
        <p className="footer__tagline">Freshly Baked With Love ❤</p>
        <p className="footer__tagline">I ❤ Kashi</p>
        
        <nav className="footer__links">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              data-link
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__socials">
          <a href="https://instagram.com/blissmishbakery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
          <a href="https://www.facebook.com/share/1BLyaBvXv1/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
          <a href="https://wa.me/919729729901" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
          <a href="mailto:nancyvermasehgal@gmail.com" aria-label="Email">✉️</a>
        </div>

        <p className="footer__copy">
          © <span id="year">{currentYear}</span> Bliss Mish Bakery. All rights reserved. Baked with love, served with pride.
        </p>
      </div>
    </footer>
  );
}
