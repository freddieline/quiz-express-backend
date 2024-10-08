"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizQuestionsController_1 = __importDefault(require("../controllers/quizQuestionsController"));
const capitalsController_1 = __importDefault(require("../controllers/capitalsController"));
const feedbackController_1 = __importDefault(require("../controllers/feedbackController"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/capitals', capitalsController_1.default.getAllCapitals);
router.get('/quiz-questions', quizQuestionsController_1.default.getAllQuizQuestions);
const validateQuizQuestion = [
    (0, express_validator_1.body)('id').notEmpty().withMessage('Quiz question id is required'),
];
router.patch('/quiz-question', validateQuizQuestion, quizQuestionsController_1.default.patchQuizQuestion);
const validateFeedback = [
    (0, express_validator_1.body)('quizName').notEmpty().withMessage('Quiz name is required'),
    (0, express_validator_1.body)('feedback').notEmpty().withMessage('Feedback is required'),
];
router.post('/feedback', validateFeedback, feedbackController_1.default.postFeedback);
exports.default = router;
