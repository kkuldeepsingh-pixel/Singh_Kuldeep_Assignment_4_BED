import { Request, Response } from "express";
import admin from "firebase-admin";

// Sign in a user (mocked for demo tokens)
export const signIn = (req: Request, res: Response) => {
  const { email } = req.body;

  if (email === "officer@pixell-river.com") {
    return res.status(200).json({ idToken: "officer-token-abc123" });
  }

  if (email === "manager@pixell-river.com") {
    return res.status(200).json({ idToken: "manager-token-def456" });
  }

  if (email === "admin@pixell-river.com") {
    return res.status(200).json({ idToken: "admin-token-ghi789" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
};

// Set custom role for a user (Admin only)
export const setUserRole = async (req: Request, res: Response) => {
  const { uid, role } = req.body;
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    res.json({ message: `Role ${role} assigned to user ${uid}` });
  } catch (err) {
    res.status(400).json({ message: "Failed to assign role" });
  }
};