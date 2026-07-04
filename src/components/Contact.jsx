export default function Contact() {
  const contacts = [
    {
      href: 'tel:+919729729901',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: 'Phone',
      value: '+91 9729729901',
      delay: '0',
    },
    {
      href: 'https://wa.me/919729729901',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+91 9729729901',
      delay: '1',
      target: '_blank',
    },
    {
      href: 'https://www.instagram.com/blissmishbakery?igsh=eWR4Z2ZkODlqb3gx',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      label: 'Instagram',
      value: '@blissmishbakery',
      delay: '2',
      target: '_blank',
    },
    {
      href: 'https://www.facebook.com/share/1BLyaBvXv1/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      label: 'Facebook',
      value: '/blissmishbakery',
      delay: '3',
      target: '_blank',
    },
    {
      href: 'mailto:nancyvermasehgal@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'nancyvermasehgal@gmail.com',
      delay: '4',
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Reach Us</p>
        <h2 className="section-title">Get In Touch</h2>
      </div>

      <div className="contact__grid">
        {contacts.map((c, index) => (
          <a
            key={index}
            href={c.href}
            target={c.target}
            rel={c.target ? 'noopener noreferrer' : undefined}
            className="contact-card reveal"
            data-reveal="up"
            data-delay={c.delay}
          >
            <span className="contact-card__icon">{c.icon}</span>
            <span className="contact-card__label">{c.label}</span>
            <span className="contact-card__value">{c.value}</span>
          </a>
        ))}
        <div className="contact-card reveal" data-reveal="up" data-delay="5">
          <span className="contact-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          <span className="contact-card__label">Address</span>
          <span className="contact-card__value">House no-33, Hospital Area, Nilokheri</span>
        </div>
      </div>
    </section>
  );
}
