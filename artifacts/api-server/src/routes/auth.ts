import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getMe);

export default router;
