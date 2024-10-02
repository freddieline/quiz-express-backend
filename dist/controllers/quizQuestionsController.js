"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const getAllQuizQuestions = async (req, res) => {
    console.log("yes2");
    try {
        const { topic } = req.query;
        let query = `
    SELECT qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, t.name, qq.additional_info 
    FROM quiz_questions AS qq 
    INNER JOIN topics AS t 
    ON qq.topic_id = t.id
    `;
        if (topic) {
            query += ` WHERE t.name ILIKE '${topic}';`;
        }
        console.log(query);
        const result = await database_1.default.query(query);
        return res.status(200).json({ data: result.rows });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: err.message });
    }
};
exports.default = { getAllQuizQuestions };
