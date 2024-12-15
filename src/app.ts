import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/corsMiddleware";
import routes from "./routes";
import * as OpenApiValidator from "express-openapi-validator";

dotenv.config();

const app: Application = express();

app.use(express.json());

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: './openapi.json',
//     validateRequests: true, // (default)
//     validateResponses: true, // false by default
//   }),
// );

const PORT = process.env.PORT || 3001;

// add middleware
app.use(corsMiddleware);

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!", error: err.message });
}) as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log("Server is running");
});
