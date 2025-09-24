import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { JwtPayload } from "./types";

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (jwtPayload: JwtPayload) => {
    return jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "7d"} )
}

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
