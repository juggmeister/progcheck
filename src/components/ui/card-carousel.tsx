"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Sparkles } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"
import { Badge } from "@/components/ui/badge"
import ResourceCard from "@/components/ResourceCard"
import type { Resource } from "@/data/resourcesData"

interface CarouselProps {
  resources: Resource[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
  resources,
  autoplayDelay = 2000,
  showPagination = true,
  showNavigation = true,
}) => {

  const css = `
  .card-carousel-swiper {
    width: 100%;
    padding: 40px 80px 80px 80px;
    overflow: visible;
  }
  
  .card-carousel-swiper .swiper-slide {
    width: 500px !important;
    height: auto;
    display: flex;
    align-items: stretch;
  }
  
  .card-carousel-swiper .swiper-slide > div {
    width: 100%;
    height: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }
  
  .card-carousel-swiper .swiper-button-next,
  .card-carousel-swiper .swiper-button-prev {
    color: hsl(var(--foreground));
    opacity: 0.7;
    width: 44px;
    height: 44px;
    margin-top: -22px;
  }
  
  .card-carousel-swiper .swiper-button-next:after,
  .card-carousel-swiper .swiper-button-prev:after {
    font-size: 20px;
  }
  
  .card-carousel-swiper .swiper-button-next:hover,
  .card-carousel-swiper .swiper-button-prev:hover {
    opacity: 1;
  }
  
  .card-carousel-swiper .swiper-pagination {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: auto !important;
    position: absolute;
  }
  
  .card-carousel-swiper .swiper-pagination-bullet {
    background: hsl(var(--foreground));
    opacity: 0.5;
    width: 10px;
    height: 10px;
    margin: 0 4px;
  }
  
  .card-carousel-swiper .swiper-pagination-bullet-active {
    opacity: 1;
    width: 24px;
    border-radius: 5px;
  }
  
  @media (max-width: 768px) {
    .card-carousel-swiper {
      padding: 20px 16px 60px 16px !important;
    }
    
    .card-carousel-swiper .swiper-slide {
      width: 85vw !important;
      max-width: 400px !important;
      height: auto;
    }
    
    /* Hide navigation on mobile */
    .card-carousel-swiper .swiper-button-next,
    .card-carousel-swiper .swiper-button-prev {
      display: none !important;
    }
    
    /* Simplify pagination on mobile */
    .card-carousel-swiper .swiper-pagination {
      bottom: 10px !important;
    }
  }
  `
  return (
    <section 
      className="w-full space-y-4 flex justify-center"
    >
      <style>{css}</style>
      <div className="mx-auto w-full max-w-7xl rounded-[18px] border border-border/50 p-4 shadow-sm md:rounded-t-[32px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[18px] border border-border/50 bg-card/50 backdrop-blur-sm p-4 shadow-sm md:items-start md:gap-8 md:rounded-b-[16px] md:rounded-t-[28px] md:p-6">
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-[10px] border border-border/50 text-base md:left-6"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Featured Resources
          </Badge>

          <div className="flex w-full items-center justify-center gap-4 overflow-hidden pt-14">
            <div className="w-full">
              <Swiper
                className="card-carousel-swiper"
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={false}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 200,
                  modifier: 1.2,
                  slideShadows: false,
                }}
                pagination={
                  showPagination
                    ? {
                        clickable: true,
                      }
                    : false
                }
                navigation={showNavigation}
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                breakpoints={{
                  320: {
                    spaceBetween: 30,
                  },
                  768: {
                    spaceBetween: 40,
                  },
                  1024: {
                    spaceBetween: 50,
                  },
                }}
              >
                {resources.map((resource, index) => (
                  <SwiperSlide key={`${resource.id}-${index}`}>
                    <div className="h-full w-full">
                      <ResourceCard resource={resource} featured />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
