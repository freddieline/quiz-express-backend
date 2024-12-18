import { Request, Response } from "express";
import db from "../database";
import sql from "sql-template-strings";

const getWords = async (req: Request, res: Response): Promise<Response> => {
  try {
    let query = sql`
        WITH random_parent_word AS (
        SELECT parent_word 
        FROM derived_words 
        ORDER BY RANDOM() 
        LIMIT 1
        )
        SELECT 
            w.id AS parent_word_id,
            w.word AS parent_word,
            w.hint, 
            w.main_letter,
            ARRAY_AGG(dw.word) AS derived_words
        FROM words w
        JOIN derived_words dw ON dw.parent_word = w.id
        WHERE w.id = (SELECT parent_word FROM random_parent_word)
        GROUP BY w.id, w.word, w.hint, w.main_letter;`;

    const result = await db.query(query);

    if (result.rows) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(500).json({ data: "No data!" });
    }
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
};

export default { getWords };
