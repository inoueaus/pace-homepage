import { Request, Response } from "express";
import sql from "../../db";
import { convertB64StringToHex } from "./helpers";

const updatePost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const body = req.body.body;
  const pictureProvided = req.body.picture;
  const id = Number(req.params.id);

  try {
    if (typeof title !== "string") throw Error("No title provided.");
    if (typeof body !== "string") throw Error("No body provided");
    if (isNaN(id)) throw TypeError("Id must be a string");

    const pictureHex =
      typeof pictureProvided === "string"
        ? convertB64StringToHex(pictureProvided)
        : null;

    const [result] = await sql`UPDATE posts SET ${sql({
      title,
      body,
      picture: pictureHex,
    })}
    WHERE id = ${id} RETURNING id`;

    res.json({ id: result.id, updated: true });
  } catch (error) {
    res.statusCode = 400;
    res.json({
      message: error instanceof Error ? error.message : "Invalid request.",
      updated: false,
    });
  }
};

export default updatePost;
