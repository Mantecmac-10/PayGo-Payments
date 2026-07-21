import { z } from "zod";

export const transferSchema = z.object({
  amount: z
    .number("Amount must be a number")
    .positive("Amount must be greater than 0"),

  to: z
    .string()
    .min(2, "Recipient username must be at least 2 characters")
    .max(50, "Recipient username must be at most 50 characters"),
});
