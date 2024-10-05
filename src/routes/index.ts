import { Router } from 'express';
import capitalsRoutes from './capitalsRoutes';
import quizQuestionsRoutes from './quizQuestionsRoutes';
import quizQuestionsController from '../controllers/quizQuestionsController';
import { body } from 'express-validator';

const router = Router();

// All user-related routes will be prefixed with `/api/users`
router.use('/capitals', capitalsRoutes);

// All user-related routes will be prefixed with `/api/users`
router.use('/quiz-questions', quizQuestionsRoutes);

const validateFeedback = [
  body('quizName').notEmpty().withMessage('Quiz name is required'),
  body('feedback').notEmpty().withMessage('Feedback is required'),
];

router.post('/feedback', validateFeedback, quizQuestionsController.postFeedback);

export default router;