"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizQuestionsController_1 = __importDefault(require("../controllers/quizQuestionsController"));
const capitalsController_1 = __importDefault(require("../controllers/capitalsController"));
const feedbackController_1 = __importDefault(require("../controllers/feedbackController"));
const router = (0, express_1.Router)();
router.get('/capitals', capitalsController_1.default.getAllCapitals);
router.get('/quiz-questions', quizQuestionsController_1.default.getAllQuizQuestions);
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
router.patch('/quiz-question', quizQuestionsController_1.default.patchQuizQuestion);
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
router.post('/feedback', feedbackController_1.default.postFeedback);
exports.default = router;
