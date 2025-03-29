import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, ExternalLink } from "lucide-react";
import type { IdeaWithVotes } from "@shared/schema";

interface IdeaCardProps {
  idea: IdeaWithVotes;
  variant?: 'default' | 'large';
}

export default function IdeaCard({ idea, variant = 'default' }: IdeaCardProps) {
  const [_, setLocation] = useLocation();
  
  const navigateToDetail = () => {
    setLocation(`/idea/${idea.id}`);
  };
  
  const navigateToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/profile/${idea.author.id}`);
  };

  // For large block variant like in the example
  if (variant === 'large') {
    return (
      <div 
        className="group relative cursor-pointer overflow-hidden rounded-md transition-all duration-700"
        onClick={navigateToDetail}
      >
        {/* Main image with overlay */}
        <div className="aspect-square w-full relative overflow-hidden">
          <img 
            src={idea.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80"} 
            alt={idea.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
          />
          
          {/* Dark overlay that appears on hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-700 group-hover:bg-black/40"></div>
          
          {/* Title bar that's always visible at the bottom or top depending on design */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h3 className="font-bold text-xl mb-1">{idea.title}</h3>
            {idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {idea.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} className="bg-white/20 text-white hover:bg-white/30 text-xs">
                    {tag}
                  </Badge>
                ))}
                {idea.tags.length > 3 && (
                  <Badge className="bg-white/20 text-white hover:bg-white/30 text-xs">
                    +{idea.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* Status indicators for trending/new */}
          {idea.isTrending && (
            <div className="absolute top-4 right-4 bg-[#DDF695] text-[#171817] text-xs font-bold px-3 py-1 rounded-full">
              TRENDING
            </div>
          )}
          {idea.isNew && !idea.isTrending && (
            <div className="absolute top-4 right-4 bg-white text-[#171817] text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </div>
          )}
          
          {/* View details button that appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/90 text-[#171817] rounded-full px-4 py-2 flex items-center gap-2 font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span>View Details</span>
              <ExternalLink size={16} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card view (original design)
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={navigateToDetail}
    >
      <div className="relative h-48 bg-neutral-200">
        <img 
          src={idea.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&q=80"} 
          alt={idea.title} 
          className="w-full h-full object-cover" 
        />
        {idea.isTrending && (
          <div className="absolute top-2 right-2 bg-[#DDF695] text-[#171817] text-xs font-bold px-2 py-1 rounded">
            TRENDING
          </div>
        )}
        {idea.isNew && !idea.isTrending && (
          <div className="absolute top-2 right-2 bg-white text-[#171817] text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{idea.title}</h3>
          <div className="flex items-center">
            <PlusIcon className="h-5 w-5 text-[#DDF695]" />
            <span className="ml-1 text-sm font-medium text-[#DDF695]">{idea.votes}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          {idea.description.length > 100 
            ? `${idea.description.substring(0, 100)}...` 
            : idea.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="border-[#DDF695]/30 text-[#DDF695] text-xs rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="px-5 py-3 bg-[#171817]/90 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={idea.author.avatar || "https://ui-avatars.com/api/?name=" + idea.author.name} 
            alt={idea.author.name}
            className="w-8 h-8 rounded-full cursor-pointer" 
            onClick={navigateToProfile}
          />
          <span className="text-xs text-gray-300 ml-2">{idea.author.name}</span>
        </div>
        <button 
          className="text-[#DDF695] hover:text-white text-sm font-medium"
          onClick={navigateToDetail}
        >
          Details
        </button>
      </div>
    </div>
  );
}
