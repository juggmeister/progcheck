import { Search, ArrowRight, Heart, Users, HandHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MorphingText } from "@/components/ui/morphing-text";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { categories } from "@/data/resourcesData";

interface HeroProps {
  onSearchClick: () => void;
}

const Hero = ({ onSearchClick }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme, resolvedTheme } = useTheme();
  // Use resolvedTheme to handle system theme properly, default to light if undefined
  const isDark = (resolvedTheme || theme || "light") === "dark";
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Advanced scroll-driven animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Parallax effects for floating elements
  const floatY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  
  // Smooth spring animations
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Simplified background - clean and minimal
  const backgroundStyle = isDark 
    ? { backgroundColor: '#1f1f1f' }
    : { backgroundColor: '#FFFFFF' };

  // Floating element styles with shadows for depth
  const floatingElements = [
    { 
      icon: Heart, 
      position: "top-[15%] left-[8%]", 
      size: "w-14 h-14",
      color: isDark ? "text-rose-400/60" : "text-rose-400/70",
      bg: isDark ? "bg-rose-500/10" : "bg-rose-100/80",
      shadow: "shadow-xl shadow-rose-500/20",
      delay: 0 
    },
    { 
      icon: Users, 
      position: "top-[25%] right-[10%]", 
      size: "w-16 h-16",
      color: isDark ? "text-theme-light/50" : "text-theme-medium/60",
      bg: isDark ? "bg-theme-dark/8" : "bg-theme-light/20",
      shadow: "shadow-xl shadow-theme-dark/15",
      delay: 0.5 
    },
    { 
      icon: HandHeart, 
      position: "bottom-[30%] left-[5%]", 
      size: "w-12 h-12",
      color: isDark ? "text-theme-light/50" : "text-theme-medium/60",
      bg: isDark ? "bg-theme-dark/8" : "bg-theme-light/20",
      shadow: "shadow-xl shadow-theme-dark/15",
      delay: 1 
    },
    { 
      icon: Sparkles, 
      position: "bottom-[20%] right-[8%]", 
      size: "w-10 h-10",
      color: isDark ? "text-theme-light/50" : "text-theme-medium/60",
      bg: isDark ? "bg-theme-dark/8" : "bg-theme-light/20",
      shadow: "shadow-xl shadow-theme-dark/15",
      delay: 1.5 
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Solid Background - base layer */}
      <div 
        className="absolute inset-0 min-h-screen z-0"
        style={backgroundStyle}
      />

      {/* Floating community icons with 3D depth - Hidden on mobile */}
      <div className="max-md:hidden">
        {floatingElements.map((el, index) => {
          const parallaxY = index % 2 === 0 ? floatY1 : floatY2;
          return (
            <motion.div
              key={index}
              className={`absolute ${el.position} ${el.size} ${el.bg} ${el.shadow} backdrop-blur-sm rounded-md flex items-center justify-center z-10`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                delay: el.delay + 0.5, 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              style={{ y: parallaxY }}
            >
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4 + index, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: el.delay
                }}
              >
                <el.icon className={`${el.size} p-2 ${el.color}`} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Main content with depth card */}
      <motion.div 
        style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full max-md:px-3"
      >
        <div className="max-w-6xl mx-auto">
          {/* Frosted glass card for content - adds depth */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative max-md:scale-100"
          >
            {/* Card shadow layer for 3D effect */}
            <div 
              className="absolute inset-0 rounded-md translate-y-4 blur-2xl opacity-20"
              style={{
                background: isDark 
                  ? 'hsl(0 0% 20%)' 
                  : 'hsl(0 0% 50%)'
              }}
            />
            
            {/* Main card */}
            <div className="relative rounded-md border border-border/50 p-1 max-md:p-0.5">
              <div className={`relative rounded-md p-8 md:p-16 border border-border/50 max-md:p-6 ${
                isDark 
                  ? 'bg-white/5' 
                  : 'bg-white/70'
              } backdrop-blur-xl shadow-2xl max-md:backdrop-blur-sm`}>

              <div className="relative text-center space-y-8 md:space-y-12">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDark 
                  ? 'bg-theme-dark/15 text-theme-medium border border-theme-deep/25' 
                  : 'bg-theme-light/30 text-theme-dark border border-theme-light/50'
                  } shadow-lg`}>
                    <Heart className="w-4 h-4" />
                    Serving Our Community
                  </span>
                </motion.div>

                {/* Main headline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-4"
                >
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight font-heading max-md:text-3xl max-md:leading-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span className="text-foreground">RTP Community</span>
                    <br />
                    <motion.span 
                      className={isDark ? 'text-theme-light' : 'text-theme-dark'}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Resource Hub
                    </motion.span>
                  </motion.h1>
                </motion.div>
                
                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed max-md:text-base max-md:px-4"
                >
                  Connecting neighbors, empowering families, and building a stronger Research Triangle Park community together.
                </motion.p>
                
                {/* Morphing category text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="py-6 md:py-8"
                >
                  <div className="text-center mb-3">
                    <p className="text-sm md:text-base text-muted-foreground font-medium">
                      Providing
                    </p>
                  </div>
                  <div className={`${
                    isDark ? 'text-theme-light' : 'text-theme-dark'
                  }`}>
                    <MorphingText 
                      texts={categories}
                      className="h-14 sm:h-16 md:h-20 lg:h-24 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading px-4"
                    />
                  </div>
                </motion.div>

                {/* CTA buttons with depth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 max-md:gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Button shadow for 3D effect */}
                    <div className={`absolute inset-0 rounded-sm blur-xl opacity-40 translate-y-2 ${
                      isDark ? 'bg-theme-deep' : 'bg-theme-medium'
                    }`} />
                    <Button
                      onClick={onSearchClick}
                      size="lg"
                      className={`relative group font-semibold px-8 py-6 text-base rounded-sm shadow-2xl transition-all duration-300 max-md:px-6 max-md:py-4 max-md:text-sm max-md:w-full ${
                        isDark 
                          ? 'bg-theme-deep hover:bg-theme-medium text-white' 
                          : 'bg-theme-dark hover:bg-theme-deep text-white'
                      }`}
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Find Resources
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className={`group font-semibold px-8 py-6 text-base rounded-sm transition-all duration-300 max-md:px-6 max-md:py-4 max-md:text-sm max-md:w-full ${
                        isDark 
                          ? 'border-2 border-theme-deep/25 hover:border-theme-medium/40 bg-theme-dark/8 hover:bg-theme-dark/15 text-theme-medium' 
                          : 'border-2 border-theme-deep/25 hover:border-theme-deep/40 bg-theme-light/30 hover:bg-theme-light/40 text-theme-dark'
                      } shadow-lg`}
                      onClick={() => {
                        const submitSection = document.getElementById('submit');
                        submitSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <HandHeart className="mr-2 h-5 w-5" />
                      Share a Resource
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
