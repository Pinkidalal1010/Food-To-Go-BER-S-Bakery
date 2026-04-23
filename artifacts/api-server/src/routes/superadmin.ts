import express from "express";
import { authMiddleware, isSuperAdmin } from "../middleware/auth.js";
import { updateUserRole, deleteUser, getUsers } from "../controllers/superAdminController.js";

const router = express.Router();

router.use(authMiddleware, isSuperAdmin);

router.get("/users", getUsers);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;
