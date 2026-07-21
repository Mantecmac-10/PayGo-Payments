import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(2, "Name must have atleast 2 Characters")
    .max(50, "Name must be under 50 Characters"),

  email: z.email("Please Enter a Valid Email"),

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

export const signinSchema = signupSchema.pick({username:true , password:true})
