import { Request, Response } from "express";
import sql from "../../db";
import { processProvidedImage } from "../helpers";

interface PropertiesToUpdate {
  title: string;
  body: string;
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
      title,
      body,
    };

    const [result] = await sql`UPDATE posts SET ${sql(propertiesToUpdate)}
    WHERE id = ${id} RETURNING id`;

    if (!(result && typeof result.id === "number"))
      throw Error("Database did not return post ID");

    if (newImage) {
      const [hasImageResult] =
        await sql`SELECT img_id FROM images WHERE post_id = ${result.id}`;
      const hasImage = Boolean(hasImageResult);
      if (hasImage) {
        const [imgResult] = await sql`UPDATE images SET img = ${newImage}
          WHERE post_id = ${result.id} RETURNING img_id AS id;`;
        if (!(imgResult && typeof imgResult.id === "number"))
          throw Error("Image not Updated");
      } else {
        const imgName =
          String(result.id) + "_img_" + String(new Date().getTime());
        const [imgResult] =
          await sql`INSERT INTO images (img, img_name, post_id)
            VALUES (${newImage}, ${imgName}, ${result.id}) RETURNING img_id AS id`;
        if (!(imgResult && imgResult.id)) throw Error("Image not saved to DB");
      }
    }

    res.status(200).json({ id: result.id, updated: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      updated: false,
    });
  }
};

export default updatePost;
