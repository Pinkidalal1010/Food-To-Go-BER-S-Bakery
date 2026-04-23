import { Response } from "express";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

const sanitizeDoc = (doc: any) => {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

export const getProductReviews = async (req: any, res: Response) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
    res.json(reviews.map(sanitizeDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const createReview = async (req: any, res: Response) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;
    const userId = req.user!.userId;
    const userName = req.user!.name;

    if (!rating || !title || !comment) {
      res.status(400).json({ error: "Bad Request", message: "rating, title, and comment are required" });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: "Bad Request", message: "rating must be between 1 and 5" });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: "Not Found", message: "Product not found" });
      return;
    }

    const newReview = await Review.create({
      productId,
      userId,
      userName,
      rating,
      title,
      comment,
    });

    // Incremental Rating Optimization
    const oldRating = product.rating || 0;
    const count = product.reviewCount || 0;
    
    const newRating = ((oldRating * count) + rating) / (count + 1);
    
    product.rating = parseFloat(newRating.toFixed(1));
    product.reviewCount = count + 1;
    await product.save();

    res.status(201).json(sanitizeDoc(newReview.toJSON()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};
