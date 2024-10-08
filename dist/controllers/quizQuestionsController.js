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
      SELECT qq.id, qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, q.name as quiz_name, qq.additional_info 
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
const patchQuizQuestion = async (req, res) => {
    console.log("yes");
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            // Return a 400 response with validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, question = '', answer1 = '', answer2 = '', answer3 = '', answer4 = '', correctAnswer = null, additionalInfo = '' } = req.body;
        const query = `UPDATE quiz_questions
                    SET
                        question = COALESCE(NULLIF('${question}', ''), question),
                        answer_1 = COALESCE(NULLIF('${answer1}', ''), answer_1),
                        answer_2 = COALESCE(NULLIF('${answer2}', ''), answer_2),
                        answer_3 = COALESCE(NULLIF('${answer3}', ''), answer_3),
                        answer_4 = COALESCE(NULLIF('${answer4}', ''), answer_4),
                        correct_answer = COALESCE(NULLIF(${correctAnswer}::INTEGER, NULL), correct_answer),
                        additional_info = COALESCE(NULLIF('${additionalInfo}', ''), additional_info)
                    WHERE id = ${id};`;
        console.log(query);
        await database_1.default.query(query);
        return res.status(201).json({ message: "ok" });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: err.message });
    }
};
exports.default = { getAllQuizQuestions, patchQuizQuestion };
