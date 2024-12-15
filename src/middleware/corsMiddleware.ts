import { NextFunction, Request, Response } from "express";

// Create a CORS middleware function
function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Allow requests from any origin (adjust as needed)
  const allowedOrigins = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
  ]; // Replace with your allowed origins

  // Check if the origin is allowed
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Allow common HTTP methods and headers
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Enable preflight requests for OPTIONS requests
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
}

export default corsMiddleware;
