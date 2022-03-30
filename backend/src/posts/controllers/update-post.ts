import { Request, Response } from "express";
import sql from "../../db";
import { convertB64StringToHex } from "../helpers";

interface PropertiesToUpdate {
  title?: string;
  body?: string;
  picture?: string;
  updated_at: Date;
}

const updatePost = async (req: Request, res: Response) => {
  const title = req.body.title as string; // typescript cant infer type from line 19
  const body = req.body.body as string; // so manually asign type here
  const pictureProvided = req.body.picture;
  const id = Number(req.params.id);

  try {
    if (!(typeof title === "string" || typeof body === "string"))
      throw Error("No title or body provided.");
    if (isNaN(id)) throw TypeError("Id must be a string");

    const pictureHex =
      typeof pictureProvided === "string"
        ? convertB64StringToHex(pictureProvided)
        : null;

    const propertiesToUpdate: PropertiesToUpdate = {
      updated_at: new Date(), // must use date object with postgres.js dynamic query
    };

    if (title) propertiesToUpdate.title = title; // only update values provided
    if (body) propertiesToUpdate.body = body;
    if (pictureHex) propertiesToUpdate.picture = pictureHex;

    const [result] = await sql`UPDATE posts SET ${sql(propertiesToUpdate)}
    WHERE id = ${id} RETURNING id`;

    res.status(200).json({ id: result.id, updated: true });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      updated: false,
    });
  }
};

export default updatePost;
