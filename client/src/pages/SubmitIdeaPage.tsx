import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { H2, Paragraph } from "@/components/ui/typography";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileImage, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertIdeaSchema } from "@shared/schema";

// Extended schema with validation
const formSchema = insertIdeaSchema.extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
  image: z.string().optional(),
  newTag: z.string().optional()
});

export default function SubmitIdeaPage() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  
  // Popular tags
  const popularTags = [
    "AI", "Mobile", "Web", "Education", "Health", 
    "Environment", "Productivity", "Social", "Finance", "Gaming"
  ];
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      userId: 1, // Hardcoded for demo
      tags: [],
      image: ""
    }
  });
  
  // Add a tag
  const addTag = (tag: string) => {
    if (!tags.includes(tag) && tag.trim() !== "") {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      form.setValue("tags", updatedTags);
      setNewTag("");
    }
  };
  
  // Remove a tag
  const removeTag = (tag: string) => {
    const updatedTags = tags.filter(t => t !== tag);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };
  
  // Handle new tag input
  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };
  
  // Handle new tag key press (Enter to add)
  const handleNewTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(newTag);
    }
  };
  
  // Submit mutation
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/ideas", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ideas"] });
      queryClient.invalidateQueries({ queryKey: ["/api/ideas/featured"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      
      toast({
        title: "Success!",
        description: "Your idea has been submitted successfully.",
      });
      
      setLocation("/explore");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit idea: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Make sure tags are set
    data.tags = tags;
    mutation.mutate(data);
  };
  
  return (
    <div className="py-16 bg-[#171817] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Submit Your Idea</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Share your side project concept with our community and find collaborators, feedback, and support.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-white">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a catchy title for your idea" 
                        {...field} 
                        className="bg-[#444444] border-none text-white h-14 rounded-sm focus-visible:ring-[#DDF695] focus-visible:ring-offset-[#171817]"
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff6b6b]" />
                  </FormItem>
                )}
              />
              
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your idea in detail. What problem does it solve? Who is it for?" 
                        className="min-h-48 bg-[#444444] border-none text-white rounded-sm focus-visible:ring-[#DDF695] focus-visible:ring-offset-[#171817]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff6b6b]" />
                  </FormItem>
                )}
              />
              
              {/* Image URL */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-white">Image URL (Optional)</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/your-image.jpg" 
                          {...field} 
                          className="bg-[#444444] border-none text-white h-14 rounded-sm focus-visible:ring-[#DDF695] focus-visible:ring-offset-[#171817]"
                        />
                      </FormControl>
                      <FileImage className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormMessage className="text-[#ff6b6b]" />
                  </FormItem>
                )}
              />
              
              {/* Tags */}
              <div>
                <FormLabel className="text-lg font-medium text-white">Tags</FormLabel>
                <div className="mb-2">
                  <p className="text-sm text-gray-400">
                    Select from popular tags or create your own
                  </p>
                </div>
                
                {/* Popular tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {popularTags.map(tag => (
                    <Badge 
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer transition-all duration-300 ${
                        tags.includes(tag) 
                          ? 'bg-[#DDF695] text-[#171817] hover:bg-[#DDF695]/80 border-[#DDF695]' 
                          : 'text-white hover:bg-white/10 border-white/30'
                      }`}
                      onClick={() => tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Custom tag input */}
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    placeholder="Add a custom tag..."
                    value={newTag}
                    onChange={handleNewTagChange}
                    onKeyPress={handleNewTagKeyPress}
                    className="bg-[#444444] border-none text-white h-12 rounded-sm focus-visible:ring-[#DDF695] focus-visible:ring-offset-[#171817]"
                  />
                  <Button 
                    type="button"
                    variant="glowing"
                    onClick={() => addTag(newTag)}
                    disabled={!newTag}
                    className="border-white/30 h-12 px-4"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Selected tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map(tag => (
                    <Badge key={tag} className="bg-[#DDF695] text-[#171817] flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-gray-600" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                
                {form.formState.errors.tags && (
                  <p className="text-sm font-medium text-[#ff6b6b] mt-2">
                    {form.formState.errors.tags.message}
                  </p>
                )}
              </div>
              
              {/* Success message (similar to the image) */}
              {false && (
                <div className="flex items-center gap-2 p-4 bg-[#333333] rounded-md border border-[#444444]">
                  <div className="bg-[#DDF695] rounded-full p-1">
                    <X className="h-5 w-5 text-[#171817]" />
                  </div>
                  <span className="text-white">Success!</span>
                </div>
              )}
              
              {/* Submit button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  variant="glowing"
                  size="pill"
                  className="w-full border-[#DDF695]/50 text-[#DDF695] shadow-[0_0_30px_rgba(221,246,149,0.4)] hover:text-white hover:border-white/70 transition-all duration-500 text-lg py-6 h-auto"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
