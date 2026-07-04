export default function Contact() {
  const contacts = [
    {
      href: 'tel:+919729729901',
      icon: '📞',
      label: 'Phone',
      value: '+91 9729729901',
      delay: '0',
    },
    {
      href: 'https://wa.me/919729729901',
      icon: '💬',
      label: 'WhatsApp',
      value: '+91 9729729901',
      delay: '1',
      target: '_blank',
    },
    {
      href: 'https://www.instagram.com/blissmishbakery?igsh=eWR4Z2ZkODlqb3gx',
      icon: '📸',
      label: 'Instagram',
      value: '@blissmishbakery',
      delay: '2',
      target: '_blank',
    },
    {
      href: 'https://www.facebook.com/share/1BLyaBvXv1/',
      icon: '📘',
      label: 'Facebook',
      value: '/blissmishbakery',
      delay: '3',
      target: '_blank',
    },
    {
      href: 'mailto:nancyvermasehgal@gmail.com',
      icon: '✉️',
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
          <span className="contact-card__icon">📍</span>
          <span className="contact-card__label">House no-33, hospital area</span>
          <span className="contact-card__value">Nilokheri</span>
        </div>
      </div>
    </section>
  );
}
