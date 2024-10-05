import { Request, Response } from 'express';
import db from '../database';
import { validationResult } from 'express-validator';

interface QueryParams {
  topic?: string;
}

const getAllQuizQuestions = async (req: Request, res: Response): Promise<Response> => {

  try {
    const { topic }: QueryParams = req.query;
    let query = `
      SELECT qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, q.name AS quiz_name, qq.additional_info 
      FROM quiz_questions AS qq 
      INNER JOIN quizzes AS q 
      ON qq.quiz_id = q.id`;

    if (topic){
      query += ` WHERE q.name ILIKE '${topic}';`
    }

    const result = await db.query(query);

    return res.status(200).json({data: result.rows});
  } catch (error){
    const err = error as Error;
    return res.status(500).json({error: err.message});
  }

}

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
    const quizId = result.rows[0].id;

    if(!quizId){
      throw new Error("No quiz ID for "+ quizName)
    }

    let query = `INSERT INTO feedback (feedback, quiz_id, date_time) VALUES ( '${feedback}', ${quizId}, NOW());`;

    const result2 = await db.query(query);

    return res.status(201).json({message: "ok"});
  } catch (error){
    const err = error as Error;
    return res.status(500).json({message: err.message});
  }
}

export default { getAllQuizQuestions, postFeedback };