import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const { password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        firstName,
        lastName,
      },
      {
        returnDocument: "after",
      },
    );

    if (!updatedUser) {
      return res.status(400).send("User not found!");
    }

    const newDetail = await User.findById(userId).select("-password");

    return res.status(200).json({ message: "User Updated!", newDetail });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const listUser = async (req: Request, res: Response) => {
  try {
    const filter = (req.query.filter as string) || "";

    const users = await User.find({
      username: { $regex: filter, $options: "i" },
    }).select("username");

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
