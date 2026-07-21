import type { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

type RequestPart = "body" | "query" | "params";

export const validate =
  (schema: ZodType, part: RequestPart = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.treeifyError(result.error), // v4 helper for nested error shape
      });
    }

    (req as any)[part] = result.data;
    next();
  };
