import { Router, type IRouter } from "express";
import { users } from "../data/mockData.js";
import { generateToken } from "../lib/jwt.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { createHash } from "crypto";

const router: IRouter = Router();

function hashPassword(password: string): string {
  return createHash("sha256").update(password + "sweet-cakes-salt").digest("hex");
}

router.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Bad Request", message: "Name, email, and password are required" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: "Bad Request", message: "Password must be at least 6 characters" });
    return;
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    res.status(409).json({ error: "Conflict", message: "Email already registered" });
    return;
  }

  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    password: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  const token = generateToken({ userId: newUser.id, email: newUser.email, name: newUser.name });

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    }
  });
});

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Bad Request", message: "Email and password are required" });
    return;
  }

  const user = users.find(u => u.email === email);
  if (!user || user.password !== hashPassword(password)) {
    res.status(401).json({ error: "Unauthorized", message: "Invalid email or password" });
    return;
  }

  const token = generateToken({ userId: user.id, email: user.email, name: user.name });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  });
});

router.get("/auth/me", authMiddleware, (req: AuthRequest, res) => {
  const user = users.find(u => u.id === req.user!.userId);
  if (!user) {
    res.status(404).json({ error: "Not Found", message: "User not found" });
    return;
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
});

export default router;
