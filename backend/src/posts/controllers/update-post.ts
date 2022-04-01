import { Request, Response } from "express";
import sql from "../../db";
import { processProvidedImage } from "../helpers";

interface PropertiesToUpdate {
  title?: string;
  body?: string;
  updated_at: Date;
}

const updatePost = async (req: Request, res: Response) => {
  const title = req.body.title as string; // typescript cant infer type from line 19
  const body = req.body.body as string; // so manually asign type here
  const imageProvided = req.body.picture;
  const id = Number(req.params.id);

  try {
    if (!(typeof title === "string" || typeof body === "string"))
      throw Error("No title or body provided.");
    if (isNaN(id)) throw TypeError("Id must be a string");
    const newImage = processProvidedImage(imageProvided);

    const propertiesToUpdate: PropertiesToUpdate = {
      updated_at: new Date(), // must use date object with postgres.js dynamic query
    };

    if (title) propertiesToUpdate.title = title; // only update values provided
    if (body) propertiesToUpdate.body = body;

    const [result] = await sql`UPDATE posts SET ${sql(propertiesToUpdate)}
    WHERE id = ${id} RETURNING id`;

    if (typeof result.id !== "number")
      throw Error("Database did not return post ID");

    if (newImage) {
      const [imgResult] = await sql`UPDATE images SET img = ${newImage}
      WHERE post_id = ${result.id} RETURNING img_id AS id`;
      if (typeof imgResult.id !== "number") throw Error("Image not Updated");
    }

    res.status(200).json({ id: result.id, updated: true });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      updated: false,
    });
  }
};

export default updatePost;
