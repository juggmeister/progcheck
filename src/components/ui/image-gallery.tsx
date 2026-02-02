import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

const SECTION_HEIGHT = 1500;
const MOBILE_SECTION_HEIGHT = 800;

export const ImageGallery = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme || "light") === "dark";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{ 
        height: `calc(${isMobile ? MOBILE_SECTION_HEIGHT : SECTION_HEIGHT}px + 100vh)` 
      }}
      className={`relative w-full ${isDark ? "bg-[#1f1f1f]" : "bg-[#F8F9FA]"} max-md:overflow-hidden`}
    >
      {/* Desktop version with parallax */}
      <div className="max-md:hidden">
        <CenterImage />
        <ParallaxImages />
      </div>

      {/* Mobile simplified version */}
      <div className="md:hidden px-4 pt-32 pb-16">
        <img 
          src="/RTP1.jpg" 
          alt="RTP Community" 
          className="w-full rounded-md mb-4 object-cover h-64"
        />
        <div className="grid grid-cols-2 gap-2">
          <img src="/RTP2.jpg" alt="RTP Community Resource" className="w-full rounded-sm object-cover h-32" />
          <img src="/RTP3.jpg" alt="RTP Community Resource" className="w-full rounded-sm object-cover h-32" />
          <img src="/RTP4.jpg" alt="RTP Community Resource" className="w-full rounded-sm object-cover h-32" />
          <img src="/RTP5.jpg" alt="RTP Community Resource" className="w-full rounded-sm object-cover h-32" />
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-96 max-md:h-48 ${
          isDark
            ? "bg-[#1f1f1f]"
            : "bg-[#F8F9FA]"
        }`}
      />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/RTP1.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/RTP2.jpg"
        alt="RTP Community Resource"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="/RTP3.jpg"
        alt="RTP Community Resource"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/RTP4.jpg"
        alt="RTP Community Resource"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/RTP5.jpg"
        alt="RTP Community Resource"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
