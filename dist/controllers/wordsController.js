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
          SELECT w.id
          FROM words w
          ORDER BY RANDOM()
          LIMIT 1
        )
        SELECT 
            w.id,
            LOWER(w.word) as word,
            w.hint,
            LOWER(w.main_letter) as main_letter
        FROM words w
        WHERE w.id = (SELECT id FROM random_parent_word)
        GROUP BY w.id, w.word, w.hint, w.main_letter;
`;
        const result = await database_1.default.query(query);
        const randomizeLetters = (word) => word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
        if (result.rows) {
            return res.status(200).json((0, snakeToCamel_1.transformKeys)({
                ...result.rows[0],
                letters: Array.from(randomizeLetters(result.rows[0].word.replace(result.rows[0].main_letter, ""))),
            }));
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
