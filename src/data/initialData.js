export const INITIAL_PRODUCTS = [
  { id: 'prod-1', title: 'Birthday Cakes', image: '/white.png', price: 'Custom Design' },
  { id: 'prod-2', title: 'Mangoo cake', image: '/mango.png', price: 'Seasonal Fresh' },
  { id: 'prod-3', title: 'Choco cake', image: '/cakechoco.png', price: 'Rich Cocoa' },
  { id: 'prod-4', title: 'Brownie cake', image: '/brownie.png', price: 'Fudge Layered' },
  { id: 'prod-5', title: 'Dry nut cake', image: '/birthdaycake.png', price: 'Roasted Nuts' },
  { id: 'prod-6', title: 'Cupcakes', image: '/softybrown.png', price: 'Pack of 6/12' },
  { id: 'prod-7', title: 'Dry bread', image: '/bread.png', price: 'Artisanal Loaf' },
  { id: 'prod-8', title: 'Bun', image: '/bun.png', price: 'Freshly Baked' },
  { id: 'prod-9', title: 'Choco Bliss Cake', image: '/vanillacoco.png', price: 'Chef Special' },
  { id: 'prod-10', title: 'Lotus Biscoff Cake', image: '/biscuitcake.jpeg', price: 'Caramelized Crunch' },
  { id: 'prod-11', title: 'Blush Strawberry Cake', image: '/strawberrycake.png', price: 'Berry Infused' },
  { id: 'prod-12', title: 'Golden Truffle Cake', image: '/chocolatecake.jpeg', price: 'Premium Dark' },
];

export const INITIAL_FEATURED = [
  { id: 'feat-1', src: '/circle.png', alt: 'Donuts', isTall: false, delay: '0', fallbackText: 'cake1.jpg' },
  { id: 'feat-2', src: '/banana.png', alt: 'Orchard Parfait', isTall: true, delay: '1', fallbackText: 'cake2.jpg' },
  { id: 'feat-3', src: '/cookies.png', alt: 'Cookies', isTall: false, delay: '2', fallbackText: 'cake3.jpg' },
  { id: 'feat-4', src: '/softyblack.png', alt: 'Mini Chocolate Cupcakes', isTall: false, delay: '3', fallbackText: 'cake4.jpg' },
  { id: 'feat-5', src: '/red.png', alt: 'Red Velvet Cupcake', isTall: true, delay: '0', fallbackText: 'hero-cake.png' },
  { id: 'feat-6', src: '/softybrown.png', alt: 'Pecan Muffin', isTall: false, delay: '1', fallbackText: 'cake1.jpg' },
  { id: 'feat-7', src: '/WhiteBread.png', alt: 'White Bread', isTall: false, delay: '1', fallbackText: 'cake1.jpg' },
];

export const STORAGE_KEYS = {
  PRODUCTS: 'blissmish_products_data_v1',
  FEATURED: 'blissmish_featured_data_v1',
};

export const loadStoredProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Error loading stored products:', err);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products to localStorage:', err);
  }
};

export const loadStoredFeatured = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEATURED);
    if (!raw) return INITIAL_FEATURED;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_FEATURED;
  } catch (err) {
    console.error('Error loading stored featured items:', err);
    return INITIAL_FEATURED;
  }
};

export const saveStoredFeatured = (featured) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FEATURED, JSON.stringify(featured));
  } catch (err) {
    console.error('Error saving featured items to localStorage:', err);
  }
};
