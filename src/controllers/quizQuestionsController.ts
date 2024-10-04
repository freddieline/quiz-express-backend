import { Request, Response } from 'express';
import db from '../database'

interface QueryParams {
  topic?: string;
}

const getAllQuizQuestions = async (req: Request, res: Response): Promise<Response> => {
  console.log("yes2");
  try{


    const { topic }: QueryParams = req.query;


    let query = `
    SELECT qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, q.name AS quiz_name, qq.additional_info 
    FROM quiz_questions AS qq 
    INNER JOIN quizzes AS q 
    ON qq.quiz_id = q.id
    `;

    if (topic){
      query += ` WHERE q.name ILIKE '${topic}';`
    }

    console.log(query);

    const result = await db.query(query);

    return res.status(200).json({data: result.rows});
  } catch (error){
    const err = error as Error;
    return res.status(500).json({error: err.message});
  }

}

export default { getAllQuizQuestions };