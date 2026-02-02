// Mobile optimization utilities

/**
 * Detect if the current device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Get optimized animation config for mobile devices
 * Reduces animation complexity on mobile for better performance
 */
export const getAnimationConfig = (defaultConfig: {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => {
  if (isMobileDevice()) {
    return {
      ...defaultConfig,
      duration: defaultConfig.duration ? defaultConfig.duration * 0.5 : 0.3,
      delay: defaultConfig.delay ? defaultConfig.delay * 0.5 : 0,
      ease: "easeOut"
    };
  }
  return defaultConfig;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimized transition duration based on device
 */
export const getTransitionDuration = (defaultDuration: number = 0.3): number => {
  if (isMobileDevice() || prefersReducedMotion()) {
    return defaultDuration * 0.5;
  }
  return defaultDuration;
};
