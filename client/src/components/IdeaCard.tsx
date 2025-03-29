import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useLocation } from "wouter";
import type { IdeaWithVotes } from "@shared/schema";

interface IdeaCardProps {
  idea: IdeaWithVotes;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const [_, setLocation] = useLocation();
  
  const navigateToDetail = () => {
    setLocation(`/idea/${idea.id}`);
  };
  
  const navigateToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/profile/${idea.author.id}`);
  };

  return (
    <Card 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={navigateToDetail}
    >
      <div className="relative h-48 bg-neutral-200">
        <img 
          src={idea.image || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"} 
          alt={idea.title} 
          className="w-full h-full object-cover" 
        />
        {idea.isTrending && (
          <div className="absolute top-2 right-2 bg-[#ccff00] text-primary text-xs font-bold px-2 py-1 rounded">
            TRENDING
          </div>
        )}
        {idea.isNew && !idea.isTrending && (
          <div className="absolute top-2 right-2 bg-[#fcccc9] text-primary text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-montserrat font-semibold text-lg">{idea.title}</h3>
          <div className="flex items-center">
            <PlusIcon className="h-5 w-5 text-primary" />
            <span className="ml-1 text-sm font-medium text-primary">{idea.votes}</span>
          </div>
        </div>
        <p className="text-neutral-600 text-sm mb-4">
          {idea.description.length > 100 
            ? `${idea.description.substring(0, 100)}...` 
            : idea.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-primary bg-opacity-10 text-primary text-xs rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-5 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={idea.author.avatar || "https://ui-avatars.com/api/?name=" + idea.author.name} 
            alt={idea.author.name}
            className="w-8 h-8 rounded-full cursor-pointer" 
            onClick={navigateToProfile}
          />
          <span className="text-xs text-neutral-600 ml-2">{idea.author.name}</span>
        </div>
        <Button 
          variant="link" 
          className="text-primary hover:text-primary-dark text-sm font-medium"
          onClick={navigateToDetail}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
