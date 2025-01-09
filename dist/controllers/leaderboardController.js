"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const database_1 = __importDefault(require("../database"));
const getLeaderboard = async (req, res) => {
    const { game } = req.query;
    if (!game) {
        return res.status(400).json({ error: "Game not provided" });
    }
    try {
        const query = (0, sql_template_strings_1.default) `
    SELECT * FROM leaderboard WHERE game = $1 ORDER BY score DESC;
    `;
        const result = await database_1.default.query(query, [game]);
        return res.status(200).json(result.rows);
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: err.message });
    }
};
const postLeaderboardItem = async (req, res) => {
    const { game, name, score } = req.body;
    if (!game || !name || !score) {
        return res.status(400).json({
            error: "Not all values provided",
            missing: { game: !game, name: !name, score: !score },
        });
    }
    const nameLowerCase = name?.toLowerCase();
    try {
        const query = (0, sql_template_strings_1.default) `
    INSERT INTO leaderboard (name, score, game) VALUES ($1, $2, $3);
    `;
        const result = await database_1.default.query(query, [nameLowerCase, score, game]);
        return res.status(201).json({
            message: "Leaderboard item created successfully",
            item: result.rows[0],
        });
    }
    catch (e) {
        const err = e;
        return res.status(500).json({ error: err.message });
    }
};
exports.default = { getLeaderboard, postLeaderboardItem };
