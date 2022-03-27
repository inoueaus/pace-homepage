import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "../db";
import { envVars } from "../env-variables";

export const loginUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (typeof username !== "string")
      throw TypeError("Invalid username provided.");
    if (typeof password !== "string")
      throw TypeError("Invalid password provided");

    const [user] =
      await sql`SELECT user_id, pass_hash FROM users WHERE username = ${username};`;

    const userId = Number(user.user_id);
    if (isNaN(userId)) throw Error("User not found.");

    bcrypt
      .compare(password, user.pass_hash)
      .then(result => {
        if (result) {
          const token = jwt.sign(
            { user_id: user.id, username }, // issue new token to user if password checks out
            envVars.tokenKey,
            { expiresIn: "2h" }
          );
          //save token to db
          return sql`UPDATE users SET token = ${token} WHERE user_id = ${userId} RETURNING token`;
        } else {
          throw Error("Invalid Password.");
        }
      })
      .then(result =>
        res.json({ authenticated: true, token: result[0].token, userId })
      );
  } catch (error) {
    res.statusCode = 401;
    res.json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const userId = Number(req.body.userId);
  const token = req.body.token;

  try {
    if (isNaN(userId)) throw TypeError("User ID must be a Number");
    if (typeof token !== "string")
      throw TypeError("Must provide a valid Token");

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
