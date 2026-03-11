import { Router } from "express";
import { assignRole, setUserRole, signIn } from "../controllers/authController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";
import { getLoans } from "../controllers/loanController";

const router = Router();

router.post("/signin", signIn);
router.post("/set-role", setUserRole);
router.post("/assign-role", authorizeRole(["admin"]), assignRole);
router.get("/loans", authenticate, getLoans);

export default router;