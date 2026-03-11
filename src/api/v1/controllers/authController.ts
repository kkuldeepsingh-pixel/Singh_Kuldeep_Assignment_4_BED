import { Request, Response } from "express";

export const signIn = (req: Request, res: Response) => {
  const { email } = req.body;

  if (email === "officer@pixell-river.com") {
    return res.status(200).json({
      idToken: "officer-token-abc123"
    });
  }

  if (email === "manager@pixell-river.com") {
    return res.status(200).json({
      idToken: "manager-token-def456"
    });
  }

  if (email === "admin@pixell-river.com") {
    return res.status(200).json({
      idToken: "admin-token-ghi789"
    });
  }

  return res.status(401).json({
    error: "Invalid credentials"
  });
};