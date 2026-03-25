import { Router, type IRouter } from "express";
import { products, carts, orders } from "../data/mockData.js";
import type { Order } from "../data/mockData.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";

const router: IRouter = Router();

router.get("/orders", authMiddleware, (req: AuthRequest, res) => {
  const userOrders = orders.filter(o => o.userId === req.user!.userId);
  res.json(userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
});

router.post("/orders", authMiddleware, (req: AuthRequest, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress || !paymentMethod) {
    res.status(400).json({ error: "Bad Request", message: "shippingAddress and paymentMethod are required" });
    return;
  }

  const { fullName, phone, address, city, state, zipCode } = shippingAddress;
  if (!fullName || !phone || !address || !city || !state || !zipCode) {
    res.status(400).json({ error: "Bad Request", message: "All shipping address fields are required" });
    return;
  }

  const cart = carts.find(c => c.userId === req.user!.userId);
  if (!cart || cart.items.length === 0) {
    res.status(400).json({ error: "Bad Request", message: "Cart is empty" });
    return;
  }

  const orderItems = cart.items.map(item => {
    const product = products.find(p => p.id === item.productId)!;
    return {
      productId: item.productId,
      productName: product.name,
      productImage: product.imageUrl,
      quantity: item.quantity,
      price: product.price,
      subtotal: parseFloat((product.price * item.quantity).toFixed(2))
    };
  });

  const subtotal = parseFloat(orderItems.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2));
  const shippingCost = subtotal >= 100 ? 0 : 8.99;
  const total = parseFloat((subtotal + shippingCost).toFixed(2));

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    userId: req.user!.userId,
    items: orderItems,
    shippingAddress,
    status: "confirmed",
    subtotal,
    shippingCost,
    total,
    estimatedDelivery: estimatedDelivery.toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.push(newOrder);
  cart.items = [];

  res.status(201).json(newOrder);
});

router.get("/orders/:id", authMiddleware, (req: AuthRequest, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user!.userId);
  if (!order) {
    res.status(404).json({ error: "Not Found", message: "Order not found" });
    return;
  }
  res.json(order);
});

router.patch("/orders/:id/cancel", authMiddleware, (req: AuthRequest, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user!.userId);
  if (!order) {
    res.status(404).json({ error: "Not Found", message: "Order not found" });
    return;
  }
  if (order.status === "shipped" || order.status === "delivered") {
    res.status(400).json({ error: "Bad Request", message: "Cannot cancel an order that has already been shipped or delivered." });
    return;
  }
  if (order.status === "cancelled") {
    res.status(400).json({ error: "Bad Request", message: "Order is already cancelled." });
    return;
  }
  order.status = "cancelled";
  order.updatedAt = new Date().toISOString();
  res.json(order);
});

export default router;
