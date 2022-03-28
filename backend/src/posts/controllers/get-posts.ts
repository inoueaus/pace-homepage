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

interface PostModel {
  id: number;
  title: string;
  body: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
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
      posts.map<PostModel>(post => ({
        id: post.id,
        title: post.title,
        body: post.body,
        picture: post.picture // convert to base64 if picture stored
          ? Buffer.from(post.picture, "hex").toString("base64")
          : null,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      }))
    );
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default getPosts;
