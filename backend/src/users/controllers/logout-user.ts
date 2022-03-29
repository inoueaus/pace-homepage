import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import sql from "../../db";

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.headers.token;

  try {
    if (typeof token !== "string") throw TypeError("Must provide a Token");

    const decodedToken = jwt.decode(token); // allow logout for invalid tokens as well
    if (!(decodedToken instanceof Object) || isNaN(Number(decodedToken.id)))
      throw TypeError("Invalid Token Provided.");

    const userId = Number(decodedToken.id);

    const [result] = await sql<
      { token: string }[]
    >`SELECT token FROM users WHERE user_id = ${userId}`; // get current token from db
    if (!result) throw Error("Invalid user ID.");
    if (result.token !== token)
      throw Error("Token does not match token stored in Database."); // throw error if not user's token

    await sql`UPDATE users SET token = null WHERE user_id = ${userId}`; // delete token from db

    res.json({ loggedOut: true });
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      loggedOut: false,
    });
  }
};

export default logoutUser;
