import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { AuthButton } from "@/components/auth/AuthButton";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "hero", label: "Home" },
  { id: "featured", label: "Featured" },
  { id: "directory", label: "Resources" },
  { id: "submit", label: "Submit" },
];

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 max-md:backdrop-blur-sm ${
        isScrolled 
          ? "glass-nav shadow-sm border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 max-md:px-4">
        <div className="flex items-center justify-between h-16 md:h-20 max-md:h-14">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 font-bold text-foreground transition-all text-lg sm:text-xl tracking-tight hover:opacity-70 max-md:text-base max-md:gap-1.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-1.5 rounded-md max-md:p-1 ${isDark ? 'bg-theme-dark/15' : 'bg-theme-light/30'}`}>
              <Heart className={`w-5 h-5 max-md:w-4 max-md:h-4 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
            </div>
            <span className="hidden sm:inline">RTP Community Hub</span>
            <span className="sm:hidden max-md:text-sm">RTP Hub</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.3 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-foreground/70 hover:text-foreground rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 relative group ${
                    isDark ? 'hover:bg-theme-dark/8' : 'hover:bg-theme-light/30'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 ${
                    isDark ? 'bg-theme-medium' : 'bg-theme-dark'
                  }`} />
                </Button>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="ml-2 flex items-center gap-2"
            >
              <AuthButton />
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <AuthButton />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full justify-start text-foreground/80 hover:text-foreground rounded-md ${
                        isDark ? 'hover:bg-theme-dark/8' : 'hover:bg-theme-light/30'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
