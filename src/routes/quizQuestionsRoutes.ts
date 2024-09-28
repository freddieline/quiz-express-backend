import { Router } from 'express';
import quizQuestionsController from '../controllers/quizQuestionsController';

const router = Router();

router.get('/', quizQuestionsController.getAllQuizQuestions);
 
export default router;