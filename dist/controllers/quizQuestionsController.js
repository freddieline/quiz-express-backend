"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const getAllQuizQuestions = async (req, res) => {
    try {
        const { topic } = req.query;
        let query = `
      SELECT qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, q.name AS quiz_name, qq.additional_info 
      FROM quiz_questions AS qq 
      INNER JOIN quizzes AS q 
      ON qq.quiz_id = q.id`;
        if (topic) {
            query += ` WHERE q.name ILIKE '${topic}';`;
        }
        const result = await database_1.default.query(query);
        return res.status(200).json({ data: result.rows });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: err.message });
    }
};
const postFeedback = async (req, res) => {
    try {
        const { quizName, feedback } = req.body;
        console.log(quizName, feedback);
        const quizIDQuery = `SELECT id FROM quizzes WHERE name = '${quizName}';`;
        const result = await database_1.default.query(quizIDQuery);
        const quizId = result.rows[0].id;
        console.log(quizId);
        if (!quizId) {
            throw new Error("No quiz ID for " + quizName);
        }
        const timestamp = new Date();
        let query = `INSERT INTO feedback (feedback, quiz_id, date_time) VALUES ( '${feedback}', ${quizId}, NOW());`;
        console.log(query);
        const result2 = await database_1.default.query(query);
        return res.status(200).json(result2.rows);
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: err.message });
    }
};
exports.default = { getAllQuizQuestions, postFeedback };
