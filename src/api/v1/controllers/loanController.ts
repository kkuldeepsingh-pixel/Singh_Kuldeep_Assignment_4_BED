import { Request, Response } from "express";
import { loans } from "../utils/loanStore";

export const getLoans = (req: Request, res: Response) => {
  res.status(200).json(loans);
};

export const getLoanById = (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  res.status(200).json(loan);
};

export const createLoan = (req: Request, res: Response) => {
  const newLoan = {
    id: Date.now().toString(),
    ...req.body
  };

  loans.push(newLoan);

  // changed from 201 to 200
  res.status(200).json(newLoan);
};

export const updateLoan = (req: Request, res: Response) => {
  const loan = loans.find(l => l.id === req.params.id);

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  Object.assign(loan, req.body);

  res.status(200).json(loan);
};

export const deleteLoan = (req: Request, res: Response) => {
  const index = loans.findIndex(l => l.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Loan not found" });
  }

  loans.splice(index, 1);

  // changed from 204 to 200 with message
  res.status(200).json({ message: "Loan deleted successfully" });
};