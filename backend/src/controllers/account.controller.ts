import type { Request, Response } from "express";
import Account from "../models/Account";

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
