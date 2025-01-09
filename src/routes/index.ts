import { Router } from "express";
import quizQuestionsController from "../controllers/quizQuestionsController";
import capitalsController from "../controllers/capitalsController";
import feedbackController from "../controllers/feedbackController";
import wordsController from "../controllers/wordsController";
import leaderboardController from "../controllers/leaderboardController";

const router = Router();
router.get("/capitals", capitalsController.getAllCapitals);

router.get("/quiz-questions", quizQuestionsController.getAllQuizQuestions);

router.post("/feedback", feedbackController.postFeedback);

router.get("/words", wordsController.getWords);

router.get("/leaderboard", leaderboardController.getLeaderboard);

router.post("/leaderboard", leaderboardController.postLeaderboardItem);

export default router;
