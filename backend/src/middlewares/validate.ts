import type { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

type RequestPart = "body" | "query" | "params";

// Augment Express's Request so `req.validated` is typed wherever this runs
declare global {
  namespace Express {
    interface Request {
      validated?: {
        body?: unknown;
        query?: unknown;
        params?: unknown;
      };
    }
  }
}

export const validate =
  <T extends ZodType>(schema: T, part: RequestPart = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.treeifyError(result.error),
      });
    }

    // Don't overwrite req.query/req.params directly — in Express 5 these
    // are getter-only and assignment throws at runtime. Store parsed,
    // validated data separately instead.
    req.validated = {
      ...req.validated,
      [part]: result.data,
    };

    next();
  };
