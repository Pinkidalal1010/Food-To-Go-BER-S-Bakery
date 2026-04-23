import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getProductReviews, createReview } from "../controllers/reviewController.js";

const router = Router();

router.get("/products/:productId/reviews", getProductReviews);
router.post("/products/:productId/reviews", authMiddleware, createReview);

export default router;
