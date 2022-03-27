import { Request, Response } from "express";
import sql from "../db";

interface PostEntry {
  id: number;
  title: string;
  body: string;
  picture: string;
  created_at: string;
  updated_at: string;
}

export const getPostsByPage = async (req: Request, res: Response) => {
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
          post.picture = Buffer.from(post.picture, "hex").toString("base64");
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

export const newPost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const body = req.body.body;
  const pictureParam = req.body.picture;

  try {
    const picture =
      typeof pictureParam === "string"
        ? convertB64StringToHex(pictureParam) // must do some security work here
        : null; // convert base64 image to hex binary
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
  const pictureParam = req.body.picture;

  try {
    if (typeof title !== "string") throw Error("No title provided.");
    if (typeof body !== "string") throw Error("No body provided");
    if (pictureParam) {
    } else {
    }
  } catch (error) {
    res.statusCode = 400;
  }
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

const convertB64StringToHex = (b64String: string) =>
  Buffer.from(b64String, "base64").toString("hex");
