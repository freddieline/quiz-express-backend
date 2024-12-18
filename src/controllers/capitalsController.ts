import { Request, Response } from "express";
import db from "../database";
import { transformKeys } from "../lib/snakeToCamel";
import sql from "sql-template-strings";

interface QueryParams {
  continent?: string;
}

const getAllCapitals = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { continent }: QueryParams = req.query;
    let result;

    let query = sql`
          SELECT 
            capitals.name as capital, 
            capitals.country as country, 
            continents.name as continent,
            quizzes.name as quiz_name
          FROM capitals 
          INNER JOIN continents 
          ON capitals.continent_id = continents.id
          INNER JOIN quizzes
          ON capitals.quiz_id = quizzes.id;
          `;

    if (continent) {
      query = sql`SELECT 
            capitals.name as capital, 
            capitals.country as country, 
            continents.name as continent,
            quizzes.name as quiz_name
          FROM capitals 
          INNER JOIN continents 
          ON capitals.continent_id = continents.id
          INNER JOIN quizzes
          ON capitals.quiz_id = quizzes.id WHERE continents.name ILIKE $1;`;
      const values = [continent];
      result = await db.query(query, values);
    } else {
      result = await db.query(query);
    }

    if (result.rows) {
      return res.status(200).json({ data: transformKeys(result.rows) });
    }

    return res.status(500).json({ data: "No data!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error.message" });
  }
};

export default { getAllCapitals };
