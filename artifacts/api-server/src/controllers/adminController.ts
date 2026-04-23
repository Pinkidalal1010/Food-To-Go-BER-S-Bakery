import { Request, Response } from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const sanitizeDoc = (doc: any) => {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(sanitizeDoc(product.toJSON()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ error: "Not Found", message: "Product not found" });
      return;
    }
    res.json(sanitizeDoc(product.toJSON()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Not Found", message: "Product not found" });
      return;
    }
    res.json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to delete product" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      res.status(404).json({ error: "Not Found", message: "Order not found" });
      return;
    }
    res.json(sanitizeDoc(order.toJSON()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "Failed to update order status" });
  }
};
