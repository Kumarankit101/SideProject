import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertIdeaSchema, 
  insertVoteSchema, 
  insertCommentSchema,
  insertCollaborationSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      // Don't return the password
      const { password, ...userWithoutPassword } = newUser;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      return res.status(500).json({ message: "Error creating user" });
    }
  });
  
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      
      // Get user's ideas
      const ideas = await storage.getUserIdeas(userId);
      // Get user's collaborations
      const collaborations = await storage.getCollaborationsForUser(userId);
      
      return res.json({
        ...userWithoutPassword,
        ideas,
        collaborations
      });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching user" });
    }
  });
  
  // Ideas
  app.get("/api/ideas", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string || "";
      const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
      
      const ideas = await storage.searchIdeas(query, tags);
      return res.json(ideas);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching ideas" });
    }
  });
  
  app.get("/api/ideas/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const ideas = await storage.getFeaturedIdeas(limit);
      return res.json(ideas);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching featured ideas" });
    }
  });
  
  app.get("/api/ideas/:id", async (req: Request, res: Response) => {
    try {
      const ideaId = parseInt(req.params.id);
      const idea = await storage.getIdea(ideaId);
      
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      
      return res.json(idea);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching idea" });
    }
  });
  
  app.post("/api/ideas", async (req: Request, res: Response) => {
    try {
      const ideaData = insertIdeaSchema.parse(req.body);
      const user = await storage.getUser(ideaData.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const newIdea = await storage.createIdea(ideaData);
      return res.status(201).json(newIdea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid idea data", errors: error.errors });
      }
      return res.status(500).json({ message: "Error creating idea" });
    }
  });
  
  // Votes
  app.post("/api/votes", async (req: Request, res: Response) => {
    try {
      const voteData = insertVoteSchema.parse(req.body);
      
      // Check if idea exists
      const idea = await storage.getIdea(voteData.ideaId);
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      
      // Check if user exists
      const user = await storage.getUser(voteData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if user has already voted
      const hasVoted = await storage.hasUserVotedForIdea(voteData.userId, voteData.ideaId);
      if (hasVoted) {
        // Remove the vote (toggle)
        await storage.removeVote(voteData.userId, voteData.ideaId);
        return res.json({ message: "Vote removed", ideaId: voteData.ideaId });
      } else {
        // Add the vote
        const newVote = await storage.addVote(voteData);
        return res.status(201).json(newVote);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vote data", errors: error.errors });
      }
      return res.status(500).json({ message: "Error processing vote" });
    }
  });
  
  // Comments
  app.post("/api/comments", async (req: Request, res: Response) => {
    try {
      const commentData = insertCommentSchema.parse(req.body);
      
      // Check if idea exists
      const idea = await storage.getIdea(commentData.ideaId);
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      
      // Check if user exists
      const user = await storage.getUser(commentData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const newComment = await storage.addComment(commentData);
      
      // Return comment with author info
      const commentWithAuthor = {
        ...newComment,
        author: {
          id: user.id,
          username: user.username,
          name: user.name,
          avatar: user.avatar
        }
      };
      
      return res.status(201).json(commentWithAuthor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      return res.status(500).json({ message: "Error creating comment" });
    }
  });
  
  // Collaborations
  app.post("/api/collaborations", async (req: Request, res: Response) => {
    try {
      const collabData = insertCollaborationSchema.parse(req.body);
      
      // Check if idea exists
      const idea = await storage.getIdea(collabData.ideaId);
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }
      
      // Check if user exists
      const user = await storage.getUser(collabData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const newCollab = await storage.addCollaboration(collabData);
      return res.status(201).json(newCollab);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid collaboration data", errors: error.errors });
      }
      return res.status(500).json({ message: "Error creating collaboration" });
    }
  });
  
  // Stats
  app.get("/api/stats", async (_req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
