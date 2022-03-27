import { Request, Response } from "express";
import sql from "../../db";

interface PostEntry {
  id: number;
  title: string;
  body: string;
  picture: string;
  created_at: string;
  updated_at: string;
}

const getPosts = async (req: Request, res: Response) => {
  const pageNo = req.query.page_no ? Number(req.query.page_no) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  try {
    if (isNaN(pageNo)) throw Error("Page No must be a number");
    if (isNaN(limit)) throw Error("Limit must be a number");

    const posts = await sql<
      PostEntry[]
    >`SELECT id, title, body, picture, created_at, updated_at
        FROM posts
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${pageNo * limit};`;

    res.json(
      posts.map(post => {
        if (post.picture) {
          post.picture = Buffer.from(post.picture, "hex").toString("base64"); // convert to base64 if picture stored
        }
        return post;
      })
    );
  } catch (error) {
    res.statusCode = 400;
    if (error instanceof Error) {
      res.json({ message: error.message });
    }
  }
};

export default getPosts;
