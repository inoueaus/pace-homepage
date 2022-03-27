import { Request, Response } from "express";
import sql from "../db";

export const getPostsByPage = async (req: Request, res: Response) => {
  const pageNo = req.query.page_no ? Number(req.query.page_no) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  try {
    if (isNaN(pageNo)) throw Error("Page No must be a number");
    if (isNaN(limit)) throw Error("Limit must be a number");

    const posts = await sql`SELECT id, title, body, picture, created_at, updated_at
        FROM posts
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${pageNo * limit};`;

    res.json(posts);
  } catch (error) {
    res.statusCode = 400;
    if (error instanceof Error) {
      res.json({ message: error.message });
    }
  }
};

export const newPost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const body = req.body.body;
  const pictureParam = req.body.picture;
  const picture = typeof pictureParam === "string" ? pictureParam : null;

  try {
    if (typeof title !== "string") throw Error("No title provided.");
    if (typeof body !== "string") throw Error("No body provided");

    const [result] =
      await sql`INSERT INTO posts (title, body, picture, created_at, updated_at)
    VALUES (${title}, ${body}, ${picture}, NOW(), NOW())
    RETURNING id;`;

    res.json({ id: result.id, created: true });
  } catch (error) {
    res.statusCode = 400;
    if (error instanceof Error) res.json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const body = req.body.body;


  res.json("test");
};

export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    if (isNaN(id)) throw TypeError("ID must be a number");

    const [result] = await sql`DELETE FROM posts
    WHERE id = ${id}
    RETURNING id`;

    res.json({ id: result.id, deleted: true });
  } catch (error) {
    res.statusCode = 400;
  }
};
