import { MapPin, Phone, Globe, Mail, Mailbox, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Resource } from "@/data/resourcesData";
import { useTheme } from "next-themes";
import { useState } from "react";

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean;
}

const ResourceCard = ({ resource, featured = false }: ResourceCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group h-full flex flex-col rounded-lg border border-border/50 p-1 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative h-full flex flex-col">
          {/* Layered shadow for depth */}
          <div 
            className={`absolute inset-0 rounded-lg translate-y-2 blur-xl opacity-30 transition-opacity duration-300 ${
              isDark ? 'bg-theme-dark/15' : 'bg-theme-dark/8'
            }`}
          />
          <div 
            className={`absolute inset-0 rounded-lg translate-y-1 blur-lg opacity-20 transition-opacity duration-300 ${
              isDark ? 'bg-theme-dark/12' : 'bg-theme-dark/6'
            }`}
          />
          
          <div className={`relative glass-card h-full flex flex-col rounded-lg p-6 md:p-8 focus:outline-none focus-visible:outline-none transition-all duration-300 border border-border/50 ${
            isDark ? 'hover:border-black/60 hover:bg-black/10' : 'hover:border-black/40 hover:bg-black/5'
          } shadow-2xl`}>
        <div className="space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-foreground leading-tight font-heading">
            {resource.name}
          </h3>
          {featured && (
            <Badge className={`shrink-0 rounded-full px-3 border-0 ${
              isDark 
                ? 'bg-theme-dark/15 text-theme-light' 
                : 'bg-theme-light/30 text-theme-dark'
            }`}>
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        
        <Badge variant="outline" className={`w-fit rounded-full font-normal ${
          isDark 
            ? 'border-theme-deep/25 text-theme-light' 
            : 'border-theme-light/50 text-theme-dark'
        }`}>
          {resource.category}
        </Badge>
        
        {/* Description */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {resource.description}
        </p>
        
        {/* Contact Details */}
        <div className="space-y-2.5 text-sm flex-1 min-h-0">
          {resource.address && (
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className={`h-4 w-4 mt-0.5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
              <span className="line-clamp-2">{resource.address}</span>
            </div>
          )}
          {resource.phone && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className={`h-4 w-4 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
              <a 
                href={`tel:${resource.phone}`} 
                onClick={(e) => e.stopPropagation()}
                className={`transition-colors ${
                  isDark ? 'hover:text-theme-light' : 'hover:text-theme-dark'
                }`}
              >
                {resource.phone}
              </a>
            </div>
          )}
          {resource.email && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className={`h-4 w-4 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
              <a 
                href={`mailto:${resource.email}`} 
                onClick={(e) => e.stopPropagation()}
                className={`transition-colors line-clamp-1 ${
                  isDark ? 'hover:text-theme-light' : 'hover:text-theme-dark'
                }`}
              >
                {resource.email}
              </a>
            </div>
          )}
          {resource.website && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Globe className={`h-4 w-4 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
              <a 
                href={resource.website} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`transition-colors ${
                  isDark ? 'hover:text-theme-light' : 'hover:text-theme-dark'
                }`}
              >
                Visit Website
              </a>
            </div>
          )}
          {resource.mail && (
            <div className="flex items-start gap-3 text-muted-foreground">
              <Mailbox className={`h-4 w-4 mt-0.5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
              <span className="line-clamp-2">{resource.mail}</span>
            </div>
          )}
        </div>

        {/* Hours */}
        {resource.hours && (
          <div className={`pt-4 mt-auto border-t ${isDark ? 'border-theme-deep/18' : 'border-theme-light/50'}`}>
            <p className="text-sm text-muted-foreground">
              <span className={`font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>Hours:</span> {resource.hours}
            </p>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>

    {/* Expanded Dialog */}
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-border/50 ${
        isDark ? 'bg-theme-dark/95' : 'bg-white/95'
      } backdrop-blur-xl`}>
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <DialogTitle className="text-3xl font-bold text-foreground leading-tight font-heading pr-8">
              {resource.name}
            </DialogTitle>
            {featured && (
              <Badge className={`shrink-0 rounded-full px-3 border-0 ${
                isDark 
                  ? 'bg-theme-medium/20 text-theme-light' 
                  : 'bg-theme-light/40 text-theme-dark'
              }`}>
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <Badge variant="outline" className={`w-fit rounded-full font-normal ${
            isDark 
              ? 'border-theme-deep/25 text-theme-light' 
              : 'border-theme-light/50 text-theme-dark'
          }`}>
            {resource.category}
          </Badge>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Full Description */}
          <div>
            <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>
              About
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Contact Details - Full */}
          <div className="space-y-4">
            <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>
              Contact Information
            </h4>
            
            {resource.address && (
              <div className="flex items-start gap-4 text-muted-foreground">
                <MapPin className={`h-5 w-5 mt-0.5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                <div>
                  <span className={`text-sm font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>Address:</span>
                  <p className="mt-1">{resource.address}</p>
                </div>
              </div>
            )}
            
            {resource.phone && (
              <div className="flex items-center gap-4 text-muted-foreground">
                <Phone className={`h-5 w-5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                <div>
                  <span className={`text-sm font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>Phone:</span>
                  <a href={`tel:${resource.phone}`} className={`ml-2 transition-colors ${
                    isDark ? 'hover:text-theme-light' : 'hover:text-theme-dark'
                  }`}>
                    {resource.phone}
                  </a>
                </div>
              </div>
            )}
            
            {resource.email && (
              <div className="flex items-center gap-4 text-muted-foreground">
                <Mail className={`h-5 w-5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                <div>
                  <span className={`text-sm font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>Email:</span>
                  <a href={`mailto:${resource.email}`} className={`ml-2 transition-colors ${
                    isDark ? 'hover:text-theme-light' : 'hover:text-theme-dark'
                  }`}>
                    {resource.email}
                  </a>
                </div>
              </div>
            )}
            
            {resource.website && (
              <div className="flex items-center gap-4 text-muted-foreground">
                <Globe className={`h-5 w-5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                <div>
                  <span className={`text-sm font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>Website:</span>
                  <a 
                    href={resource.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`ml-2 transition-colors ${
                      isDark ? 'hover:text-theme-light' : 'hover:text-theme-dark'
                    }`}
                  >
                    {resource.website}
                  </a>
                </div>
              </div>
            )}
            
            {resource.mail && (
              <div className="flex items-start gap-4 text-muted-foreground">
                <Mailbox className={`h-5 w-5 mt-0.5 shrink-0 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`} />
                <div>
                  <span className={`text-sm font-medium ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>Mailing Address:</span>
                  <p className="mt-1">{resource.mail}</p>
                </div>
              </div>
            )}
          </div>

          {/* Hours */}
          {resource.hours && (
            <div className={`pt-4 border-t ${isDark ? 'border-theme-deep/18' : 'border-theme-light/50'}`}>
              <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>
                Hours of Operation
              </h4>
              <p className="text-muted-foreground">
                {resource.hours}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ResourceCard;
