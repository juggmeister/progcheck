import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollLockOptions {
  enabled?: boolean;
  snapThreshold?: number;
  lockDuration?: number;
}

export const useScrollLock = (options: UseScrollLockOptions = {}) => {
  const {
    enabled = true,
    snapThreshold = 0.1,
    lockDuration = 1000,
  } = options;

  const [isLocked, setIsLocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef<number>(0);
  const scrollVelocity = useRef<number>(0);
  const isScrolling = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;
    let lastScrollY = window.scrollY;
    let scrollDirection: 'up' | 'down' = 'down';

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY;
          const now = Date.now();
          const timeDelta = now - lastScrollTime.current;

          // Calculate scroll velocity
          if (timeDelta > 0) {
            scrollVelocity.current = Math.abs(scrollDelta / timeDelta) * 1000;
          }

          lastScrollTime.current = now;
          scrollDirection = scrollDelta > 0 ? 'down' : 'up';
          lastScrollY = currentScrollY;

          // Calculate scroll progress
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const maxScroll = documentHeight - windowHeight;
          const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;
          setScrollProgress(Math.min(Math.max(progress, 0), 1));

          // Determine current section
          const sections = document.querySelectorAll('section[data-scroll-section]');
          let activeSection = 0;
          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
              activeSection = index;
            }
          });
          setCurrentSection(activeSection);

          // Lock scroll if velocity is high (but only briefly)
          if (scrollVelocity.current > 3 && !isLocked && !isScrolling.current) {
            isScrolling.current = true;

            // Clear existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }

            // Brief lock during fast scrolling
            scrollTimeoutRef.current = setTimeout(() => {
              isScrolling.current = false;
            }, 300);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, snapThreshold, lockDuration, isLocked]);

  const scrollToSection = useCallback((sectionIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const sections = document.querySelectorAll('section[data-scroll-section]');
    if (sections[sectionIndex]) {
      setIsLocked(true);
      sections[sectionIndex].scrollIntoView({ 
        behavior, 
        block: 'start',
        inline: 'nearest'
      });
      setTimeout(() => {
        setIsLocked(false);
        isScrolling.current = false;
      }, 1000);
    }
  }, []);

  return {
    isLocked,
    scrollProgress,
    currentSection,
    scrollVelocity: scrollVelocity.current,
    scrollToSection,
    isScrolling: isScrolling.current,
  };
};

export default useScrollLock;

