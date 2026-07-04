export default function WhyChooseUs() {
  const points = [
    {
      title: 'Homemade',
      desc: 'Baked fresh in a real home kitchen, never mass-produced.',
      delay: '0',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 6 6 18v6c0 12 8 18 18 18s18-6 18-18v-6L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M16 22h16M16 28h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: 'Fresh Ingredients',
      desc: 'Sourced daily — real butter, real cream, real flavour.',
      delay: '1',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2"/>
          <path d="M24 14v10l7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Premium Quality',
      desc: 'Every layer finished with patience and a perfectionist\'s eye.',
      delay: '2',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 6l5.5 11.2L42 19l-9 8.8L35 40l-11-6-11 6 2-12.2L6 19l12.5-1.8L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Custom Designs',
      desc: 'Tell us your vision — we sculpt, paint and pipe it to life.',
      delay: '3',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M8 38 28 18M30 8l10 10-6 6-10-10 6-6ZM6 40l6-2 2-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Affordable Prices',
      desc: 'Luxury taste, honest pricing — no hidden costs.',
      delay: '4',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M9 18h30l-3 20H12L9 18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M16 18a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: 'On-Time Delivery',
      desc: 'Packed with care and delivered exactly when promised.',
      delay: '5',
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="6" y="14" width="26" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M32 20h6l4 5v9h-10V20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="14" cy="36" r="3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="34" cy="36" r="3" stroke="currentColor" strokeWidth="2"/>
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
