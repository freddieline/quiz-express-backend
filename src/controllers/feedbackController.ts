
import { Request, Response } from 'express';
import db from '../database';
import { validationResult } from 'express-validator';


const postFeedback = async (req:Request, res:Response): Promise<Response> => {
  try {
    const { quizName, feedback } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return a 400 response with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const quizIDQuery = `SELECT id FROM quizzes WHERE name = '${quizName}';`;
    const result = await db.query(quizIDQuery);

    if(!result.rows[0]){
      throw new Error("No quiz ID for "+ quizName);
    }

    const quizId = result.rows[0].id;

    let query = `INSERT INTO feedback (feedback, quiz_id, date_time) VALUES ( '${feedback}', ${quizId}, NOW());`;

    const result2 = await db.query(query);

    return res.status(201).json({message: "ok"});
  } catch (error){
    const err = error as Error;
    return res.status(500).json({message: err.message});
  }
}

export default { postFeedback };