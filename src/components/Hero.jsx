import { scrollToSection } from '../utils';

export default function Hero({ animateTitle }) {
  const titleText = 'Bliss Mish Bakery';

  return (
    <section className="hero" id="home">
      <div className="hero__bg-gradient"></div>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow fade-in-up" data-delay="0">Home‑Baked &middot; Handcrafted &middot; With Love</p>

          <h1 className="hero__title" id="heroTitle" aria-label={titleText}>
            {animateTitle && titleText.split(' ').map((word, wordIdx, wordsArr) => {
              const prevCharsCount = wordsArr.slice(0, wordIdx).join(' ').length + (wordIdx > 0 ? 1 : 0);
              return (
                <span key={wordIdx} className="word">
                  {word.split('').map((char, charIdx) => {
                    const globalIdx = prevCharsCount + charIdx;
                    return (
                      <span
                        key={globalIdx}
                        className="letter"
                        style={{ animationDelay: `${0.25 + globalIdx * 0.045}s` }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {wordIdx < wordsArr.length - 1 && (
                    <span
                      key={prevCharsCount + word.length}
                      className="letter"
                      style={{ animationDelay: `${0.25 + (prevCharsCount + word.length) * 0.045}s` }}
                    >
                      {'\u00A0'}
                    </span>
                  )}
                </span>
              );
            })}
          </h1>

          <p className="hero__subtitle fade-in-up" data-delay="1">
            Handcrafted celebration cakes and artisanal pastries baked fresh daily in Nilokheri, Haryana. Custom designs tailored to bring your sweet visions to life.
          </p>

          <div className="hero__actions fade-in-up" data-delay="2">
            <a
              href="#order"
              className="btn btn--gold"
              onClick={(e) => { e.preventDefault(); scrollToSection('order'); }}
              data-link
            >
              <span>Order Custom Cake</span>
            </a>
            <a
              href="#cakes"
              className="btn btn--glass"
              onClick={(e) => { e.preventDefault(); scrollToSection('cakes'); }}
              data-link
            >
              <span>Explore Menu</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrapper">
            <div className="hero__image-frame">
              <img 
                src="/hero-premium-1.png" 
                alt="Elegant custom celebration cake" 
              />
            </div>
            <div className="hero__image-badge">
              <span className="hero__image-badge-icon"></span>
              <div className="hero__image-badge-text">
                <span className="hero__image-badge-title">Nancy Sehgal</span>
                <span className="hero__image-badge-sub">Certified Baker</span>
              </div>
            </div>
          </div>
        </div>
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
