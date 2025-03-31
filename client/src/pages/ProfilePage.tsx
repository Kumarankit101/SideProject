import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { H2, Paragraph } from "@/components/ui/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IdeaCard from "@/components/IdeaCard";
import { UserIcon, BriefcaseIcon, MessageSquare } from "lucide-react";
import type { UserProfile } from "@shared/schema";

export default function ProfilePage() {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserProfile>({
    queryKey: [`/api/users/${id}`],
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !user) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <H2>User Not Found</H2>
          <Paragraph>
            The user profile you're looking for doesn't exist or has been
            removed.
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar || undefined} alt={user.name} />
                  <AvatarFallback className="text-4xl">
                    {user.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <H2 className="mb-2">{user.name}</H2>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <Badge
                      variant="outline"
                      className="bg-primary bg-opacity-10 text-primary"
                    >
                      <UserIcon className="h-3 w-3 mr-1" />@{user.username}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-[#ccff00] bg-opacity-30 text-primary"
                    >
                      <BriefcaseIcon className="h-3 w-3 mr-1" />
                      {user.ideas.length} Projects
                    </Badge>
                  </div>

                  {user.bio && (
                    <Paragraph className="mb-4">{user.bio}</Paragraph>
                  )}

                  {user.skills && user.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-gray-100"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="bg-primary text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Projects and Collaborations */}
          <Tabs defaultValue="projects">
            <TabsList className="mb-6">
              <TabsTrigger value="projects">
                Projects ({user.ideas.length})
              </TabsTrigger>
              <TabsTrigger value="collaborations">
                Collaborations ({user.collaborations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              {user.ideas.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-neutral-500">No projects yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.ideas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={{
                        ...idea,
                        votes: 0, // This is a simplification since we don't have votes in the type
                        author: {
                          id: user.id,
                          username: user.username,
                          name: user.name,
                          avatar: user.avatar || undefined,
                        },
                      }}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="collaborations">
              {user.collaborations.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-neutral-500">No collaborations yet</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {user.collaborations.map((collab) => (
                        <li
                          key={collab.id}
                          className="border-b last:border-0 pb-4 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                Project ID: {collab.ideaId}
                              </p>
                              <p className="text-sm text-gray-500">
                                Status: {collab.status}
                              </p>
                              <p className="text-sm mt-1">{collab.message}</p>
                            </div>
                            <Badge
                              variant={
                                collab.status === "accepted"
                                  ? "default"
                                  : "outline"
                              }
                              className={
                                collab.status === "accepted"
                                  ? "bg-green-500"
                                  : ""
                              }
                            >
                              {collab.status}
                            </Badge>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
