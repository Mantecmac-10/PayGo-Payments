import { Router } from "express";
import {
  handleBalance,
  handleTransfer,
} from "../controllers/account.controller";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { transferSchema } from "../validators/account.schema";

const router = Router();

router.get("/balance", verifyUser, handleBalance);
router.post("/transfer", verifyUser, validate(transferSchema), handleTransfer);

export default router;
