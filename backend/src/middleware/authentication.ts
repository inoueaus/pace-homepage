import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envVars } from "../env-variables";

const requireToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.body.userId ?? req.params.id);
  const token = req.body.token;

  if (!token) res.status(403).json({ auth: false });
  try {
    if (isNaN(userId)) throw TypeError("User ID must be a Number");
    if (typeof token !== "string")
      throw TypeError("Must provide a valid Token");

    const decoded = jwt.verify(token, envVars.tokenKey);
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).json({
      auth: false,
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
};

export default requireToken;
