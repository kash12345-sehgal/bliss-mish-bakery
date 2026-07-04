export default function Categories() {
  const cakeCategories = [
    { title: 'Birthday Cakes',  image: '/white.png' },
    { title: 'mangoo cake',     image: '/mango.png' },
    { title: 'choco cake',      image: '/cakechoco.png' },
    { title: 'Brownie cake',    image: '/brownie.png' },
    { title: 'dry nut cake',    image: '/birthdaycake.png' },
    { title: 'cupcakes',        image: '/softybrown.png' },
    { title: 'dry bread',       image: '/bread.png' },
    { title: 'bun',             image: '/bun.png' },
  ];

  return (
    <section className="categories" id="cakes">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Made To Order</p>
        <h2 className="section-title">Our Products</h2>
        <p className="section-desc">Every tier, baked fresh from scratch and finished by hand.</p>
      </div>

      <div className="categories__grid">
        {cakeCategories.map((cake, index) => (
          <article className="cake-card" key={index}>
            <div className="cake-card__image">
              <img src={cake.image} alt={cake.title} />
            </div>
            
            <div className="cake-card__body">
              <h3>{cake.title}</h3>
              <span className="cake-card__price">{cake.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
