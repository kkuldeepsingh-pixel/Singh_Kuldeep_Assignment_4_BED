import { Request, Response } from "express";
import admin from "firebase-admin";

/// TEST SIGN-IN (Mock)
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
    message: "Invalid credentials"
  });
};

// TEST SET ROLE (Mock)
export const setUserRole = async (req: Request, res: Response) => {
  const { uid, role } = req.body;

  try {
    await admin.auth().setCustomUserClaims(uid, { role });

    return res.status(200).json({
      message: `Role ${role} assigned to user ${uid}`
    });

  } catch (error) {
    return res.status(400).json({
      message: "Failed to assign role"
    });
  }
};

// REAL ASSIGN ROLE (Protected)
export const assignRole = async (req: Request, res: Response) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({
      message: "UID and role are required"
    });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role });

    return res.status(200).json({
      message: `Role '${role}' assigned to user ${uid}`
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to assign role"
    });
  }
};