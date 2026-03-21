import { Router, type IRouter } from "express";
import { products, categories } from "../data/mockData.js";

const router: IRouter = Router();

router.get("/products", (req, res) => {
  let result = [...products];

  const { category, minPrice, maxPrice, minRating, search, sortBy } = req.query as Record<string, string>;

  if (category) {
    result = result.filter(p => p.category === category);
  }
  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }
  if (minRating) {
    result = result.filter(p => p.rating >= parseFloat(minRating));
  }
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s) ||
      p.tags.some(t => t.toLowerCase().includes(s))
    );
  }

  if (sortBy === "price_asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "newest") {
    result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  res.json(result);
});

router.get("/products/featured", (_req, res) => {
  const featured = products.filter(p => p.isFeatured && p.isAvailable).slice(0, 6);
  res.json(featured);
});

router.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Not Found", message: "Product not found" });
    return;
  }
  res.json(product);
});

router.get("/categories", (_req, res) => {
  res.json(categories);
});

export default router;
