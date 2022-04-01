import { Request, Response } from "express";
import sql from "../../db";
import { PostEntry, PostModel } from "../../types";

const getPosts = async (req: Request, res: Response) => {
  const pageNo = req.query.page ? Number(req.query.page) : 0; // default page 1
  const limit = req.query.limit ? Number(req.query.limit) : 10; // default 10 per page

  try {
    if (isNaN(pageNo)) throw Error("Page No must be a number");
    if (isNaN(limit)) throw Error("Limit must be a number");

    const posts = await sql<
      PostEntry[]
    >`SELECT id, title, body, img, created_at, updated_at
        FROM posts
        LEFT JOIN images
        ON images.post_id = posts.id
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${pageNo * limit};`;

    res.json(
      posts.map<PostModel>(post => ({
        id: post.id,
        title: post.title,
        body: post.body,
        picture: post.img // convert to base64 if picture stored
          ? Buffer.from(post.img, "binary").toString("base64")
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
