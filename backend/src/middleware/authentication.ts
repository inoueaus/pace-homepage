import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envVars } from "../env-variables";

const checkIfTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = Number(req.body.userId);
  const token = req.body.token;

  if (!token) res.status(403).json({ auth: false });

  try {
    if (isNaN(userId)) throw TypeError("User ID must be a Number");
    if (typeof token !== "string")
      throw TypeError("Must provide a valid Token");

    jwt.verify(token, envVars.tokenKey, {}, (err, _) => {
      if (err) {
        throw err;
      } else {
        next();
      }
    });
  } catch (error) {
    res.statusCode = 401;
    res.json({ auth: false });
  }
};

export default checkIfTokenIsValid;
