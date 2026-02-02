import ResourceCard from "./ResourceCard";
import { resources } from "@/data/resourcesData";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CardCarousel } from "@/components/ui/card-carousel";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

const FeaturedResources = () => {
  // Filter and order featured resources: Caring Place, NeighborUp, TCVC
  const featuredResources = resources
    .filter(resource => resource.featured)
    .sort((a, b) => {
      // Explicit order: Caring Place (id: "1"), NeighborUp (id: "3"), TCVC (id: "4")
      const order = ["1", "3", "4"];
      const aIndex = order.indexOf(a.id);
      const bIndex = order.indexOf(b.id);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  const { ref: sectionRef, isInView } = useScrollAnimation(0.1);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const backgroundStyle = isDark 
    ? { backgroundColor: '#1f1f1f' }
    : { backgroundColor: '#F8F9FA' };

  return (
    <section ref={sectionRef} className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={backgroundStyle} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-20 md:mb-24"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full mb-8 uppercase tracking-wider ${
                isDark 
                  ? 'bg-theme-dark/15 text-theme-medium border border-theme-deep/25' 
                  : 'bg-theme-light/30 text-theme-dark border border-theme-light/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Top Picks
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.2] font-heading">
              Featured{" "}
              <span className={isDark ? 'text-theme-light' : 'text-theme-dark'}>
                Resources
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Our carefully selected community resources to help you get started.
            </p>
          </motion.div>

          {/* Card Carousel */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mb-20 md:mb-24"
              >
            <CardCarousel
              resources={featuredResources}
              autoplayDelay={2000}
              showPagination={true}
              showNavigation={true}
            />
              </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;
