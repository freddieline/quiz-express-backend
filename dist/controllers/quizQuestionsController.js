"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const express_validator_1 = require("express-validator");
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
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // Return a 400 response with validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        const quizIDQuery = `SELECT id FROM quizzes WHERE name = '${quizName}';`;
        const result = await database_1.default.query(quizIDQuery);
        if (!result.rows[0]) {
            throw new Error("No quiz ID for " + quizName);
        }
        const quizId = result.rows[0].id;
        let query = `INSERT INTO feedback (feedback, quiz_id, date_time) VALUES ( '${feedback}', ${quizId}, NOW());`;
        const result2 = await database_1.default.query(query);
        return res.status(201).json({ message: "ok" });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: err.message });
    }
};
exports.default = { getAllQuizQuestions, postFeedback };
