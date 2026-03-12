import { Router } from "express";
import { assignRole, setUserRole, signIn } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";
import { getLoans } from "../controllers/loanController";

const router = Router();

// Public route
router.post("/signin", signIn);

// Admin-only routes
router.post("/set-role", authenticate, authorizeRole(["admin"]), setUserRole);
router.post("/assign-role", authenticate, authorizeRole(["admin"]), assignRole);

// Authenticated users can get loans
router.get("/loans", authenticate, getLoans);

export default router;