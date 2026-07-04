import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    if (!loaderFinished) return;

    // Run intersection observer for smooth scroll reveals once loader finishes
    const timer = setTimeout(() => {
      const revealEls = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }, 100);

    return () => clearTimeout(timer);
  }, [loaderFinished]);

  return (
    <>
      <Loader onLoaded={() => setLoaderFinished(true)} />
      <Navbar />
      <main style={{ overflowX: 'hidden' }}>
        <Hero animateTitle={loaderFinished} />
        <About />
        <Categories />
        <Gallery />
        <WhyChooseUs />
        <Reviews />
        <OrderForm />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
