import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envVars } from "../env-variables";

const requireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers);
  const userId = Number(req.body.userId ?? req.params.id ?? req.headers.userid); // use headers for GET
  const token = req.body.token ?? req.headers.token;

  if (!token) {
    return res.status(403).json({ auth: false });
  }
  try {
    if (isNaN(userId)) throw TypeError("User ID must be a Number");
    if (typeof token !== "string")
      throw TypeError("Must provide a valid Token");

    const decoded = jwt.verify(token, envVars.tokenKey);
    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      auth: false,
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default requireToken;
