import { Request, Response } from "express";
import User from "../models/User.js";

const sanitizeDoc = (doc: any) => {
  if (!doc) return doc;
  const { _id, __v, password, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").lean();
    res.json(users.map(sanitizeDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to fetch users" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const validRoles = ["user", "admin", "superadmin"];
    
    if (!validRoles.includes(role)) {
      res.status(400).json({ error: "Bad Request", message: "Invalid role specified" });
      return;
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).lean();
    if (!user) {
      res.status(404).json({ error: "Not Found", message: "User not found" });
      return;
    }
    res.json(sanitizeDoc(user));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to update user role" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: "Not Found", message: "User not found" });
      return;
    }
    res.json({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to delete user" });
  }
};
