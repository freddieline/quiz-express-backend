import { Router } from 'express';
import quizQuestionsController from '../controllers/quizQuestionsController';
import capitalsController from '../controllers/capitalsController';
import feedbackController from '../controllers/feedbackController';
import { body } from 'express-validator';

const router = Router();

router.get('/capitals', capitalsController.getAllCapitals);
router.get('/quiz-questions', quizQuestionsController.getAllQuizQuestions);

const validateQuizQuestion = [
  body('id').notEmpty().withMessage('Quiz question id is required'),
];

router.patch('/quiz-question', validateQuizQuestion, quizQuestionsController.patchQuizQuestion);

const validateFeedback = [
  body('quizName').notEmpty().withMessage('Quiz name is required'),
  body('feedback').notEmpty().withMessage('Feedback is required'),
];

router.post('/feedback', validateFeedback, feedbackController.postFeedback);

export default router;