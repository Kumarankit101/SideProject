import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { H2, Paragraph } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import IdeaCard from "@/components/IdeaCard";
import type { IdeaWithVotes } from "@shared/schema";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  // Popular tags for filtering
  const popularTags = [
    "AI", "Mobile", "Web", "Education", "Health", 
    "Environment", "Productivity", "Social", "Finance", "Gaming"
  ];
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    // Debounce the search query
    clearTimeout(window.searchTimeout);
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
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <H2>Explore Ideas</H2>
          <Paragraph className="max-w-2xl mx-auto">
            Browse through innovative side project ideas from our community of entrepreneurs.
          </Paragraph>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for ideas..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 py-6"
              />
            </div>
            <div className="relative">
              <Button 
                variant={selectedTags.length > 0 ? "default" : "outline"} 
                className={`py-6 ${selectedTags.length > 0 ? 'bg-primary text-white' : ''}`}
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter by tags {selectedTags.length > 0 && `(${selectedTags.length})`}
              </Button>
            </div>
            {(debouncedQuery || selectedTags.length > 0) && (
              <Button 
                variant="ghost" 
                onClick={clearFilters}
                className="py-6"
              >
                <X className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            )}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {popularTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag) 
                    ? 'bg-primary text-white hover:bg-primary-dark' 
                    : 'hover:bg-primary hover:text-white'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Ideas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading state
            Array(8).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-80"></div>
            ))
          ) : ideas?.length ? (
            // Display ideas
            ideas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} />
            ))
          ) : (
            // No results
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl font-montserrat font-semibold mb-2">No ideas found</h3>
              <p className="text-neutral-500">
                Try adjusting your search or filters, or{' '}
                <Button variant="link" className="p-0 h-auto">
                  submit your own idea
                </Button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
