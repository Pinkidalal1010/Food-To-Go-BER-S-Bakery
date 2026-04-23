import { Request, Response } from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const sanitizeDoc = (doc: any) => {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, minRating, search, sortBy, limit = "50", page = "0" } = req.query as Record<string, string>;

    const filter: any = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { name: regex },
        { description: regex },
        { tags: regex },
      ];
    }

    let sortOption: any = {};
    if (sortBy === "price_asc") sortOption.price = 1;
    else if (sortBy === "price_desc") sortOption.price = -1;
    else if (sortBy === "rating") sortOption.rating = -1;
    else if (sortBy === "newest") sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const limitNum = parseInt(limit, 10);
    const skipNum = parseInt(page, 10) * limitNum;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skipNum)
      .limit(limitNum)
      .lean();

    res.json(products.map(sanitizeDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred while fetching products" });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const featured = await Product.find({ isFeatured: true, isAvailable: true })
      .limit(6)
      .lean();
    res.json(featured.map(sanitizeDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      res.status(404).json({ error: "Not Found", message: "Product not found" });
      return;
    }
    res.json(sanitizeDoc(product));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().lean();
    res.json(categories.map(sanitizeDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};
