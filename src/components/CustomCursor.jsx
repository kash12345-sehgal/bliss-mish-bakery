import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);

  useEffect(() => {
    // Only initialize on desktop mouse-enabled devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setIsHidden(false);

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      // Place the small central dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const render = () => {
      // Linear interpolation (lerp) for smooth lag/trailing feel
      const lerpFactor = 0.1;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(render);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.cake-card') ||
        target.closest('.gallery__item') ||
        target.closest('.contact-card') ||
        target.closest('.about__cert-img');
        
      setIsHovered(!!isClickable);
    };

    const onMouseLeaveWindow = () => setIsHidden(true);
    const onMouseEnterWindow = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    
    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className={`custom-cursor ${isHovered ? 'custom-cursor--hover' : ''}`}>
      <div ref={dotRef} className="custom-cursor__dot"></div>
      <div ref={ringRef} className="custom-cursor__ring"></div>
    </div>
  );
}
