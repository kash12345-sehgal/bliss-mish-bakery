import { useState } from 'react';

export default function OrderForm() {
  const WHATSAPP_NUMBER = '919729729901';

  const [formData, setFormData] = useState({
    custName: '',
    custPhone: '',
    cakeCategory: '',
    flavour: '',
    weight: '',
    deliveryDate: '',
    deliveryTime: '',
    address: '',
    customMessage: '',
    instructions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      'Hello Bliss Mish Bakery! I would like to place a cake order 🎂',
      '',
      `*Name:* ${formData.custName.trim()}`,
      `*Phone:* ${formData.custPhone.trim()}`,
      `*Product Category:* ${formData.cakeCategory}`,
      `*Flavour:* ${formData.flavour.trim()}`,
      `*Weight:* ${formData.weight}`,
      `*Delivery Date:* ${formData.deliveryDate}`,
      `*Delivery Time:* ${formData.deliveryTime}`,
      `*Delivery Address:* ${formData.address.trim()}`,
    ];

    if (formData.customMessage.trim()) {
      lines.push(`*Cake Message:* ${formData.customMessage.trim()}`);
    }
    if (formData.instructions.trim()) {
      lines.push(`*Special Instructions:* ${formData.instructions.trim()}`);
    }

    lines.push(
      '',
      '📌 *Note:* Please share reference photos (if any) and do send your review once you receive the cake! 🍰'
    );

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');
  };

  const categories = [
    'Birthday Cakes',
    'Mangoo cake',
    'Choco cake',
    'Brownie cake',
    'Dry nut cake',
    'Cupcakes',  
    'White bread',
    'Buns',  
    'Donuts',
    'Cookies',
    'Orchard Parfait'
  ];

  const weights = [
    '1 Kg',
    '1.5 Kg',
    '2 Kg',
    '3 Kg+',
  ];

  return (
    <section className="order" id="order">
      <div className="order__inner">
        <div className="section-head section-head--left reveal" data-reveal="up">
          <p className="section-eyebrow">Let's Bake Something Special</p>
          <h2 className="section-title">Place Your Order</h2>
          <p className="section-desc">
            Fill in the details below — it opens straight into WhatsApp so we can confirm flavours and design with you personally.
          </p>

          <div className="order__quick-actions">
            <a href="tel:+919729729901" className="btn btn--outline-cocoa">📞 Call Now</a>
            <a href="https://wa.me/9729729901" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">💬 WhatsApp Us</a>
          </div>
        </div>

        <form className="order__form reveal" data-reveal="right" id="orderForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <input
                type="text"
                id="custName"
                name="custName"
                placeholder=" "
                required
                value={formData.custName}
                onChange={handleChange}
              />
              <label htmlFor="custName">Customer Name</label>
            </div>
            <div className="form-field">
              <input
                type="tel"
                id="custPhone"
                name="custPhone"
                placeholder=" "
                required
                value={formData.custPhone}
                onChange={handleChange}
              />
              <label htmlFor="custPhone">Phone number</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <select
                id="cakeCategory"
                name="cakeCategory"
                required
                value={formData.cakeCategory}
                onChange={handleChange}
              >
                <option value="" disabled></option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <label htmlFor="cakeCategory">Cake Category</label>
            </div>
            <div className="form-field">
              <input
                type="text"
                id="flavour"
                name="flavour"
                placeholder=" "
                required
                value={formData.flavour}
                onChange={handleChange}
              />
              <label htmlFor="flavour">Flavour</label>
            </div>
          </div>

          <div className="form-row--three">
            <div className="form-field">
              <select
                id="weight"
                name="weight"
                required
                value={formData.weight}
                onChange={handleChange}
              >
                <option value="" disabled></option>
                {weights.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <label htmlFor="weight">Weight</label>
            </div>
            <div className="form-field">
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                placeholder=" "
                required
                value={formData.deliveryDate}
                onChange={handleChange}
              />
              <label htmlFor="deliveryDate">Delivery Date</label>
            </div>
            <div className="form-field">
              <input
                type="time"
                id="deliveryTime"
                name="deliveryTime"
                placeholder=" "
                required
                value={formData.deliveryTime}
                onChange={handleChange}
              />
              <label htmlFor="deliveryTime">Delivery Time</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field--full">
              <input
                type="text"
                id="address"
                name="address"
                placeholder=" "
                required
                value={formData.address}
                onChange={handleChange}
              />
              <label htmlFor="address">Delivery Address</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field--full">
              <textarea
                id="customMessage"
                name="customMessage"
                placeholder=" "
                rows="2"
                value={formData.customMessage}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="customMessage">Custom Message (e.g. "Happy Birthday Riya")</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field--full">
              <textarea
                id="instructions"
                name="instructions"
                placeholder=" "
                rows="2"
                value={formData.instructions}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="instructions">Special Instructions</label>
            </div>
          </div>

          <button type="submit" className="btn btn--gold btn--block">
            <span>Place Order via WhatsApp</span>
          </button>
          <p className="order__note">Tapping "Place Order" opens WhatsApp with your order details filled in, ready to send.</p>
        </form>
      </div>
    </section>
  );
}
