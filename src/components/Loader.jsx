import { useEffect, useState } from 'react';

export default function Loader({ onLoaded }) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const MIN_LOAD_TIME = 1200;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const wait = Math.max(MIN_LOAD_TIME - elapsed, 0);
      setTimeout(() => {
        setIsHidden(true);
        document.body.style.overflow = '';
        if (onLoaded) {
          onLoaded();
        }
      }, wait);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onLoaded]);

  return (
    <div className={`loader ${isHidden ? 'is-hidden' : ''}`} id="loader" aria-hidden="true">
      <div className="loader-cake">
        <div className="loader-tier loader-tier--1"></div>
        <div className="loader-tier loader-tier--2"></div>
        <div className="loader-cherry"></div>
      </div>
      <p className="loader-text">Bliss Mish Bakery</p>
    </div>
  );
}
