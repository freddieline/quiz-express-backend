
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './middleware/corsMiddleware';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// add middleware
app.use(corsMiddleware);

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!', error: err.message });
});


app.listen(PORT, () => {
  console.log("Server is running")
});