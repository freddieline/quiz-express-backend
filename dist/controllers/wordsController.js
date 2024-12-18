"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const snakeToCamel_1 = require("../lib/snakeToCamel");
const getWords = async (req, res) => {
    try {
        let query = (0, sql_template_strings_1.default) `
        WITH random_parent_word AS (
        SELECT parent_word as word
        FROM derived_words 
        ORDER BY RANDOM() 
        LIMIT 1
        )
        SELECT 
            w.id,
            w.word,
            w.hint, 
            w.main_letter,
            ARRAY_AGG(dw.word) AS derived_words
        FROM words w
        JOIN derived_words dw ON dw.parent_word = w.id
        WHERE w.id = (SELECT parent_word FROM random_parent_word)
        GROUP BY w.id, w.word, w.hint, w.main_letter;`;
        const result = await database_1.default.query(query);
        if (result.rows) {
            return res.status(200).json((0, snakeToCamel_1.transformKeys)(result.rows));
        }
        else {
            return res.status(500).json({ data: "No data!" });
        }
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: err.message });
    }
};
exports.default = { getWords };
