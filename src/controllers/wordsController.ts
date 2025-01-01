import { Request, Response } from "express";
import db from "../database";
import sql from "sql-template-strings";
import { transformKeys } from "../lib/snakeToCamel";

const getWords = async (req: Request, res: Response): Promise<Response> => {
  try {
    let query = sql`
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
            LOWER(w.main_letter) as main_letter,
            ARRAY_AGG(LOWER(dw.word)) AS derived_words
        FROM words w
        JOIN derived_words dw ON dw.parent_word = w.id
        WHERE w.id = (SELECT id FROM random_parent_word)
        GROUP BY w.id, w.word, w.hint, w.main_letter;
`;

    const result = await db.query(query);

    const randomizeLetters = (word: string) =>
      word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    if (result.rows) {
      return res
        .status(200)
        .json(
          transformKeys({
            ...result.rows[0],
            letters: Array.from(randomizeLetters(result.rows[0].word.replace(result.rows[0].main_letter, ''))),
          }),
        );
    } else {
      return res.status(500).json({ data: "No data!" });
    }
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
};

export default { getWords };
