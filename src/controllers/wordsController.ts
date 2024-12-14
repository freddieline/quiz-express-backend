import { Request, Response } from 'express';
import db from '../database';
import { transformKeys } from '../lib/snakeToCamel';

interface QueryParams {
  word_length?: string;
}

const getWords = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { word_length }: QueryParams = req.query;
    let query = `
      SELECT word
      FROM words`;

    if (word_length){
      query += ` WHERE word_length = '${word_length}';`
    }

    const result = await db.query(query);

    if(result.rows){
      const words = result.rows.map((item) => item.word)
      return res.status(200).json(transformKeys(words))
    }

    return res.status(500).json({data: "No data!"})

  } catch (error){
    const err = error as Error;
    return res.status(500).json({error: err.message});
  }
}

export default { getWords };