import { Request, Response } from 'express';
import db from '../database'


interface QueryParams {
  continent?: string;
}

const getAllCapitals = async (req: Request, res: Response): Promise<Response> => {
  try {

    const { continent }: QueryParams = req.query;

    let query = `
    SELECT 
      capitals.name as capital, 
      capitals.country as country, 
      continents.name as continent,
      quizzes.name as quizName
    FROM capitals 
    INNER JOIN continents 
    ON capitals.continent_id = continents.id
    INNER JOIN quizzes
    ON capitals.quiz_id = quizzes.id
    `;

    if (continent) {
      console.log(continent)
      query += ` WHERE continents.name ILIKE '${continent}'`
    }

    query += ';'
    console.log(query);
    let result = await db.query(query);
    return res.status(200).json({data: result.rows})
  }
  catch (error ){
    console.log(error);
    return res.status(500).json({ error: "error.message"});
  }
}

export default { getAllCapitals };