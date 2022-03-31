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
        ? Buffer.from(pictureProvided, "base64url") // must do some security work here
        : null; // convert base64 image to hex binary
    if (typeof title !== "string") throw Error("No title provided.");
    if (typeof body !== "string") throw Error("No body provided");

    console.log(picture, picture?.toString("base64"));
    const [result] =
      await sql`INSERT INTO posts (title, body, created_at, updated_at)
    VALUES (${title}, ${body}, NOW(), NOW())
    RETURNING id;`;

    if (typeof result.id !== "number")
      throw Error("Id not returned from DB on insert");

    if (picture) {
      const [imgResult] = await sql`INSERT INTO images (img, img_name, post_id)
      VALUES (${picture}, ${String(result.id) + String(new Date().getTime())}, ${
        result.id
      }) RETURNING img_id AS id`;
    }

    res.status(201).json({ id: result.id, created: true, });
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    if (error instanceof Error) res.json({ message: error.message });
  }
};

export default newPost;
