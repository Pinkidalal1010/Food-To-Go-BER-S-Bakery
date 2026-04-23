import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getOrders, getOrderById, createOrder, cancelOrder } from "../controllers/orderController.js";

const router = Router();

router.get("/orders", authMiddleware, getOrders);
router.post("/orders", authMiddleware, createOrder);
router.get("/orders/:id", authMiddleware, getOrderById);
router.patch("/orders/:id/cancel", authMiddleware, cancelOrder);

export default router;
