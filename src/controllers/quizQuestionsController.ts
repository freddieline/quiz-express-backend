import { Request, Response } from "express";
import db from "../database";
import { validationResult } from "express-validator";
import { transformKeys } from "../lib/snakeToCamel";
import sql from "sql-template-strings";

interface QueryParams {
  topic?: string;
}

const getAllQuizQuestions = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { topic }: QueryParams = req.query;
    let query = sql`
      SELECT qq.id, qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, q.name as quiz_name, qq.additional_info 
      FROM quiz_questions AS qq 
      INNER JOIN quizzes AS q 
      ON qq.quiz_id = q.id`;

    if (topic) {
      query = sql`
        SELECT qq.id, qq.question, qq.answer_1, qq.answer_2, qq.answer_3, qq.answer_4, qq.correct_answer, q.name as quiz_name, qq.additional_info 
        FROM quiz_questions AS qq 
        INNER JOIN quizzes AS q 
        ON qq.quiz_id = q.id 
        WHERE q.name ILIKE '${topic}';`;
    }

    const result = await db.query(query);

    if (result.rows) {
      return res.status(200).json(transformKeys(result.rows));
    }

    return res.status(500).json({ data: "No data!" });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
};

const patchQuizQuestion = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a 400 response with validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      id,
      question = "",
      answer1 = "",
      answer2 = "",
      answer3 = "",
      answer4 = "",
      correctAnswer = null,
      additionalInfo = "",
    } = req.body;

    const query = sql`UPDATE quiz_questions
                    SET
                        question = COALESCE(NULLIF('${question}', ''), question),
                        answer_1 = COALESCE(NULLIF('${answer1}', ''), answer_1),
                        answer_2 = COALESCE(NULLIF('${answer2}', ''), answer_2),
                        answer_3 = COALESCE(NULLIF('${answer3}', ''), answer_3),
                        answer_4 = COALESCE(NULLIF('${answer4}', ''), answer_4),
                        correct_answer = COALESCE(NULLIF(${correctAnswer}::INTEGER, NULL), correct_answer),
                        additional_info = COALESCE(NULLIF('${additionalInfo}', ''), additional_info)
                    WHERE id = ${id};`;
    console.log(query);

    await db.query(query);
    return res.status(201);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export default { getAllQuizQuestions, patchQuizQuestion };
