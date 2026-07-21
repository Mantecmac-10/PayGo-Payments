import { z } from "zod";

export const updateSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters"),
});

export const listUserSchema = z.object({
  filter: z
    .string()
    .trim()
    .max(100, "Filter must be at most 100 characters")
    .optional()
    .default(""),
});
