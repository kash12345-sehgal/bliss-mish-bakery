import { useBakeryData } from '../context/DataContext';

export default function Gallery() {
  const { featured } = useBakeryData();

  const handleImageError = (e) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section className="gallery" id="gallery">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Fresh From The Kitchen</p>
        <h2 className="section-title">Featured Creations</h2>
      </div>

      <div className="gallery__grid">
        {featured.map((item, index) => (
          <div
            key={item.id || index}
            className={`gallery__item ${item.isTall ? 'gallery__item--tall' : ''} reveal`}
            data-reveal="zoom"
            data-delay={item.delay || (index % 4).toString()}
          >
            <img
              src={item.src}
              alt={item.alt}
              onError={handleImageError}
            />
            <div className="gallery__fallback">
              <span className="img-placeholder">{item.fallbackText || item.alt}</span>
            </div>
            <div className="gallery__overlay">
              <span>{item.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

