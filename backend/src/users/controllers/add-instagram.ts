import { Request, Response } from "express";
import sql from "../../db";
import bcrypt from "bcryptjs";
import { envVars } from "../../env-variables";

const addInstagram = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const instaUsername = req.body.instaUsername;
  const instaPassword = req.body.instaPassword;

  try {
    if (isNaN(userId)) throw TypeError("User ID must be Number.");
    if (typeof instaUsername !== "string" || typeof instaPassword !== "string")
      throw TypeError("Insta Credentials' formats are incorrect.");

    const hashedPass = await bcrypt.hash(instaPassword, envVars.salt);

    const [result] =
      await sql`UPDATE users SET (instagram_user, instagram_pass) = (${instaUsername}, ${hashedPass}) WHERE user_id = ${userId} RETURNING instagram_user`;

    if (!result) throw Error("User ID was invalid!");

    res.json({ added: true, instaUsername: result.instagram_user });
  } catch (error) {
    res.statusCode = 400;
    res.json({
      message: error instanceof Error ? error.message : "Invalid request.",
      added: false,
    });
  }
};

export default addInstagram;
