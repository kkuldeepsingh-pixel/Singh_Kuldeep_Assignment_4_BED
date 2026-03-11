import { Router } from "express";
import { setUserRole, signIn } from "../controllers/authController";

const router = Router();

router.post("/signin", signIn);
router.post("/set-role", setUserRole);

export default router;