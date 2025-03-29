import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  skills: text("skills").array()
});

export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: integer("user_id").notNull(),
  image: text("image"),
  tags: text("tags").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isTrending: boolean("is_trending").default(false).notNull(),
  isNew: boolean("is_new").default(true).notNull()
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  ideaId: integer("idea_id").notNull(),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  ideaId: integer("idea_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const collaborations = pgTable("collaborations", {
  id: serial("id").primaryKey(),
  ideaId: integer("idea_id").notNull(),
  userId: integer("user_id").notNull(),
  status: text("status").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  bio: true,
  skills: true,
  avatar: true
});

export const insertIdeaSchema = createInsertSchema(ideas).pick({
  title: true,
  description: true,
  userId: true,
  image: true,
  tags: true
});

export const insertVoteSchema = createInsertSchema(votes).pick({
  ideaId: true,
  userId: true
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  ideaId: true,
  userId: true,
  content: true
});

export const insertCollaborationSchema = createInsertSchema(collaborations).pick({
  ideaId: true,
  userId: true,
  status: true,
  message: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertIdea = z.infer<typeof insertIdeaSchema>;
export type Idea = typeof ideas.$inferSelect;

export type InsertVote = z.infer<typeof insertVoteSchema>;
export type Vote = typeof votes.$inferSelect;

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export type InsertCollaboration = z.infer<typeof insertCollaborationSchema>;
export type Collaboration = typeof collaborations.$inferSelect;

// Extended types for responses
export type IdeaWithVotes = Idea & {
  votes: number;
  author: {
    id: number;
    username: string;
    name: string;
    avatar?: string;
  };
  hasVoted?: boolean;
};

export type UserProfile = User & {
  ideas: Idea[];
  collaborations: Collaboration[];
};

export type IdeaDetail = IdeaWithVotes & {
  comments: (Comment & {
    author: {
      id: number;
      username: string;
      name: string;
      avatar?: string;
    }
  })[];
};

// Stats type
export type Stats = {
  users: number;
  ideas: number;
  collaborations: number;
  investments: string;
};
