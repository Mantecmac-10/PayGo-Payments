import type { Request, Response } from "express";
import Account from "../models/Account";
import User from "../models/User";
import mongoose from "mongoose";

export const handleBalance = async (req: Request, res: Response) => {
  try {
    const account = await Account.findOne(
      { userId: req.userId },
      { balance: 1, _id: 0 },
    );

    if (!account) {
      return res.status(404).json({
        message: "Account not found!",
      });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error("Server Error", error);
  }
};

export const handleTransfer = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.userId;
  const { amount, to } = req.body;

  if (amount < 0) {
    return res.status(400).json({
      message: "Invalid amount",
    });
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const receiverUser = await User.findOne({ username: to }, null, {
        session,
      });
      if (!receiverUser) {
        throw new Error("Recipient not found");
      }

      if (receiverUser._id.toString() === userId) {
        throw new Error("Cannot transfer to yourself");
      }

      const senderAccount = await Account.findOne(
        { userId: req.userId },
        null,
        { session },
      );

      const receiverAccount = await Account.findOne(
        { userId: receiverUser._id },
        null,
        { session },
      );
      if (!receiverAccount) throw new Error("Recipient account not found");

      if (!receiverAccount) {
        throw new Error("Recipient not found");
      }

      if (!senderAccount || senderAccount.balance < amount) {
        throw new Error("Insufficient balance");
      }

      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } },
        { session },
      );

      await Account.updateOne(
        { userId: receiverUser._id },
        { $inc: { balance: amount } },
        { session },
      );
    });
    return res.status(200).json({ message: "Transfer successful" });
  } catch (error: any) {
    console.error("Transfer error:", error);
    return res
      .status(400)
      .json({ message: error.message || "Transfer failed" });
  } finally {
    await session.endSession();
  }
};
