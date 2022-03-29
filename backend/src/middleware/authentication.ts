import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envVars } from "../env-variables";

const requireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.token ?? req.headers.token ?? req.cookies.token;

  if (!token) {
    return res.status(403).json({ auth: false });
  }
  try {
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
