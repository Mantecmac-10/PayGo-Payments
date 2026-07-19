import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import { listUser, updateUser } from "../controllers/user.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", handleRegister);
router.post("/signin", handleLogin);
router.patch("/", verifyUser, updateUser);
router.get("/bulk", listUser);

export default router;
