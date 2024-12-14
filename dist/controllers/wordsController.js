"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const snakeToCamel_1 = require("../lib/snakeToCamel");
const getWords = async (req, res) => {
    try {
        const { word_length } = req.query;
        let query = `
      SELECT word
      FROM words`;
        if (word_length) {
            query += ` WHERE word_length = '${word_length}';`;
        }
        const result = await database_1.default.query(query);
        if (result.rows) {
            const words = result.rows.map((item) => item.word);
            return res.status(200).json((0, snakeToCamel_1.transformKeys)(words));
        }
        return res.status(500).json({ data: "No data!" });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: err.message });
    }
};
exports.default = { getWords };
