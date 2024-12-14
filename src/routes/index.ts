import { Router } from 'express';
import quizQuestionsController from '../controllers/quizQuestionsController';
import capitalsController from '../controllers/capitalsController';
import feedbackController from '../controllers/feedbackController';
import wordsController from '../controllers/wordsController';

const router = Router();
router.get('/capitals', capitalsController.getAllCapitals);

router.get('/quiz-questions', quizQuestionsController.getAllQuizQuestions);

router.post('/feedback', feedbackController.postFeedback);

router.get('/words', wordsController.getWords);

export default router;