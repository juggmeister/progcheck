import React from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data: TimelineEntry[] = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Built and launched RTP Community Hub to connect neighbors and empower families in the Research Triangle Park area.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=500&fit=crop"
              alt="Community gathering"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=500&fit=crop"
              alt="Community support"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=500&fit=crop"
              alt="Team collaboration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop"
              alt="Community resources"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2024",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Launched the resource directory feature, allowing community members to discover local services and support organizations.
          </p>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Integrated submission forms to enable community members to share new resources and help expand the directory.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop"
              alt="Resource directory"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop"
              alt="Community services"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
              alt="Support network"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=500&fit=crop"
              alt="Community engagement"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-4">
            Initial planning and development of the RTP Community Hub platform.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              ✅ Community resource database
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              ✅ Featured resources carousel
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              ✅ Search and filter functionality
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              ✅ Submission form integration
            </div>
            <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
              ✅ Responsive design implementation
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=500&fit=crop"
              alt="Development process"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=500&fit=crop"
              alt="Planning phase"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop"
              alt="Design system"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop"
              alt="User research"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen w-full">
      <Timeline 
        data={data}
        title="Our Journey"
        description="Building connections and empowering the Research Triangle Park community, one resource at a time."
      />
    </div>
  );
}
