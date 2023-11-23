import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../../Forum_Site/server/.env" });

const secret: any = process.env.JWT_SECRET;

export const tokenGen = (user: any) => {
  return jwt.sign(
    { id: user._id, name: user.name, username: user.username },
    secret,
    { expiresIn: "1hr" }
  );
};
