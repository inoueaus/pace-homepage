import { Request, Response } from "express";
import sql from "../../db";
import { convertB64StringToHex } from "../helpers";

const newPost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const body = req.body.body;
  const pictureProvided = req.body.picture;

  try {
    const picture =
      typeof pictureProvided === "string"
        ? convertB64StringToHex(pictureProvided) // must do some security work here
        : null; // convert base64 image to hex binary
    if (typeof title !== "string") throw Error("No title provided.");
    if (typeof body !== "string") throw Error("No body provided");

    const [result] =
      await sql`INSERT INTO posts (title, body, picture, created_at, updated_at)
    VALUES (${title}, ${body}, ${picture}, NOW(), NOW())
    RETURNING id;`;

    res.status(201).json({ id: result.id, created: true });
  } catch (error) {
    res.statusCode = 400;
    if (error instanceof Error) res.json({ message: error.message });
  }
};

export default newPost;
