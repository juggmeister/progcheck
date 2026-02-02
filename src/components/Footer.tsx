import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

const Footer = () => {
  const { ref, isInView } = useScrollAnimation(0.2);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer ref={ref} className="py-16 bg-background border-t border-border/30 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${isDark ? 'bg-theme-dark/15' : 'bg-theme-light/30'}`}>
                  <Heart className={`w-6 h-6 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                </div>
                <p className="text-2xl font-bold text-foreground tracking-tight font-heading">
              RTP Community Hub
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Connecting neighbors and building a stronger Research Triangle Park community together.
              </p>
            </div>
          </div>

          {/* Team Credits */}
          <div className={`text-center py-6 border-t ${isDark ? 'border-theme-deep/18' : 'border-theme-light/50'}`}>
            <p className="text-muted-foreground mb-2">
              Built with <Heart className={`w-4 h-4 inline mx-1 ${isDark ? 'text-rose-400' : 'text-rose-500'}`} /> by 
              <span className={`font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}> Leyao Xiong</span>, 
              <span className={`font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}> Yuvan Vipin</span>, and 
              <span className={`font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}> Lateef Thuray</span>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground/80">
              © {new Date().getFullYear()} RTP Community Resource Hub. Built for TSA Webmaster Competition.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
