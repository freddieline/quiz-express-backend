import { Router } from 'express';
import quizQuestionsController from '../controllers/quizQuestionsController';
import capitalsController from '../controllers/capitalsController';
import feedbackController from '../controllers/feedbackController';
import { body } from 'express-validator';

const router = Router();

router.get('/capitals', capitalsController.getAllCapitals);
router.get('/quiz-questions', quizQuestionsController.getAllQuizQuestions);

/**
 * @swagger
 * /api/quiz-question:
 *   post:
 *     summary: Submit feedback
 *     description: Submit feedback from a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback:
 *                 type: string
 *                 example: "Great quiz!"
 *               quizName:
 *                 type: string
 *                 example: "Geography Quiz"
 *             required:
 *               - feedback
 *               - quizName
 *     responses:
 *       201:
 *         description: Feedback successfully submitted
 */
router.patch('/quiz-question', quizQuestionsController.patchQuizQuestion);

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     description: Submit feedback from a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback:
 *                 type: string
 *                 example: "Great quiz!"
 *               quizName:
 *                 type: string
 *                 example: "Geography Quiz"
 *             required:
 *               - feedback
 *               - quizName
 *     responses:
 *       201:
 *         description: Feedback successfully submitted
 */
router.post('/feedback', feedbackController.postFeedback);

export default router;