"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const postFeedback = async (req, res) => {
    try {
        const { quizName, feedback } = req.body;
        const quizIDQuery = `SELECT id FROM quizzes WHERE name = '${quizName}';`;
        const result = await database_1.default.query(quizIDQuery);
        if (!result.rows[0]) {
            throw new Error("No quiz ID for " + quizName);
        }
        const quizId = result.rows[0].id;
        let query = `INSERT INTO feedback (feedback, quiz_id, date_time) VALUES ( '${feedback}', ${quizId}, NOW());`;
        await database_1.default.query(query);
        return res.status(201);
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: err.message });
    }
};
exports.default = { postFeedback };
