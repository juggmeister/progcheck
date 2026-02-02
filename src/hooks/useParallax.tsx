import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  enabled?: boolean;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0, enabled = true } = options;
  const elementRef = useRef<HTMLElement | null>(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!elementRef.current) return;

          const currentScrollY = window.scrollY;
          const rect = elementRef.current.getBoundingClientRect();
          const elementTop = rect.top + currentScrollY;
          const windowHeight = window.innerHeight;
          
          // Calculate parallax offset
          const scrollPosition = currentScrollY + windowHeight;
          const elementPosition = elementTop;
          const distance = scrollPosition - elementPosition;
          const parallaxValue = distance * speed + offset;

          setTransform(parallaxValue);
          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, offset, enabled]);

  return {
    ref: elementRef,
    transform,
    style: {
      transform: `translateY(${transform}px)`,
      willChange: 'transform',
    },
  };
};

export default useParallax;

