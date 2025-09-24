import { Request, Response } from "express";
import { createSweetSchema, updateSweetSchema } from "../zodValidation/schemas";
import prisma from "../config/db";

export const addSweet = async (req: Request, res: Response) => {
  try {
    const parsed = createSweetSchema.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ 
            success: false,
            error: parsed.error 
        });
        return
    }

    const sweet = await prisma.sweet.create({
        data: {
            name: parsed.data.name,
            category: parsed.data.category,
            price: parsed.data.price,
            quantity: parsed.data.quantity,
            userId: req.user?.userId!
        },
    });

    res.status(201).json({ 
        success: true,
        data: sweet 
    });
  } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            error: "Internal server error", err 
        });
        return   
    }
};


export const listSweets = async (req: Request, res: Response) => {
    try {
        const sweets = await prisma.sweet.findMany({
            orderBy: {
                name: "asc",
            },
        });

        res.status(200).json({ 
            success: true,
            data: sweets 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        });
    }
};


export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweetId = req.params.id;

    // Validate request body
    const parsed = updateSweetSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ 
            success: false,
            error: parsed.error 
        });
        return
    }

    // Check if sweet exists
    const existingSweet = await prisma.sweet.findUnique({
        where: { 
            id: sweetId,
            userId: req.user?.userId 
        },
    });
    if (!existingSweet) {
        res.status(404).json({ 
            success: false,
            error: "Sweet not found" 
        });
        return
    }

    // Update sweet
    const updatedSweet = await prisma.sweet.update({
        where: { 
            id: sweetId 
        },
        data: parsed.data,
    });

    res.status(200).json({ 
        success: true,
        data: updatedSweet 
    });
  } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        });
    }
};