import { Router } from "express";
import { assignRole, setUserRole, signIn } from "../controllers/authController";
import { authorizeRole } from "../middleware/authMiddleware";

const router = Router();

router.post("/signin", signIn);
router.post("/set-role", setUserRole);
router.post("/assign-role", authorizeRole(["admin"]), assignRole);
export default router;