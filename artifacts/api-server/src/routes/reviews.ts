import { Router, type IRouter } from "express";
import { reviews, products } from "../data/mockData.js";
import type { Review } from "../data/mockData.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";

const router: IRouter = Router();

router.get("/products/:productId/reviews", (req, res) => {
  const { productId } = req.params;
  const productReviews = reviews.filter(r => r.productId === productId);
  res.json(productReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
});

router.post("/products/:productId/reviews", authMiddleware, (req: AuthRequest, res) => {
  const { productId } = req.params;
  const { rating, title, comment } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) {
    res.status(404).json({ error: "Not Found", message: "Product not found" });
    return;
  }

  if (!rating || !title || !comment) {
    res.status(400).json({ error: "Bad Request", message: "rating, title, and comment are required" });
    return;
  }

  if (rating < 1 || rating > 5) {
    res.status(400).json({ error: "Bad Request", message: "rating must be between 1 and 5" });
    return;
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    productId,
    userId: req.user!.userId,
    userName: req.user!.name,
    rating,
    title,
    comment,
    createdAt: new Date().toISOString()
  };

  reviews.push(newReview);

  const productReviews = reviews.filter(r => r.productId === productId);
  const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
  product.rating = parseFloat(avgRating.toFixed(1));
  product.reviewCount = productReviews.length;

  res.status(201).json(newReview);
});

export default router;
