import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).send("Email already exist!");
    }

    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).send("User already exist!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const result = await User.findOne({ username }).select("-password");

    return res.status(201).send({ message: "User Created!", result });
  } catch (error) {
    console.error("Server Error", error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(400).send("Wrong Credentials!");
    }

    const checkPass = await bcrypt.compare(password, userExist.password);
    if (!checkPass) {
      return res.status(400).send("Wrong Credentials!");
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        username,
      },
      config.json_key,
    );

    return res.status(200).send({ message: "User Logged In!", token });
  } catch (error) {
    console.error("Server Error", error);
  }
};

