"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const getAllCapitals = async (req, res) => {
    try {
        const { continent } = req.query;
        let query = `
    SELECT 
      capitals.name as capital, 
      capitals.country as country, 
      continents.name as continent,
      quizzes.name as quizName
    FROM capitals 
    INNER JOIN continents 
    ON capitals.continent_id = continents.id
    INNER JOIN quizzes
    ON capitals.quiz_id = quizzes.id
    `;
        if (continent) {
            console.log(continent);
            query += ` WHERE continents.name ILIKE '${continent}'`;
        }
        query += ';';
        console.log(query);
        let result = await database_1.default.query(query);
        return res.status(200).json({ data: result.rows });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error.message" });
    }
};
exports.default = { getAllCapitals };
