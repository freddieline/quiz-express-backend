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
router.post('/feedback', feedbackController_1.default.postFeedback);
exports.default = router;
