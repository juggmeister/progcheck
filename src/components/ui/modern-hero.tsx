"use client";
import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { Heart, ArrowRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "next-themes";

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

export const SmoothScrollHero = () => {
  return (
    <ReactLenis root>
      <div className="bg-background">
        <Nav />
        <Hero />
        <Schedule />
      </div>
    </ReactLenis>
  );
};

const Nav = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme || "light") === "dark";

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 ${
      isDark ? 'text-white' : 'text-foreground'
    }`}>
      <Heart className="text-3xl mix-blend-difference" />
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className={`flex items-center gap-1 text-xs transition-colors ${
          isDark ? 'text-zinc-400 hover:text-zinc-300' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        RESOURCE DIRECTORY <ArrowRight className="w-3 h-3" />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme || "light") === "dark";

  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className={`absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b ${
        isDark 
          ? 'from-background/0 to-background' 
          : 'from-background/0 to-background'
      }`} />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme || "light") === "dark";

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
        backgroundImage:
          "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2670&auto=format&fit=crop)",
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
        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2670&auto=format&fit=crop"
        alt="Community gathering"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2670&auto=format&fit=crop"
        alt="Community support"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2370&auto=format&fit=crop"
        alt="Team collaboration"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
        alt="Community resources"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

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

const Schedule = () => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme || "light") === "dark";

  return (
    <section
      id="launch-schedule"
      className={`mx-auto max-w-5xl px-4 py-48 ${
        isDark ? 'text-white' : 'text-foreground'
      }`}
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className={`mb-20 text-4xl font-black uppercase ${
          isDark ? 'text-zinc-50' : 'text-foreground'
        }`}
      >
        Featured Resources
      </motion.h1>
      <ScheduleItem title="The Carying Place" date="Housing Support" location="Cary, NC" />
      <ScheduleItem title="NeighborUp" date="Community Building" location="RTP Area" />
      <ScheduleItem title="Center for Volunteer Caregiving" date="Volunteer Services" location="Triangle Area" />
      <ScheduleItem title="Preserving Home" date="Home Repair" location="Cary, NC" />
      <ScheduleItem title="Food Bank of Central & Eastern NC" date="Food Assistance" location="Raleigh, NC" />
      <ScheduleItem title="Wake County Human Services" date="Social Services" location="Wake County" />
      <ScheduleItem title="Triangle Family Services" date="Family Support" location="Durham, NC" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme || "light") === "dark";

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={`mb-9 flex items-center justify-between border-b px-3 pb-9 ${
        isDark ? 'border-zinc-800' : 'border-border'
      }`}
    >
      <div>
        <p className={`mb-1.5 text-xl ${
          isDark ? 'text-zinc-50' : 'text-foreground'
        }`}>{title}</p>
        <p className={`text-sm uppercase ${
          isDark ? 'text-zinc-500' : 'text-muted-foreground'
        }`}>{date}</p>
      </div>
      <div className={`flex items-center gap-1.5 text-end text-sm uppercase ${
        isDark ? 'text-zinc-500' : 'text-muted-foreground'
      }`}>
        <p>{location}</p>
        <MapPin className="w-4 h-4" />
      </div>
    </motion.div>
  );
};
