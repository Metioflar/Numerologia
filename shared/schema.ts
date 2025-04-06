import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Numerology calculation schema
export const calculateNumerologySchema = z.object({
  fullName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

export type CalculateNumerology = z.infer<typeof calculateNumerologySchema>;

// Astrology calculation schema
export const calculateAstrologySchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, "Hora deve estar no formato HH:MM"),
  birthCity: z.string().min(2, "A cidade deve ter pelo menos 2 caracteres"),
  birthCountry: z.string().min(2, "O país deve ter pelo menos 2 caracteres"),
});

export type CalculateAstrology = z.infer<typeof calculateAstrologySchema>;

// Numerology result type
export type NumerologyResult = {
  fullName: string;
  pyramid: number[][];
  nameLetters: string[];
  destinyNumber: number;
  interpretations: {
    destinyNumber: string;
    pyramid: string;
    detailedNumbers: Array<{
      number: number;
      meaning: string;
    }>;
  };
};

// Astrology result type
export type AstrologyResult = {
  planets: Array<{
    name: string;
    sign: string;
    position: {
      x: number;
      y: number;
    };
  }>;
  signs: {
    sun: string;
    moon: string;
    ascendant: string;
  };
  interpretations: {
    sun: string;
    moon: string;
    ascendant: string;
    fullInterpretation: string;
  };
};
