import { Response } from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const sanitizeDoc = (doc: any) => {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

export const getOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.user!.userId })
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders.map(sanitizeDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const getOrderById = async (req: any, res: Response) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user!.userId }).lean();
    if (!order) {
      res.status(404).json({ error: "Not Found", message: "Order not found" });
      return;
    }
    res.json(sanitizeDoc(order));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const createOrder = async (req: any, res: Response) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user!.userId;

    if (!shippingAddress || !paymentMethod) {
      res.status(400).json({ error: "Bad Request", message: "shippingAddress and paymentMethod are required" });
      return;
    }

    const { fullName, phone, address, city, state, zipCode } = shippingAddress;
    if (!fullName || !phone || !address || !city || !state || !zipCode) {
      res.status(400).json({ error: "Bad Request", message: "All shipping address fields are required" });
      return;
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ error: "Bad Request", message: "Cart is empty" });
      return;
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const product: any = item.productId;
      if (!product) continue;

      const itemSubtotal = parseFloat((product.price * item.quantity).toFixed(2));
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        productImage: product.imageUrl,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemSubtotal,
      });
    }

    subtotal = parseFloat(subtotal.toFixed(2));
    const shippingCost = subtotal >= 100 ? 0 : 8.99;
    const total = parseFloat((subtotal + shippingCost).toFixed(2));

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    const newOrder = await Order.create({
      userId,
      items: orderItems,
      shippingAddress,
      status: "confirmed",
      subtotal,
      shippingCost,
      total,
      estimatedDelivery,
    });

    // Clear cart natively
    cart.items = [] as any;
    await cart.save();

    res.status(201).json(sanitizeDoc(newOrder.toJSON()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const cancelOrder = async (req: any, res: Response) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user!.userId });
    
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
    await order.save();
    
    res.json(sanitizeDoc(order.toJSON()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};
