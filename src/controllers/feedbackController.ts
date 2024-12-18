import { Request, Response } from "express";
import db from "../database";
import sql from "sql-template-strings";

const postFeedback = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { quizName, feedback } = req.body;

    const quizIDQuery = sql`SELECT id FROM quizzes WHERE name = '${quizName}';`;
    const result = await db.query(quizIDQuery);

    if (!result.rows[0]) {
      throw new Error("No quiz ID for " + quizName);
    }

    const quizId = result.rows[0].id;

    let query = sql`INSERT INTO feedback (feedback, quiz_id, date_time) VALUES ( '${feedback}', ${quizId}, NOW());`;

    await db.query(query);

    return res.status(201);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export default { postFeedback };
