import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../zodValidation/schemas';
import prisma from '../config/db';
import bcrypt from "bcrypt";
import { generateToken } from '../lib/jwt';
import { JwtPayload } from '../lib/types';

export const register = async (req: Request, res: Response) => {
    try {
    const parsed = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ 
        where: { 
            email: parsed.email 
        } 
    });

    if (existingUser) {
        res.status(400).json({
            success: false, 
            message: "Email already in use" 
        });
        return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    // Create user in DB
    const user = await prisma.user.create({
        data: {
            email: parsed.email,
            firstName: parsed.firstName,
            lastName: parsed.lastName,
            password: hashedPassword
        }
    })

    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    }

    const token = generateToken(payload)

    res.status(201).json({
        success: true,
        data: user,
        token: token
    });

  } catch (err) {
    if (err instanceof Error) {
        res.status(400).json({ 
            success: false,
            error: err.message 
        });
    }
    res.status(500).json({ 
        message: "Internal server error" 
    });
  }
}



export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.parse(req.body);
    
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { 
            email: parsed.email 
        },
    });

    if (!user) {
        res.status(400).json({ 
            success: false,
            error: "Invalid email or password" 
        });
        return
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(parsed.password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ 
            success: false,
            error: "Invalid email or password" 
        });
        return
    }

    const payload :JwtPayload = {
        email: user.email,
        userId: user.id,
        role: user.role
    }
    const token = generateToken(payload);

    res.status(200).json({
        success: true,
        data: user,
        token: token
    });
  } catch (err) {
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        });
        return
    }
}