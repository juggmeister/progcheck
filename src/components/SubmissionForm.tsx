import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/data/resourcesData";
import { motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { submitResource } from "@/services/submissionService";
import { useTheme } from "next-themes";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  address: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email("Invalid email address").max(100).optional().or(z.literal("")),
  website: z.string().url("Invalid URL").max(200).optional().or(z.literal("")),
  submitterName: z.string().min(2, "Your name is required").max(100),
  submitterEmail: z.string().email("Invalid email address").max(100)
});

const SubmissionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: sectionRef, isInView } = useScrollAnimation(0.1);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      submitterName: "",
      submitterEmail: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      await submitResource(values);
      
      toast({
        title: "Submission received!",
        description: "Thank you for suggesting a new resource. We'll review it shortly."
      });
      
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: error instanceof Error 
          ? error.message 
          : "There was an error submitting your resource. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundStyle = isDark 
    ? { backgroundColor: '#1f1f1f' }
    : { backgroundColor: '#F8F9FA' };

  return (
    <section ref={sectionRef} id="submit" className="py-32 md:py-40 relative overflow-hidden max-md:py-20">
      <div className="absolute inset-0 z-0" style={backgroundStyle} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-md:px-3">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              <HandHeart className="w-4 h-4" />
              Contribute
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.2] font-heading max-md:text-3xl max-md:mb-4">
              Submit a{" "}
              <span className={isDark ? 'text-theme-light' : 'text-theme-dark'}>
                Resource
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed max-md:text-base max-md:px-4">
              Know a resource that could help our community? Share it with us!
            </p>
          </motion.div>

          {/* Form with depth */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative rounded-lg border border-border/50 p-1 max-md:p-0.5"
          >
            <div className="relative">
              {/* Layered shadows */}
              <div 
                className={`absolute inset-0 rounded-lg translate-y-4 blur-2xl opacity-20 ${
                  isDark ? 'bg-theme-dark/20' : 'bg-theme-dark/12'
                }`}
              />
              <div 
                className={`absolute inset-0 rounded-lg translate-y-2 blur-xl opacity-15 ${
                  isDark ? 'bg-theme-dark/15' : 'bg-theme-dark/8'
                }`}
              />
              
              <div className={`relative glass-card rounded-lg p-8 md:p-10 border border-border/50 shadow-2xl max-md:p-5`}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-md:space-y-4">
                <div className="space-y-6 max-md:space-y-4">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>
                    Resource Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="max-md:space-y-2">
                        <FormLabel className="max-md:text-sm">Organization Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter organization name" 
                            className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                              isDark ? 'border-theme-deep/25 focus:border-theme-deep/40' : 'border-theme-light/50 focus:border-theme-medium/60'
                            }`}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="max-md:space-y-2">
                        <FormLabel className="max-md:text-sm">Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={`h-12 bg-background/50 rounded-xl max-md:h-10 max-md:text-sm ${
                              isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                            }`}>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className={`glass-card rounded-md ${
                            isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                          }`}>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="max-md:space-y-2">
                        <FormLabel className="max-md:text-sm">Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the services provided..." 
                            className={`min-h-[120px] bg-background/50 rounded-md resize-none max-md:min-h-[100px] max-md:text-sm ${
                              isDark ? 'border-theme-deep/25 focus:border-theme-deep/40' : 'border-theme-light/50 focus:border-theme-medium/60'
                            }`}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-muted-foreground/80">
                          Provide a brief description (10-500 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-3">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="max-md:space-y-2">
                          <FormLabel className="max-md:text-sm">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(555) 123-4567" 
                              className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                                isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                              }`}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="max-md:space-y-2">
                          <FormLabel className="max-md:text-sm">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="contact@example.com" 
                              className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                                isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                              }`}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="max-md:space-y-2">
                        <FormLabel className="max-md:text-sm">Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123 Main Street, City, State" 
                            className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                              isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                            }`}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem className="max-md:space-y-2">
                        <FormLabel className="max-md:text-sm">Website</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com" 
                            className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                              isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                            }`}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={`pt-6 border-t space-y-6 max-md:space-y-4 max-md:pt-4 ${isDark ? 'border-theme-deep/18' : 'border-theme-light/50'}`}>
                  <h3 className={`text-xl font-semibold max-md:text-lg ${isDark ? 'text-theme-light' : 'text-theme-dark'}`}>
                    Your Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-3">
                    <FormField
                      control={form.control}
                      name="submitterName"
                      render={({ field }) => (
                        <FormItem className="max-md:space-y-2">
                          <FormLabel className="max-md:text-sm">Your Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                                isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                              }`}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="submitterEmail"
                      render={({ field }) => (
                        <FormItem className="max-md:space-y-2">
                          <FormLabel className="max-md:text-sm">Your Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your@email.com" 
                              className={`h-12 bg-background/50 rounded-md max-md:h-10 max-md:text-sm ${
                                isDark ? 'border-theme-deep/25' : 'border-theme-light/50'
                              }`}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-14 text-lg font-semibold rounded-md transition-all duration-300 hover:scale-[1.02] shadow-xl ${
                    isDark 
                      ? 'bg-theme-deep hover:bg-theme-medium text-white' 
                      : 'bg-theme-dark hover:bg-theme-deep text-white'
                  }`}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Resource
                    </>
                  )}
                </Button>
              </form>
            </Form>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionForm;
