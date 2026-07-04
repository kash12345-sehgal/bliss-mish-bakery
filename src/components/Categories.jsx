export default function Categories() {
  const cakeCategories = [
    { title: 'Birthday Cakes', price: 'Starting ₹699', image: '/white.png' },
    { title: 'mangoo cake', price: '₹399', image: '/mango.png' },
    { title: 'choco cake', price: '₹450', image: '/cakechoco.png' },
    { title: 'Brownie cake', price: '₹550', image: '/brownie.png' },
    { title: 'dry nut cake', price: '₹450', image: '/birthdaycake.png' },
    { title: 'cupcakes', price: '₹50', image: '/softybrown.png' },
    { title: 'dry bread', price: '₹450', image: '/bread.png' },
    { title: 'bun', price: '₹450', image: '/bun.png' },
  ];

  return (
    <section className="categories" id="cakes">
      <div className="section-head reveal" data-reveal="up">
        <p className="section-eyebrow">Made To Order</p>
        <h2 className="section-title">Our Cake Categories</h2>
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
