import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const InsertData = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    if (InsertData) {
      const token = jwt.sign({ data: InsertData }, "oursecretekey123", {
        expiresIn: "1d",
      });
      res.json(
        { message: "register successfully",token : token }
    );
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      const comparedPassword = bcrypt.compareSync(password, existUser.password);
      if (comparedPassword) {
        const token = jwt.sign({ data: existUser }, "oursecretekey123", {
          expiresIn: "1d",
        });
        res.json({ message: "login suceessfully", token: token });
      } else {
        res.json({ message: "Invalid email or password" });
      }
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const deleteUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const deletedUser = await UserModel.findOneAndDelete({ email });
    if (deletedUser) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const usersCount = async (req: Request, res: Response) => {
  try {
    const count = await UserModel.countDocuments();
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
