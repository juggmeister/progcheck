import { useState } from "react";
import { Search, Filter, Compass } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResourceCard from "./ResourceCard";
import { resources, categories } from "@/data/resourcesData";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useTheme } from "next-themes";

const ResourceDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { ref: sectionRef, isInView } = useScrollAnimation(0.05);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const backgroundStyle = isDark 
    ? { backgroundColor: '#1f1f1f' }
    : { backgroundColor: '#FFFFFF' };

  return (
    <section ref={sectionRef} id="directory" className="py-32 md:py-40 relative overflow-hidden max-md:py-20">
      <div className="absolute inset-0 z-0" style={backgroundStyle} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-md:px-3">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16 md:mb-20 max-md:mb-10"
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
              <Compass className="w-4 h-4" />
              Directory
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.2] font-heading max-md:text-3xl max-md:mb-4">
              Find{" "}
              <span className={isDark ? 'text-theme-light' : 'text-theme-dark'}>
                Resources
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed max-md:text-base max-md:px-4">
              Search our comprehensive directory of community services and support.
            </p>
          </motion.div>

          {/* Search interface with depth */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative rounded-md border border-border/50 p-1 mb-12 md:mb-16 max-md:mb-8 max-md:p-0.5"
          >
            <div className="relative">
              {/* Shadow layers */}
              <div 
                className={`absolute inset-0 rounded-md translate-y-2 blur-xl opacity-20 ${
                  isDark ? 'bg-theme-dark/15' : 'bg-theme-dark/8'
                }`}
              />
              
              <div className={`relative glass-card rounded-md p-6 md:p-8 border border-border/50 shadow-xl max-md:p-4`}>
            <div className="flex flex-col md:flex-row gap-4 max-md:gap-3">
              <div className="flex-1 relative max-md:w-full">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDark ? 'text-theme-light' : 'text-theme-dark'
                }`} />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-12 h-12 bg-background/50 rounded-sm focus:ring-2 ${
                    isDark 
                      ? 'border-theme-deep/25 focus:ring-theme-deep/25 focus:border-theme-deep/40' 
                      : 'border-theme-light/50 focus:ring-theme-light/50 focus:border-theme-medium/60'
                  }`}
                />
              </div>
              <div className="md:w-64 max-md:w-full">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={`h-12 bg-background/50 rounded-sm ${
                    isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                  }`}>
                    <Filter className={`mr-2 h-4 w-4 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className={`glass-card rounded-sm ${
                    isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                  }`}>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
              </div>
            </div>
          </motion.div>

          {/* Grid layout with depth */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-md:gap-4 max-md:px-2">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: Math.min(index * 0.05 + 0.2, 0.6),
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <ResourceCard resource={resource} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-lg text-muted-foreground">
                  No resources found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <p className={`${isDark ? 'text-theme-light/60' : 'text-theme-dark/70'}`}>
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourceDirectory;
