import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { H2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
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

  const navigateToIdea = (id: number) => {
    setLocation(`/idea/${id}`);
  };

  return (
    <section className="py-16 bg-neutral-100">
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
            className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide scroll-smooth snap-x gap-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="flex-none w-full sm:w-[500px] snap-start">
                  <div className="animate-pulse bg-gray-200 rounded-lg h-[380px]"></div>
                </div>
              ))
            ) : ideas?.length ? (
              ideas.map(idea => (
                <div 
                  key={idea.id} 
                  className="flex-none w-full sm:w-[500px] snap-start relative rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => navigateToIdea(idea.id)}
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
                            <span key={index} className="bg-[#ccff00] text-primary text-xs font-bold px-3 py-1 rounded-full">
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
                        <h3 className="font-montserrat text-2xl font-bold text-white mb-3">{idea.title}</h3>
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
                          
                          <div className="bg-[#ccff00] p-2 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
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
            className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
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
