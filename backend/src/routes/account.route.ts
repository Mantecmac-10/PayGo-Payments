import { Router } from "express";
import {
  handleBalance,
  handleTransfer,
} from "../controllers/account.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/balance", verifyUser, handleBalance);
router.post("/transfer", verifyUser, handleTransfer);

export default router;
