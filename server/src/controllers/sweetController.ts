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


export const searchSweets = async (req: Request, res: Response) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const sweets = await prisma.sweet.findMany({
            where: {
                AND: [
                name
                    ?   {
                            name: {
                                contains: String(name),
                                mode: "insensitive",
                            },
                        }
                    :   {},
                category
                    ?   {
                            category: {
                                contains: String(category),
                                mode: "insensitive",
                            },
                        }
                    : {},
                minPrice
                    ?   {
                            price: {
                                gte: Number(minPrice),
                            },
                        }
                    : {},
                maxPrice
                    ?   {
                            price: {
                                lte: Number(maxPrice),
                            },
                        }
                    : {},
                ],
            },
        });

        res.status(200).json({ 
            success: true,
            data: sweets 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,          
            message: "Error searching sweets" 
        });
    }
};


export const deleteSweet = async (req: Request, res: Response) => {
  try {
        const role = req.user?.role
        if (role !== "ADMIN") {
            res.status(401).json({
                success: false,
                error: "unauthorized"
            })
            return
        }

        const sweetId = req.params.id;

        // Check if sweet exists
        const existingSweet = await prisma.sweet.findUnique({
            where: { 
                id: sweetId 
            },
        });

        if (!existingSweet) {
            res.status(404).json({
                success: false, 
                error: "Sweet not found" 
            });
            return
        }

        await prisma.sweet.delete({
            where: { 
                id: sweetId 
            },
        });

        res.status(200).json({
            success: true, 
            message: "Sweet deleted successfully" 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        });
    }
};



export const purchaseSweet = async (req: Request, res: Response) => {
  try {
        const sweetId = req.params.id;
        const qnty = req.body.quantity;

        // Find sweet
        const sweet = await prisma.sweet.findUnique({
            where: { 
                id: sweetId 
            },
        });

        if (!sweet) {
            res.status(404).json({ 
                success: false,
                error: "Sweet not found" 
            });
            return
        }

        if (sweet.quantity <= 0 || sweet.quantity < qnty) {
            res.status(400).json({ 
                success: false,
                error: "Sweet is out of stock" 
            });
            return
        }

        // Decrease quantity by 1
        const updatedSweet = await prisma.sweet.update({
            where: { 
                id: sweetId 
            },
            data: {
                quantity: { 
                    decrement: qnty
                },
            },
        });

        res.status(200).json({
            success: true,    
            amount: Number(sweet.price) * qnty,
            message: "Sweet purchased successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        });
    }
};


export const restockSweet = async (req: Request, res: Response) => {
    try {
        const userRole = req.user?.role
        if (userRole !== "ADMIN") {
            res.status(401).json({
                success: false,
                error: "unauthorized"
            })
            return
        }

        const sweetId = req.params.id;
        const qnty = req.body.quantity; 

        if (!qnty || qnty <= 0) {
            res.status(400).json({ 
                success: false,
                error: "Restock amount must be greater than 0" 
            });
            return
        }

        // Check if sweet exists
        const sweet = await prisma.sweet.findUnique({
            where: { 
                id: sweetId 
            },
        });

        if (!sweet) {
            res.status(404).json({ 
                success: false,
                error: "Sweet not found" 
            });
            return
        }

        // Increase quantity
        const updatedSweet = await prisma.sweet.update({
            where: { 
                id: sweetId 
            },
            data: {
                quantity: { 
                    increment: qnty 
                },
            },
        });

        res.status(200).json({
            success: true,
            sweet: updatedSweet,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
};