"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const snakeToCamel_1 = require("../lib/snakeToCamel");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const getAllCapitals = async (req, res) => {
    try {
        const { continent } = req.query;
        let query = (0, sql_template_strings_1.default) `
          SELECT 
            capitals.name as capital, 
            capitals.country as country, 
            continents.name as continent,
            quizzes.name as quiz_name
          FROM capitals 
          INNER JOIN continents 
          ON capitals.continent_id = continents.id
          INNER JOIN quizzes
          ON capitals.quiz_id = quizzes.id;
          `;
        if (continent) {
            console.log(continent);
            query = (0, sql_template_strings_1.default) `SELECT 
            capitals.name as capital, 
            capitals.country as country, 
            continents.name as continent,
            quizzes.name as quiz_name
          FROM capitals 
          INNER JOIN continents 
          ON capitals.continent_id = continents.id
          INNER JOIN quizzes
          ON capitals.quiz_id = quizzes.id WHERE continents.name ILIKE '${continent}';`;
        }
        let result = await database_1.default.query(query);
        if (result.rows) {
            return res.status(200).json({ data: (0, snakeToCamel_1.transformKeys)(result.rows) });
        }
        return res.status(500).json({ data: "No data!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error.message" });
    }
};
exports.default = { getAllCapitals };
