export default function Categories() {
  const cakeCategories = [
    { title: 'Birthday Cakes',  image: '/white.png' },
    { title: 'Mangoo cake',     image: '/mango.png' },
    { title: 'Choco cake',      image: '/cakechoco.png' },
    { title: 'Brownie cake',    image: '/brownie.png' },
    { title: 'Dry nut cake',    image: '/birthdaycake.png' },
    { title: 'Cupcakes',        image: '/softybrown.png' },
    { title: 'Dry bread',       image: '/bread.png' },
    { title: 'Bun',             image: '/bun.png' },
    { title: 'Choco Bliss Cake',image:      '/vanillacoco.png' },
    { title: 'Lotus Biscoff Cake',image:    '/biscuitcake.jpeg' },
    { title: 'Blush Strawberry Cake',image: '/strawberrycake.png' },
    { title: 'Golden Truffle Cake',image:   '/chocolatecake.jpeg' },
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
