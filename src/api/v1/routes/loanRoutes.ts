import { Router } from "express";
import {
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan
} from "../controllers/loanController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/authorizeRole";

const router = Router();

// Routes accessible by all authenticated roles
router.get("/", authenticate, authorizeRole(["officer", "manager", "admin"]), getLoans);
router.get("/:id", authenticate, authorizeRole(["officer", "manager", "admin"]), getLoanById);

// Routes restricted to manager and admin
router.post("/", authenticate, authorizeRole(["manager", "admin"]), createLoan);
router.put("/:id", authenticate, authorizeRole(["manager", "admin"]), updateLoan);

// Route restricted to admin only
router.delete("/:id", authenticate, authorizeRole(["admin"]), deleteLoan);

export default router;