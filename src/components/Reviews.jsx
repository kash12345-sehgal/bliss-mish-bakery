import { useState, useEffect, useRef } from 'react';

const reviewsData = [
  {
    text: '"Nancy se humne birthday cake order kiya tha, design bilkul exact waisa hi banaya jaisa photo me tha aur taste to ek number th. Thank you so much!"',
    name: 'Priya Sharma',
    role: 'Birthday Cake',
    date: '2 weeks ago',
    source: 'Google Review',
    verified: true
  },
  {
    text: '"Donuts mangwaye the family ke liye. Bhai sach me maza aa gaya!"',
    name: 'Arjun Kumar',
    role: 'Donuts',
    date: '1 month ago',
    source: 'WhatsApp Order',
    verified: true
  },
  {
    text: '"Chocolate cake bahut hi badhiya tha, bache toh ekdum khush ho gaye. Delivery bhi time par hui aur taste bhi gazab tha."',
    name: 'Anju Devi',
    role: 'Choco Cake',
    date: '3 days ago',
    source: 'Google Review',
    verified: true
  },
  {
    text: '"Short notice par brownie cake chahiye tha aur Nancy di ne pure perfection ke saath banaya.Sabne bahut tareef ki!"',
    name: 'Karan',
    role: 'Brownie Cake',
    date: '3 weeks ago',
    source: 'WhatsApp Order',
    verified: true
  }
];

const avatarColors = ['#ECB9C5', '#EAC785', '#E8D5C0', '#F2E4D3'];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const startAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsData.length);
    }, 5500);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsData.length);
    startAutoplay();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
    startAutoplay();
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    startAutoplay();
  };

  return (
    <section className="reviews" id="reviews">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Sweet Words</p>
        <h2 className="section-title">Reviews From Our Happy Customers</h2>
        <p className="section-desc">Your feedback and reviews mean the world to us. Please share your experience, as it helps us bake even better memories for you!</p>
      </div>

      <div className="reviews__slider">
        <button 
          className="reviews__nav reviews__nav--prev" 
          id="reviewPrev" 
          aria-label="Previous review"
          onClick={handlePrev}
        >
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <div className="reviews__track" id="reviewsTrack">
          {reviewsData.map((review, index) => (
            <article 
              key={index} 
              className={`review-card ${index === activeIndex ? 'is-active' : ''}`}
            >
              <div className="review-card__meta">
                <div className="review-card__stars" aria-hidden="true" style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" style={{ width: '15px', height: '15px', fill: 'currentColor' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="review-card__meta-details">
                  <span className="review-card__date">{review.date}</span>
                  <span className="review-card__divider">•</span>
                  {review.verified && (
                    <span className="review-card__verified">
                      <svg viewBox="0 0 24 24" className="verified-check">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {review.source}
                    </span>
                  )}
                </div>
              </div>

              <p className="review-card__text">{review.text}</p>
              
              <div className="review-card__author-wrapper">
                <div 
                  className="review-card__avatar"
                  style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
                >
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="review-card__author">
                  <span className="review-card__name">{review.name}</span>
                  <span className="review-card__role">{review.role} Order</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button 
          className="reviews__nav reviews__nav--next" 
          id="reviewNext" 
          aria-label="Next review"
          onClick={handleNext}
        >
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div className="reviews__dots" id="reviewDots">
        {reviewsData.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? 'is-active' : ''}`}
            aria-label={`Go to review ${index + 1}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <div className="reviews__footer">
        <a 
          href="https://wa.me/919729729901?text=Hi%20Nancy!%20I%20would%20love%20to%20share%20my%20feedback%20for%20the%20cake:"
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn--gold btn--sm"
        >
          <span>✍️ Share Your Feedback</span>
        </a>
      </div>
    </section>
  );
}
