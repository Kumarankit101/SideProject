import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { H2, Paragraph } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  PlusIcon,
  MessageSquare,
  Share2,
  ThumbsUp,
  UserPlus,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { IdeaDetail } from "@shared/schema";

export default function IdeaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  // Get idea details
  const {
    data: idea,
    isLoading,
    isError,
  } = useQuery<IdeaDetail>({
    queryKey: [`/api/ideas/${id}`],
    enabled: !!id,
  });

  // Add vote mutation
  const voteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/votes", {
        ideaId: parseInt(id),
        userId: 1, // Hardcoded for demo
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/ideas/${id}`] });
      toast({
        title: "Vote registered",
        description: "Your vote has been counted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to vote: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Add comment mutation
  const commentMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/comments", {
        ideaId: parseInt(id),
        userId: 1, // Hardcoded for demo
        content: comment,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/ideas/${id}`] });
      setComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add comment: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Add collaboration request mutation
  const collaborationMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/collaborations", {
        ideaId: parseInt(id),
        userId: 1, // Hardcoded for demo
        status: "pending",
        message: "I'm interested in collaborating on this project!",
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request sent",
        description: "Your collaboration request has been sent.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send request: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Handle voting
  const handleVote = () => {
    voteMutation.mutate();
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      commentMutation.mutate();
    }
  };

  // Handle collaboration request
  const handleCollaborationRequest = () => {
    collaborationMutation.mutate();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !idea) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <H2>Idea Not Found</H2>
          <Paragraph>
            The idea you're looking for doesn't exist or has been removed.
          </Paragraph>
          <Button onClick={() => setLocation("/explore")} className="mt-4">
            Browse Ideas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Idea Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <H2 className="mb-0">{idea.title}</H2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={handleVote}
                      disabled={voteMutation.isPending}
                    >
                      {voteMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ThumbsUp className="h-4 w-4" />
                      )}
                      {idea.votes}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {idea.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-primary bg-opacity-10 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  {idea.image && (
                    <img
                      src={idea.image}
                      alt={idea.title}
                      className="w-full h-auto rounded-lg mb-4"
                    />
                  )}
                  <Paragraph>{idea.description}</Paragraph>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={idea.author.avatar}
                      alt={idea.author.name}
                    />
                    <AvatarFallback>
                      {idea.author.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      Posted by {idea.author.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">
                    Comments ({idea.comments.length})
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                {/* Add Comment */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <Textarea
                    placeholder="Share your thoughts or feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-white"
                    disabled={commentMutation.isPending || !comment.trim()}
                  >
                    {commentMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Comment"
                    )}
                  </Button>
                </form>

                {/* Comments List */}
                {idea.comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">
                      Be the first to comment on this idea!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {idea.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={comment.author.avatar}
                              alt={comment.author.name}
                            />
                            <AvatarFallback>
                              {comment.author.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-sm">
                                {comment.author.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Collaboration */}
            <Card className="mb-6">
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Collaborate
                </h3>
              </CardHeader>
              <CardContent>
                <Paragraph className="mb-4">
                  Interested in working on this project? Send a collaboration
                  request to the author.
                </Paragraph>
                <Button
                  className="w-full bg-[#ccff00] text-primary font-semibold hover:bg-[#a8cc00]"
                  onClick={handleCollaborationRequest}
                  disabled={collaborationMutation.isPending}
                >
                  {collaborationMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    "Request to Collaborate"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Similar Ideas */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Similar Ideas</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-500">
                  Explore more ideas related to {idea.tags[0]}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation(`/explore?tags=${idea.tags[0]}`)}
                >
                  Browse Similar Ideas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
