export default function Gallery() {
  const galleryItems = [
    { src: '/circle.png',     alt: 'Donuts', isTall: false, delay: '0', fallbackText: 'cake1.jpg' },
    { src: '/banana.png',     alt: 'Orchard Parfait', isTall: true, delay: '1', fallbackText: 'cake2.jpg' },
    { src: '/cookies.png',    alt: 'Cookies', isTall: false, delay: '2', fallbackText: 'cake3.jpg' },
    { src: '/softyblack.png', alt: 'Mini Chocolate Cupcakes', isTall: false, delay: '3', fallbackText: 'cake4.jpg' },
    { src: '/red.png',        alt: 'Red Velvet Cupcake', isTall: true, delay: '0', fallbackText: 'hero-cake.png' },
    { src: '/softybrown.png', alt: 'Pecan Muffin', isTall: false, delay: '1', fallbackText: 'cake1.jpg' },
    { src: '/WhiteBread.png', alt: 'White Bread', isTall: false, delay: '1', fallbackText: 'cake1.jpg' },

  ];

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
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={`gallery__item ${item.isTall ? 'gallery__item--tall' : ''} reveal`}
            data-reveal="zoom"
            data-delay={item.delay}
          >
            <img
              src={item.src}
              alt={item.alt}
              onError={handleImageError}
            />
            <div className="gallery__fallback">
              <span className="img-placeholder">{item.fallbackText}</span>
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
