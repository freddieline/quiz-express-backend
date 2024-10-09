import { Router } from 'express';
import quizQuestionsController from '../controllers/quizQuestionsController';
import capitalsController from '../controllers/capitalsController';
import feedbackController from '../controllers/feedbackController';
import { body } from 'express-validator';

const router = Router();
router.get('/capitals', capitalsController.getAllCapitals);

router.get('/quiz-questions', quizQuestionsController.getAllQuizQuestions);

router.post('/feedback', feedbackController.postFeedback);

export default router;