import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 6 characters"),
  firstName: z.string().min(2, "Name must be at least 2 characters").max(20, "last name must be at most 20 characters"),
  lastName: z.string().min(2, "Name must be at least 2 characters").max(20, "last name must be at most 20 characters")
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

// add a sweet
export const createSweetSchema = z.object({
  name: z.string().min(2, "Sweet name must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().int().min(0, "Quantity must be zero or more"),
});

// update sweet
export const updateSweetSchema = z.object({
  name: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().int().min(0).optional(),
});