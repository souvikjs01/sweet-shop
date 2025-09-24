import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { JwtPayload } from "../lib/types";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ 
            message: "Authorization token missing" 
        });
    return
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ 
            success: false,
            error: "Invalid or expired token" 
        });
    }
};
