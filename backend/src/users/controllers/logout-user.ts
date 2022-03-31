import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  try {
    if (typeof token !== "string") throw TypeError("Must provide a Token");

    const decodedToken = jwt.decode(token); // allow logout for invalid tokens as well
    if (!(decodedToken instanceof Object) || isNaN(Number(decodedToken.userId)))
      throw TypeError("Invalid Token Provided.");

    const userId = Number(decodedToken.userId);

    if (isNaN(userId)) throw TypeError("User ID not a number in Token");

    res.clearCookie("token");
    res.status(200).json({ loggedOut: true });
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Invalid request.",
      loggedOut: false,
    });
  }
};

export default logoutUser;
