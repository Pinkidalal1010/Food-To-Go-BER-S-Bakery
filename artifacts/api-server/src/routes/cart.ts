import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getCart, addToCart, updateCartItem, clearCart, removeCartItem } from "../controllers/cartController.js";

const router = Router();

router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.put("/cart/:productId", authMiddleware, updateCartItem);
router.delete("/cart/clear", authMiddleware, clearCart);
router.delete("/cart/:productId", authMiddleware, removeCartItem);

export default router;
