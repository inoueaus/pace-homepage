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
  const pageNo = req.query.page ? Number(req.query.page) : 0; // default page 1
  const limit = req.query.limit ? Number(req.query.limit) : 10; // default 10 per page

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
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default getPosts;
