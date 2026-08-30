import { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
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
import CustomCursor from './components/CustomCursor';
import AdminPortal from './components/AdminPortal';

function isUpDataRoute() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
  return path === '/up-data' || hash === '#/up-data' || hash === '#up-data';
}

function BakeryApp() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(() => (isUpDataRoute() ? '/up-data' : '/'));

  useEffect(() => {
    const handleLocationChange = () => {
      if (isUpDataRoute()) {
        setCurrentRoute('/up-data');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    if (path.includes('up-data')) {
      setCurrentRoute('/up-data');
    } else {
      setCurrentRoute('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!loaderFinished || currentRoute === '/up-data') return;

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
  }, [loaderFinished, currentRoute]);

  // If secret /up-data route is visited
  if (currentRoute === '/up-data') {
    return (
      <>
        <CustomCursor />
        <AdminPortal onNavigateHome={() => navigate('/')} />
      </>
    );
  }

  // Standard Bakery Website
  return (
    <>
      <CustomCursor />
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

export default function App() {
  return (
    <DataProvider>
      <BakeryApp />
    </DataProvider>
  );
}
