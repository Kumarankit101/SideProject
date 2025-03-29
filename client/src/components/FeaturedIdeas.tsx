import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { H2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import IdeaCard from "@/components/IdeaCard";
import type { IdeaWithVotes } from "@shared/schema";

export default function FeaturedIdeas() {
  const [_, setLocation] = useLocation();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { data: ideas, isLoading } = useQuery<IdeaWithVotes[]>({
    queryKey: ["/api/ideas/featured"],
  });
  
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    
    const scrollAmount = carouselRef.current.clientWidth;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <H2 className="mb-0">Featured Ideas</H2>
          <div className="hidden md:flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={() => scrollCarousel("left")}
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => scrollCarousel("right")}
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none' }}
          >
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 snap-start">
                  <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
                </div>
              ))
            ) : ideas?.length ? (
              ideas.map(idea => (
                <div key={idea.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 snap-start">
                  <IdeaCard idea={idea} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-neutral-500">No featured ideas yet</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="link" 
            className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
            onClick={() => setLocation("/explore")}
          >
            View All Ideas
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
