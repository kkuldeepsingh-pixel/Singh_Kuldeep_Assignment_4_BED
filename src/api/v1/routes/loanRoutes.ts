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

router.get("/", getLoans);
router.get("/:id", getLoanById);
router.post("/", createLoan);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

// All roles can view loans
router.get("/loans", authenticate, authorizeRole(["officer", "manager", "admin"]), getLoans);
router.get("/loans/:id", authenticate, authorizeRole(["officer", "manager", "admin"]), getLoanById);

// Only manager and admin can create/update
router.post("/loans", authenticate, authorizeRole(["manager", "admin"]), createLoan);
router.put("/loans/:id", authenticate, authorizeRole(["manager", "admin"]), updateLoan);

// Only admin can delete
router.delete("/loans/:id", authenticate, authorizeRole(["admin"]), deleteLoan);

export default router;