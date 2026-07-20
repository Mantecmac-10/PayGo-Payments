import { Router } from "express";
import { handleBalance } from "../controllers/account.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/balance", verifyUser, handleBalance);

export default router;
