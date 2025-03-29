import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import IdeaCard from "@/components/IdeaCard";
import type { IdeaWithVotes } from "@shared/schema";

declare global {
  interface Window {
    searchTimeout: NodeJS.Timeout;
  }
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [_, setLocation] = useLocation();
  
  // Popular tags for filtering
  const popularTags = [
    "AI", "Mobile", "Web", "Education", "Health", 
    "Environment", "Productivity", "Social", "Finance", "Gaming"
  ];
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    // Debounce the search query
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    window.searchTimeout = setTimeout(() => {
      setDebouncedQuery(e.target.value);
    }, 500);
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedTags([]);
  };
  
  // Fetch ideas with search and tag filters
  const { data: ideas, isLoading } = useQuery<IdeaWithVotes[]>({
    queryKey: ["/api/ideas", debouncedQuery, selectedTags.join(",")],
  });
  
  return (
    <div className="py-20 bg-[#171817]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Ideas</h1>
              <p className="text-gray-400 text-xl max-w-2xl">
                Browse through innovative side project ideas from our community of entrepreneurs.
              </p>
            </div>
            
            {/* Search input */}
            <div className="relative w-full md:w-auto md:min-w-[320px]">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 py-6 bg-[#232323] border-[#3A3A3A] text-white placeholder-gray-500 w-full"
              />
            </div>
          </div>
          
          {/* Filters section */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-gray-400 mr-2">Filter:</span>
            
            {popularTags.map(tag => (
              <Badge 
                key={tag}
                variant="outline"
                className={`cursor-pointer transition-all duration-300 ${
                  selectedTags.includes(tag) 
                    ? 'bg-[#DDF695] text-[#171817] hover:bg-[#DDF695]/80 border-[#DDF695]' 
                    : 'text-white hover:bg-white/10 border-white/30'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            
            {(debouncedQuery || selectedTags.length > 0) && (
              <Button 
                variant="ghost" 
                onClick={clearFilters}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        {/* Ideas grid - modern portfolio style with 2 columns and larger blocks */}
        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="aspect-[4/5] animate-pulse bg-[#232323] rounded-md"></div>
            ))}
          </div>
        ) : ideas?.length ? (
          // Two-column grid with larger blocks
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {ideas.map((idea, index) => (
              <IdeaCard 
                key={idea.id} 
                idea={idea} 
                variant="large" 
              />
            ))}
          </div>
        ) : (
          // No results
          <div className="text-center py-16 bg-[#232323]/50 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-3">No ideas found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              className="bg-[#DDF695] text-[#171817] hover:bg-[#DDF695]/90"
              onClick={() => setLocation("/submit-idea")}
            >
              Submit Your Own Idea
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
