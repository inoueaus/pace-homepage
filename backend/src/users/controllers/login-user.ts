import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "../../db";
import { envVars } from "../../env-variables";

const loginUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (typeof username !== "string")
      throw TypeError("Invalid username provided.");
    if (typeof password !== "string")
      throw TypeError("Invalid password provided");

    const [user] =
      await sql`SELECT user_id AS id, pass_hash FROM users WHERE username = ${username};`;

    const userId = Number(user.id);
    if (isNaN(userId)) throw Error("User not found.");

    const compareResult = await bcrypt.compare(password, user.pass_hash);
    if (compareResult) {
      const token = jwt.sign(
        { userId: user.id, username }, // issue new token to user if password checks out
        envVars.tokenKey,
        { expiresIn: "2h" }
      );

      res.cookie("token", token); // must set expiration date at some point
      res.json({ authenticated: true, userId });
    } else {
      throw Error("Invalid Password.");
    }
  } catch (error) {
    res.statusCode = 401;
    res.json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default loginUser;
