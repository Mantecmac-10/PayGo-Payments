import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import { listUser, updateUser } from "../controllers/user.controller";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { signinSchema, signupSchema } from "../validators/auth.schema";
import { listUserSchema, updateSchema } from "../validators/user.schema";

const router = Router();

router.post("/signup", validate(signupSchema), handleRegister);
router.post("/signin", validate(signinSchema), handleLogin);
router.patch("/", verifyUser, validate(updateSchema), updateUser);
router.get("/bulk", validate(listUserSchema, "query"), listUser);

export default router;
