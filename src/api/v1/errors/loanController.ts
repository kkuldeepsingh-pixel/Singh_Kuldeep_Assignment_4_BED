import { Request, Response } from "express";
import { loans } from "../utils/loanStore";

export const getLoans = (req: Request, res: Response) => {
  res.json(loans);
};

export const getLoanById = (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  res.json(loan);
};