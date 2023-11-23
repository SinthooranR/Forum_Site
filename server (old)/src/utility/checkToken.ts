import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../../../Forum_Site/server/.env" });

const secret: any = process.env.JWT_SECRET;

export const jwtAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(403).json("Authentication Failed");
    }

    const user = jwt.verify(header, secret);

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json("Authentication Failed");
  }
};
