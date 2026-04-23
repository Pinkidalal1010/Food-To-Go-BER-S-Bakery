import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../lib/jwt.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Bad Request", message: "Name, email, and password are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Bad Request", message: "Password must be at least 6 characters" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: "Conflict", message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // Strictly enforce user creation
    });

    const token = generateToken({ userId: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Bad Request", message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });
      return;
    }

    const token = generateToken({ userId: user.id, email: user.email, name: user.name, role: user.role });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user!.userId).select("-password").lean();
    if (!user) {
      res.status(404).json({ error: "Not Found", message: "User not found" });
      return;
    }
    
    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};
