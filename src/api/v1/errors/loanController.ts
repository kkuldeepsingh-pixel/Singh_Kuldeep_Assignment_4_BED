import { Request, Response } from "express";
import { loans } from "../utils/loanStore";

export const getLoans = (req: Request, res: Response) => {
  res.json(loans);
};