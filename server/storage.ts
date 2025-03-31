import {
  users, User, InsertUser,
  ideas, Idea, InsertIdea,
  votes, Vote, InsertVote,
  comments, Comment, InsertComment,
  collaborations, Collaboration, InsertCollaboration,
  type IdeaWithVotes, type UserProfile, type IdeaDetail, type Stats
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Idea operations
  getIdeas(): Promise<IdeaWithVotes[]>;
  getIdea(id: number): Promise<IdeaDetail | undefined>;
  createIdea(idea: InsertIdea): Promise<Idea>;
  getFeaturedIdeas(limit?: number): Promise<IdeaWithVotes[]>;
  getUserIdeas(userId: number): Promise<IdeaWithVotes[]>;
  searchIdeas(query: string, tags?: string[]): Promise<IdeaWithVotes[]>;

  // Vote operations
  getVotesForIdea(ideaId: number): Promise<number>;
  hasUserVotedForIdea(userId: number, ideaId: number): Promise<boolean>;
  addVote(vote: InsertVote): Promise<Vote>;
  removeVote(userId: number, ideaId: number): Promise<void>;

  // Comment operations
  getCommentsForIdea(ideaId: number): Promise<(Comment & { author: { id: number, username: string, name: string, avatar?: string } })[]>;
  addComment(comment: InsertComment): Promise<Comment>;

  // Collaboration operations
  getCollaborationsForIdea(ideaId: number): Promise<Collaboration[]>;
  getCollaborationsForUser(userId: number): Promise<Collaboration[]>;
  addCollaboration(collaboration: InsertCollaboration): Promise<Collaboration>;

  // Stats operations
  getStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ideas: Map<number, Idea>;
  private votes: Map<number, Vote>;
  private comments: Map<number, Comment>;
  private collaborations: Map<number, Collaboration>;
  private currentIds: {
    users: number;
    ideas: number;
    votes: number;
    comments: number;
    collaborations: number;
  };

  constructor() {
    this.users = new Map();
    this.ideas = new Map();
    this.votes = new Map();
    this.comments = new Map();
    this.collaborations = new Map();
    this.currentIds = {
      users: 1,
      ideas: 1,
      votes: 1,
      comments: 1,
      collaborations: 1
    };

    // Add some default users
    this.createUser({
      username: "alexchen",
      password: "password123",
      name: "Alexandra Chen",
      email: "alex@example.com",
      bio: "Entrepreneur and health enthusiast",
      skills: ["Product Design", "Marketing", "Health Tech"],
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    });

    this.createUser({
      username: "mjohnson",
      password: "password123",
      name: "Marcus Johnson",
      email: "marcus@example.com",
      bio: "Full-stack developer",
      skills: ["JavaScript", "React", "Node.js"],
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    });

    this.createUser({
      username: "ppatel",
      password: "password123",
      name: "Priya Patel",
      email: "priya@example.com",
      bio: "Environmental engineer",
      skills: ["Sustainability", "Business Development"],
      avatar: "https://randomuser.me/api/portraits/women/86.jpg"
    });

    // Add some default ideas
    this.createIdea({
      title: "AI Recipe Generator",
      description: "An app that generates personalized recipes based on ingredients you already have at home using AI.",
      userId: 1,
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["AI", "Food", "Mobile"]
    });

    this.createIdea({
      title: "Remote Team Builder",
      description: "Platform that helps remote teams build camaraderie through virtual team-building activities and games.",
      userId: 2,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["Remote Work", "Team Building"]
    });

    this.createIdea({
      title: "Skill Swap Marketplace",
      description: "Peer-to-peer platform where users can exchange skills and knowledge without money changing hands.",
      userId: 3,
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["Education", "Marketplace", "Community"]
    });

    this.createIdea({
      title: "Carbon Footprint Tracker",
      description: "App that tracks personal carbon footprint and suggests actionable ways to reduce environmental impact.",
      userId: 3,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      tags: ["Environment", "Sustainability", "IoT"]
    });

    // Add some votes
    this.addVote({ ideaId: 1, userId: 2 });
    this.addVote({ ideaId: 1, userId: 3 });
    this.addVote({ ideaId: 2, userId: 1 });
    this.addVote({ ideaId: 2, userId: 3 });
    this.addVote({ ideaId: 3, userId: 1 });
    this.addVote({ ideaId: 3, userId: 2 });
    this.addVote({ ideaId: 4, userId: 1 });
    this.addVote({ ideaId: 4, userId: 2 });

    // Add some comments
    this.addComment({ ideaId: 1, userId: 2, content: "This is a great idea! I'd love to collaborate." });
    this.addComment({ ideaId: 1, userId: 3, content: "Have you thought about integrating with grocery delivery services?" });
    this.addComment({ ideaId: 2, userId: 1, content: "This is exactly what my team needs right now." });
    this.addComment({ ideaId: 3, userId: 2, content: "This could really transform how people learn new skills." });

    // Add some collaborations
    this.addCollaboration({
      ideaId: 1,
      userId: 2,
      status: "pending",
      message: "I'd love to help with the backend development."
    });

    this.addCollaboration({
      ideaId: 2,
      userId: 3,
      status: "accepted",
      message: "I can help with the UI design."
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = {
      ...insertUser,
      id,
      avatar: insertUser.avatar || null,
      bio: insertUser.bio || null,
      skills: insertUser.skills || null
    };
    this.users.set(id, user);
    return user;
  }

  async getIdeas(): Promise<IdeaWithVotes[]> {
    return Array.from(this.ideas.values()).map((idea): IdeaWithVotes => {
      const user = this.users.get(idea.userId);
      const votesCount = this.getVotesCountForIdea(idea.id);

      return {
        ...idea,
        votes: votesCount,
        author: {
          id: user?.id || 0,
          username: user?.username || "",
          name: user?.name || "",
          avatar: user?.avatar || undefined
        }
      };
    }).sort((a, b) => b.votes - a.votes);
  }

  async getIdea(id: number): Promise<IdeaDetail | undefined> {
    const idea = this.ideas.get(id);
    if (!idea) return undefined;

    const user = this.users.get(idea.userId);
    const votesCount = this.getVotesCountForIdea(id);
    const ideaComments = await this.getCommentsForIdea(id);

    return {
      ...idea,
      votes: votesCount,
      author: {
        id: user?.id || 0,
        username: user?.username || "",
        name: user?.name || "",
        avatar: user?.avatar || undefined
      },
      comments: ideaComments
    };
  }

  async createIdea(insertIdea: InsertIdea): Promise<Idea> {
    const id = this.currentIds.ideas++;
    const now = new Date();
    const idea: Idea = {
      ...insertIdea,
      id,
      createdAt: now,
      isNew: true,
      isTrending: false,
      image: insertIdea.image || null,
    };
    this.ideas.set(id, idea);
    return idea;
  }

  async getFeaturedIdeas(limit: number = 8): Promise<IdeaWithVotes[]> {
    const allIdeas = await this.getIdeas();
    return allIdeas.slice(0, limit);
  }

  async getUserIdeas(userId: number): Promise<IdeaWithVotes[]> {
    const allIdeas = await this.getIdeas();
    return allIdeas.filter(idea => idea.author.id === userId);
  }

  async searchIdeas(query: string, tags?: string[]): Promise<IdeaWithVotes[]> {
    const allIdeas = await this.getIdeas();
    return allIdeas.filter(idea => {
      const matchesQuery = !query ||
        idea.title.toLowerCase().includes(query.toLowerCase()) ||
        idea.description.toLowerCase().includes(query.toLowerCase());

      const matchesTags = !tags || tags.length === 0 ||
        tags.some(tag => idea.tags.includes(tag));

      return matchesQuery && matchesTags;
    });
  }

  private getVotesCountForIdea(ideaId: number): number {
    return Array.from(this.votes.values()).filter(vote => vote.ideaId === ideaId).length;
  }

  async getVotesForIdea(ideaId: number): Promise<number> {
    return this.getVotesCountForIdea(ideaId);
  }

  async hasUserVotedForIdea(userId: number, ideaId: number): Promise<boolean> {
    return Array.from(this.votes.values()).some(
      vote => vote.userId === userId && vote.ideaId === ideaId
    );
  }

  async addVote(insertVote: InsertVote): Promise<Vote> {
    // Check if vote already exists
    const exists = await this.hasUserVotedForIdea(insertVote.userId, insertVote.ideaId);
    if (exists) {
      throw new Error("User has already voted for this idea");
    }

    const id = this.currentIds.votes++;
    const now = new Date();
    const vote: Vote = { ...insertVote, id, createdAt: now };
    this.votes.set(id, vote);
    return vote;
  }

  async removeVote(userId: number, ideaId: number): Promise<void> {
    const voteToRemove = Array.from(this.votes.values()).find(
      vote => vote.userId === userId && vote.ideaId === ideaId
    );

    if (voteToRemove) {
      this.votes.delete(voteToRemove.id);
    }
  }

  async getCommentsForIdea(ideaId: number): Promise<(Comment & { author: { id: number, username: string, name: string, avatar?: string } })[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.ideaId === ideaId)
      .map(comment => {
        const user = this.users.get(comment.userId);
        return {
          ...comment,
          author: {
            id: user?.id || 0,
            username: user?.username || "",
            name: user?.name || "",
            avatar: user?.avatar || undefined  // Convert null to undefined
          }
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async addComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentIds.comments++;
    const now = new Date();
    const comment: Comment = { ...insertComment, id, createdAt: now };
    this.comments.set(id, comment);
    return comment;
  }

  async getCollaborationsForIdea(ideaId: number): Promise<Collaboration[]> {
    return Array.from(this.collaborations.values())
      .filter(collab => collab.ideaId === ideaId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCollaborationsForUser(userId: number): Promise<Collaboration[]> {
    return Array.from(this.collaborations.values())
      .filter(collab => collab.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async addCollaboration(insertCollaboration: InsertCollaboration): Promise<Collaboration> {
    const id = this.currentIds.collaborations++;
    const now = new Date();
    const collaboration: Collaboration = { ...insertCollaboration, id, createdAt: now };
    this.collaborations.set(id, collaboration);
    return collaboration;
  }

  async getStats(): Promise<Stats> {
    return {
      users: this.users.size,
      ideas: this.ideas.size,
      collaborations: Array.from(this.collaborations.values())
        .filter(collab => collab.status === "accepted").length,
      investments: "$2.3M" // Static value for demo
    };
  }
}

export const storage = new MemStorage();
