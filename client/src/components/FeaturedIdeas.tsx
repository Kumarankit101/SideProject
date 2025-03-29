import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { H2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import type { IdeaWithVotes } from "@shared/schema";

export default function FeaturedIdeas() {
  const [_, setLocation] = useLocation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll event for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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

  const navigateToIdea = (id: number) => {
    setLocation(`/idea/${id}`);
  };

  // Calculate parallax sticky effect
  const calculateStickyEffect = () => {
    if (!sectionRef.current) return {};
    
    // Get the section position info
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    
    // Determine if we should apply a sticky effect
    // This creates a "resistance" as the user scrolls, making the section appear to stay visible longer
    if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight + window.innerHeight) {
      const progress = Math.min((scrollY - sectionTop) / (sectionHeight * 0.8), 0.9);
      return {
        transform: `translateY(${progress * 100}px)`,
      };
    }
    
    return {};
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 relative"
      id="featured-ideas-section"
      style={{
        ...calculateStickyEffect(),
        zIndex: 10,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <H2 className="mb-0 relative">
            Featured Ideas
            <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#ccff00]"></div>
          </H2>
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
            className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth snap-x gap-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex-none w-full sm:w-[500px] snap-start">
                  <div className="animate-pulse bg-gray-200 rounded-lg h-[380px]"></div>
                </div>
              ))
            ) : ideas?.length ? (
              ideas.map((idea, index) => (
                <div 
                  key={idea.id} 
                  className="flex-none w-full sm:w-[500px] snap-start relative rounded-lg overflow-hidden cursor-pointer group transition-transform duration-500"
                  onClick={() => navigateToIdea(idea.id)}
                  style={{
                    // Each card moves at a slightly different rate for a staggered parallax effect
                    transform: `translateY(${scrollY * 0.02 * (index % 2 === 0 ? -1 : 1)}px)`,
                  }}
                >
                  {/* Image with overlay */}
                  <div className="relative h-[380px] bg-black">
                    <img 
                      src={idea.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"} 
                      alt={idea.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-300" 
                    />
                    
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
                    
                    {/* Text content positioned on the image */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <div>
                        {/* Tags at the top */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {idea.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-[#ccff00] text-primary text-xs font-bold px-3 py-1 rounded-full transform group-hover:scale-105 transition-transform">
                              {tag}
                            </span>
                          ))}
                          {idea.isTrending && (
                            <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full">
                              TRENDING
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        {/* Title and description at the bottom */}
                        <h3 className="font-montserrat text-2xl font-bold text-white mb-3 group-hover:text-[#ccff00] transition-colors duration-300">{idea.title}</h3>
                        <p className="text-white text-sm mb-6 opacity-90 line-clamp-2">
                          {idea.description}
                        </p>
                        
                        {/* Author and action row */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img 
                              src={idea.author.avatar || `https://ui-avatars.com/api/?name=${idea.author.name}`} 
                              alt={idea.author.name}
                              className="w-8 h-8 rounded-full border-2 border-white" 
                            />
                            <span className="ml-2 text-xs text-white">{idea.author.name}</span>
                          </div>
                          
                          <div className="bg-[#ccff00] p-2 rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
            className="text-primary hover:text-[#ccff00] font-medium inline-flex items-center transition-all duration-300 hover:scale-105"
            onClick={() => setLocation("/explore")}
          >
            View All Ideas
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
