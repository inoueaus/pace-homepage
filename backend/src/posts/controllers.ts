import { Request, Response } from "express";
import sql from "../db";

export const getPostsByPage = async (req: Request, res: Response) => {
  const pageNo = req.query.page_no ? Number(req.query.page_no) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  try {
    if (isNaN(pageNo)) throw Error("Page No must be a number");
    if (isNaN(limit)) throw Error("Limit must be a number");

    const posts = await sql`SELECT id, title, body, created_at, updated_at
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

  try {
    if (typeof title !== "string") throw Error("No title provided.");
    if (typeof body !== "string") throw Error("No body provided");

    const [result] =
      await sql`INSERT INTO posts (title, body, created_at, updated_at)
    VALUES (${title}, ${body}, NOW(), NOW())
    RETURNING id;`;

    res.json({ id: result.id });
  } catch (error) {
    res.statusCode = 400;
    if (error instanceof Error) res.json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  console.log(req.params);
  res.json("test");
};

export const deletePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
  } catch (error) {}
};
