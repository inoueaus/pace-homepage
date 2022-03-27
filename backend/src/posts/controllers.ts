import { Request, Response } from "express";
import sql from "../db";

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
    res.json({
      message: error instanceof Error ? error.message : "Invalid request.",
      deleted: false,
    });
  }
};

const convertB64StringToHex = (b64String: string) =>
  Buffer.from(b64String, "base64").toString("hex");
