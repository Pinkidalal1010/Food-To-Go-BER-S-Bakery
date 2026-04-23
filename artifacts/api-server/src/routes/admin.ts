import express from "express";
import { authMiddleware, isAdmin } from "../middleware/auth.js";
import { createProduct, updateProduct, deleteProduct, updateOrderStatus } from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware, isAdmin);

router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.patch("/orders/:id/status", updateOrderStatus);

export default router;