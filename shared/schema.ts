import { z } from "zod";

// Shared Zod schemas for MongoDB documents
// These will be used for API validation and frontend forms

// User Schema
export const insertUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).default("user"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Category Schema
export const insertCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  imageUrl: z.string().optional(),
});

// Product Schema
export const insertProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  lensType: z.enum(["Contact", "Spectacle"]).optional(),
  material: z.enum(["Soft", "Hard"]).optional(),
  usage: z.enum(["Daily", "Monthly", "Yearly"]).optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  images: z.array(z.string()).default([]),
  slug: z.string().min(1, "Slug is required"),
  isFeatured: z.boolean().default(false),
});

// Order Item Schema
export const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
  price: z.number(), // Price at time of purchase
});

// Order Schema
export const insertOrderSchema = z.object({
  userId: z.string().optional(), // Nullable for guest
  guestEmail: z.string().email().optional(),
  guestName: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
  totalPrice: z.number().min(0),
  status: z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]).default("Pending"),
  deliveryAddress: z.string().min(1, "Address is required"),
  trackingNumber: z.string().optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;

// Extended types with IDs (simulating DB response)
export type User = InsertUser & { _id: string; createdAt: string };
export type Category = InsertCategory & { _id: string };
export type Product = InsertProduct & { _id: string };
export type Order = InsertOrder & { _id: string; createdAt: string };
