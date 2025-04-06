import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateNumerologySchema, calculateAstrologySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Numerology calculation endpoint
  app.post("/api/numerology/calculate", async (req, res) => {
    try {
      const validatedData = calculateNumerologySchema.parse(req.body);
      const result = await storage.calculateNumerology(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error calculating numerology:", error);
      res.status(400).json({ error: "Invalid data provided" });
    }
  });

  // Astrology calculation endpoint
  app.post("/api/astrology/calculate", async (req, res) => {
    try {
      const validatedData = calculateAstrologySchema.parse(req.body);
      const result = await storage.calculateAstrology(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error calculating astrology:", error);
      res.status(400).json({ error: "Invalid data provided" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
