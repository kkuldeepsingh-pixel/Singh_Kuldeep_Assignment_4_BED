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

export const createLoan = (req: Request, res: Response) => {
  const newLoan = {
    id: Date.now().toString(),
    ...req.body
  }

  loans.push(newLoan);
  res.status(201).json(newLoan);
};

export const updateLoan = (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  Object.assign(loan, req.body);
  res.json(loan);
};

export const deleteLoan = (req: Request, res: Response) => {
  const index = loans.findIndex(l => l.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Loan not found" });
  }

  loans.splice(index, 1);
  res.status(204).send();
};