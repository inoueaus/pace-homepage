import { Request, Response } from "express";
import sql from "../../db";
import { processProvidedImage } from "../helpers";

const newPost = async (req: Request, res: Response) => {
  const title = req.body.title;
  const body = req.body.body;
  const pictureProvided = req.body.picture;

  try {
    const picture = processProvidedImage(pictureProvided);
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
      const imgName =
        String(result.id) + "_img_" + String(new Date().getTime());
      const [imgResult] = await sql`INSERT INTO images (img, img_name, post_id)
      VALUES (${picture}, ${imgName}, ${result.id}) RETURNING img_id AS id`;

      if (!imgResult.id) throw Error("Image not saved to DB");
    }

    res.status(201).json({ id: result.id, created: true });
  } catch (error) {
    console.log(error);
    res.statusCode = 400;
    if (error instanceof Error) res.json({ message: error.message });
  }
};

export default newPost;
