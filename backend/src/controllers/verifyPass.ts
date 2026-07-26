import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { currPassword } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isCorrect = await bcrypt.compare(currPassword, user.password);

    if (!isCorrect) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    return res.status(200).json({
      message: "Password verified",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
