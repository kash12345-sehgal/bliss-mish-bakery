import { useState, useEffect } from 'react';
import { scrollToSection } from '../utils';

export default function Hero({ animateTitle }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cakeRy, setCakeRy] = useState('0deg');

  const titleText = 'Bliss Mish Bakery';

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      
      const { innerWidth, innerHeight } = window;
      const xRatio = (e.clientX / innerWidth - 0.5);
      const yRatio = (e.clientY / innerHeight - 0.5);
      
      setMousePos({ x: xRatio, y: yRatio });
      setCakeRy(`${xRatio * 14}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floaters = [
    { className: 'floater--macaron', depth: 30, style: { top: '14%', left: '8%' } },
    { className: 'floater--cupcake', depth: 50, style: { top: '62%', left: '6%' } },
    { className: 'floater--donut', depth: 40, style: { top: '20%', left: '88%' } },
    { className: 'floater--cookie', depth: 25, style: { top: '72%', left: '90%' } },
    { className: 'floater--macaron floater--pink', depth: 60, style: { top: '78%', left: '20%' } },
    { className: 'floater--sparkle', depth: 70, style: { top: '10%', left: '48%' } },
    { className: 'floater--sparkle', depth: 20, style: { top: '85%', left: '55%' } },
    { className: 'floater--cream', depth: 45, style: { top: '38%', left: '92%' } },
    { className: 'floater--cream', depth: 35, style: { top: '8%', left: '25%' } },
    { className: 'floater--cookie floater--small', depth: 55, style: { top: '48%', left: '4%' } },
  ];

  return (
    <section className="hero" id="home">
      <div className="hero__bg-gradient"></div>

      <div className="hero__floaters" id="heroFloaters" aria-hidden="true">
        {floaters.map((f, i) => {
          const moveX = mousePos.x * f.depth;
          const moveY = mousePos.y * f.depth;
          return (
            <div
              key={i}
              className={`floater ${f.className}`}
              style={{
                ...f.style,
                transform: `translate(${moveX}px, ${moveY}px)`,
              }}
            />
          );
        })}
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow fade-in-up" data-delay="0">Home‑Baked &middot; Handcrafted &middot; With Love</p>

        <h1 className="hero__title" id="heroTitle" aria-label={titleText}>
          {animateTitle && titleText.split('').map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{ animationDelay: `${0.25 + i * 0.045}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p className="hero__subtitle fade-in-up" data-delay="1">Freshly Baked With Love <span className="heart">❤</span></p>

        <div className="hero__actions fade-in-up" data-delay="2">
          <a
            href="#order"
            className="btn btn--gold"
            onClick={(e) => { e.preventDefault(); scrollToSection('order'); }}
            data-link
          >
            <span>Order Now</span>
          </a>
          <a
            href="#cakes"
            className="btn btn--glass"
            onClick={(e) => { e.preventDefault(); scrollToSection('cakes'); }}
            data-link
          >
            <span>Explore Our Cakes</span>
          </a>
        </div>
      </div>

      {/* Signature element: 3D rotating layered cake */}
      <div className="hero__cake-stage" aria-hidden="true">
        <div 
          className="cake3d" 
          id="cake3d"
          style={{ '--ry': cakeRy }}
        >
          <div className="cake3d__tier cake3d__tier--bottom">
            <div className="cake3d__face cake3d__face--front"></div>
            <div className="cake3d__face cake3d__face--side"></div>
            <div className="cake3d__face cake3d__face--top"></div>
          </div>
          <div className="cake3d__tier cake3d__tier--middle">
            <div className="cake3d__face cake3d__face--front"></div>
            <div className="cake3d__face cake3d__face--side"></div>
            <div className="cake3d__face cake3d__face--top"></div>
          </div>
          <div className="cake3d__tier cake3d__tier--top">
            <div className="cake3d__face cake3d__face--front"></div>
            <div className="cake3d__face cake3d__face--side"></div>
            <div className="cake3d__face cake3d__face--top"></div>
          </div>
          <div className="cake3d__drip"></div>
          <div className="cake3d__candle">
            <div className="cake3d__flame"></div>
          </div>
        </div>
        <div className="cake3d__plate"></div>
        <div className="cake3d__shadow"></div>
      </div>

      <button
        className="hero__scroll-cue"
        id="scrollCue"
        aria-label="Scroll down"
        onClick={() => scrollToSection('about')}
      >
        <span></span>
      </button>
    </section>
  );
}
