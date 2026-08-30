import { useBakeryData } from '../context/DataContext';

export default function Categories() {
  const { products } = useBakeryData();

  return (
    <section className="categories" id="cakes">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Made To Order</p>
        <h2 className="section-title">Our Products</h2>
        <p className="section-desc">Every tier, baked fresh from scratch and finished by hand.</p>
      </div>

      <div className="categories__grid">
        {products.map((cake, index) => (
          <article className="cake-card" key={cake.id || index}>
            <div className="cake-card__image">
              <img
                src={cake.image}
                alt={cake.title}
                onError={(e) => {
                  e.currentTarget.src = '/hero-premium.png';
                }}
              />
            </div>
            
            <div className="cake-card__body">
              <h3>{cake.title}</h3>
              {cake.price && <span className="cake-card__price">{cake.price}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

