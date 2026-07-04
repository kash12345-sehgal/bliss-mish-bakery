export default function WhyChooseUs() {
  const points = [
    {
      title: 'Homemade',
      desc: 'Baked fresh in a real home kitchen, never mass-produced.',
      delay: '0',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18" />
          <path d="M12 3v9" />
          <path d="m18 8-3.5 3.5" />
          <path d="m6 8 3.5 3.5" />
          <path d="M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8" />
        </svg>
      )
    },
    {
      title: 'Fresh Ingredients',
      desc: 'Sourced daily — real butter, real cream, real flavour.',
      delay: '1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20" />
          <path d="M12 6c1.5-1 3.5-1 4.5.5s.5 3.5-1 4.5c-1.5 1-3.5 1-4.5-.5S10.5 7 12 6Z" />
          <path d="M12 12c1.5-1 3.5-1 4.5.5s.5 3.5-1 4.5c-1.5 1-3.5 1-4.5-.5S10.5 13 12 12Z" />
          <path d="M12 6c-1.5-1-3.5-1-4.5.5s-.5 3.5 1 4.5c1.5 1 3.5 1 4.5-.5s.5-3.5-1-4.5Z" />
          <path d="M12 12c-1.5-1-3.5-1-4.5.5s-.5 3.5 1 4.5c1.5 1 3.5 1 4.5-.5s.5-3.5-1-4.5Z" />
        </svg>
      )
    },
    {
      title: 'Premium Quality',
      desc: 'Every layer finished with patience and a perfectionist\'s eye.',
      delay: '2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      )
    },
    {
      title: 'Custom Designs',
      desc: 'Tell us your vision — we sculpt, paint and pipe it to life.',
      delay: '3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22h9" />
          <path d="M3 22h9" />
          <path d="M12 18v4" />
          <path d="M5 18h14v-6H5v6Z" />
          <path d="M8 12V8a4 4 0 0 1 8 0v4" />
        </svg>
      )
    },
    {
      title: 'Affordable Prices',
      desc: 'Luxury taste, honest pricing — no hidden costs.',
      delay: '4',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8" />
          <path d="m4.93 10.93 4.24-4.24a2 2 0 0 1 2.83 0l7.07 7.07a2 2 0 0 1 0 2.83l-4.24 4.24a2 2 0 0 1-2.83 0L4.93 13.76a2 2 0 0 1 0-2.83Z" />
          <circle cx="10" cy="10" r="0.8" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'On-Time Delivery',
      desc: 'Packed with care and delivered exactly when promised.',
      delay: '5',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 15 14" />
        </svg>
      )
    }
  ];

  return (
    <section className="why" id="why">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Our Promise</p>
        <h2 className="section-title">Why Choose Bliss Mish</h2>
      </div>

      <div className="why__grid">
        {points.map((pt, index) => (
          <div className="why-card reveal" data-reveal="up" data-delay={pt.delay} key={index}>
            <div className="why-card__icon">
              {pt.icon}
            </div>
            <h3>{pt.title}</h3>
            <p>{pt.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
