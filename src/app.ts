
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import corsMiddleware from './middleware/corsMiddleware';
import routes from './routes';

import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quiz API',
      version: '1.0.0',
      description: 'API for Quiz Questions, Capitals, and Feedback',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./api/**/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  OpenApiValidator.middleware({
    apiSpec: './open-api-spec.json',
    validateRequests: true, // (default)
    validateResponses: false, // (default)
  })
);

const PORT = process.env.PORT || 3001;

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