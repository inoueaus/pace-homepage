import { Request, Response } from "express";
import sql from "../../db";
import { PostEntry } from "../../types";


const getPost = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);

  try {
    if (isNaN(postId)) throw Error("Post ID must be a number");

    const [post] = await sql<
      PostEntry[]
    >`SELECT id, title, body, img, created_at, updated_at
        FROM posts
        LEFT JOIN images
        ON images.post_id = posts.id
        WHERE id = ${postId}`;

    res.json({
      id: post.id,
      title: post.title,
      body: post.body,
      picture: post.img // convert to base64 if picture stored
        ? Buffer.from(post.img, "binary").toString("base64")
        : null,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default getPost;
