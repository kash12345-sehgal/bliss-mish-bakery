import { useState, useEffect, useRef } from 'react';

const reviewsData = [
  {
    text: '"The wedding cake was more beautiful than the pictures we showed Nancy. Every single guest asked where we ordered it from."',
    name: 'Priya Sharma',
    role: 'Wedding Cake'
  },
  {
    text: '"Ordered a photo cake for my dad\'s birthday — the print quality and the taste both blew us away. Will order again!"',
    name: 'Arjun Mehta',
    role: 'Photo Cake'
  },
  {
    text: '"Bliss Mish has become our go-to for every celebration. The chocolate cake is unbelievably rich and never too sweet."',
    name: 'Sara Khan',
    role: 'Chocolate Cake'
  },
  {
    text: '"Booked a designer cake on short notice and Nancy Sehgal still delivered something jaw-dropping. Highly highly recommend."',
    name: 'Karan Patel',
    role: 'Designer Cake'
  }
];

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
        <h2 className="section-title">What Our Customers Say</h2>
      </div>

      <div className="reviews__slider">
        <button 
          className="reviews__nav reviews__nav--prev" 
          id="reviewPrev" 
          aria-label="Previous review"
          onClick={handlePrev}
        >
          ‹
        </button>

        <div className="reviews__track" id="reviewsTrack">
          {reviewsData.map((review, index) => (
            <article 
              key={index} 
              className={`review-card ${index === activeIndex ? 'is-active' : ''}`}
            >
              <div className="review-card__stars" aria-hidden="true">★★★★★</div>
              <p className="review-card__text">{review.text}</p>
              <div className="review-card__author">
                <span className="review-card__name">{review.name}</span>
                <span className="review-card__role">{review.role}</span>
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
          ›
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
    </section>
  );
}
