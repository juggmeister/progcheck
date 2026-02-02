import { useRef, useState } from "react";
import Hero from "@/components/Hero";
import FeaturedResources from "@/components/FeaturedResources";
import ResourceDirectory from "@/components/ResourceDirectory";
import SubmissionForm from "@/components/SubmissionForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ImageGallery } from "@/components/ui/image-gallery";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Scroll-driven animations - use window scroll instead
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress - simplified for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      featured: featuredRef,
      directory: directoryRef,
      submit: submitRef,
    };
    
    setIsNavigating(true);
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setIsNavigating(false), 800);
  };

  // Advanced scroll-driven section animations
  const sectionVariants = {
    hidden: { 
      opacity: 0,
      y: 80,
      scale: 0.96
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.15
      }
    }
  };

  // Advanced parallax transforms for sections
  const featuredY = useTransform(scrollYProgress, [0.2, 0.6], [50, -30]);
  const directoryY = useTransform(scrollYProgress, [0.4, 0.8], [50, -30]);
  const submitY = useTransform(scrollYProgress, [0.6, 1], [50, -30]);
  
  // Smooth spring transforms
  const smoothFeaturedY = useSpring(featuredY, { stiffness: 50, damping: 25 });
  const smoothDirectoryY = useSpring(directoryY, { stiffness: 50, damping: 25 });
  const smoothSubmitY = useSpring(submitY, { stiffness: 50, damping: 25 });

  return (
    <div className="relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar onNavigate={scrollToSection} />
        
        {/* Image Gallery - transitions into Hero */}
        <section className="relative">
          <ImageGallery />
        </section>
        
        <motion.section
          ref={heroRef}
          data-scroll-section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <Hero onSearchClick={() => scrollToSection("directory")} />
        </motion.section>
        
        {/* Section Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <motion.section
          ref={featuredRef}
          data-scroll-section
          style={{ y: smoothFeaturedY }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-200px" }}
          className="relative"
        >
          <FeaturedResources />
        </motion.section>
        
        {/* Section Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <motion.section
          ref={directoryRef}
          data-scroll-section
          style={{ y: smoothDirectoryY }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-200px" }}
          className="relative"
        >
          <ResourceDirectory />
        </motion.section>
        
        {/* Section Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <motion.section
          ref={submitRef}
          data-scroll-section
          style={{ y: smoothSubmitY }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-200px" }}
          className="relative"
        >
          <SubmissionForm />
        </motion.section>
        
        {/* Section Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <motion.section
          data-scroll-section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <Footer />
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Index;
