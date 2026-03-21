import { Router, type IRouter } from "express";
import { products, carts } from "../data/mockData.js";
import type { Cart } from "../data/mockData.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";

const router: IRouter = Router();

function getUserCart(userId: string): Cart {
  let cart = carts.find(c => c.userId === userId);
  if (!cart) {
    cart = { userId, items: [] };
    carts.push(cart);
  }
  return cart;
}

function buildCartResponse(cart: Cart) {
  const items = cart.items.map(item => {
    const product = products.find(p => p.id === item.productId)!;
    return {
      productId: item.productId,
      product,
      quantity: item.quantity,
      subtotal: parseFloat((product.price * item.quantity).toFixed(2))
    };
  });

  const total = parseFloat(items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, total, itemCount };
}

router.get("/cart", authMiddleware, (req: AuthRequest, res) => {
  const cart = getUserCart(req.user!.userId);
  res.json(buildCartResponse(cart));
});

router.post("/cart", authMiddleware, (req: AuthRequest, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    res.status(400).json({ error: "Bad Request", message: "productId and quantity are required" });
    return;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    res.status(404).json({ error: "Not Found", message: "Product not found" });
    return;
  }

  const cart = getUserCart(req.user!.userId);
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  res.json(buildCartResponse(cart));
});

router.put("/cart/:productId", authMiddleware, (req: AuthRequest, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    res.status(400).json({ error: "Bad Request", message: "quantity must be at least 1" });
    return;
  }

  const cart = getUserCart(req.user!.userId);
  const item = cart.items.find(i => i.productId === productId);

  if (!item) {
    res.status(404).json({ error: "Not Found", message: "Item not in cart" });
    return;
  }

  item.quantity = quantity;
  res.json(buildCartResponse(cart));
});

router.delete("/cart/clear", authMiddleware, (req: AuthRequest, res) => {
  const cart = getUserCart(req.user!.userId);
  cart.items = [];
  res.json(buildCartResponse(cart));
});

router.delete("/cart/:productId", authMiddleware, (req: AuthRequest, res) => {
  const { productId } = req.params;
  const cart = getUserCart(req.user!.userId);
  cart.items = cart.items.filter(i => i.productId !== productId);
  res.json(buildCartResponse(cart));
});

export default router;
