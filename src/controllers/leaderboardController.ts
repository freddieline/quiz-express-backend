import { Request, Response } from "express";
import sql from "sql-template-strings";
import db from "../database";

interface QueryParams {
  game?: string;
}

interface BodyParams {
  game?: string;
  name?: string;
  score?: string;
}

const getLeaderboard = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { game }: QueryParams = req.query;

  if(!game){
    return res.status(400).json({error: "Game not provided"})
  }

  try {
    const query = sql`
    SELECT * FROM leaderboard WHERE game = $1 ORDER BY score DESC;
    `;
    const result = await db.query(query,[game]);

    return res.status(200).json(result.rows);
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ error: err.message });
  }
};

const postLeaderboardItem = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { game, name, score }: BodyParams = req.body;

  if (!game || !name || !score) {
    return res.status(400).json({
      error: "Not all values provided",
      missing: { game: !game, name: !name, score: !score },
    });
  }

  const nameLowerCase = name?.toLowerCase();

  try {
    const query = sql`
    INSERT INTO leaderboard (name, score, game) VALUES ($1, $2, $3);
    `;
    const result = await db.query(query, [nameLowerCase, score, game]);

    return res.status(201).json({
      message: "Leaderboard item created successfully",
      item: result.rows[0],
    });
  } catch (e) {
    const err = e as Error;
    return res.status(500).json({ error: err.message });
  }
};

export default { getLeaderboard, postLeaderboardItem };
