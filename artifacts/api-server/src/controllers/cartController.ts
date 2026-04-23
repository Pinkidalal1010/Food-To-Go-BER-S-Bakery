import { Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Helper function to build cart response formatting it properly
const buildCartResponse = async (cart: any) => {
  if (!cart) return { items: [], total: 0, itemCount: 0 };
  
  let total = 0;
  let itemCount = 0;
  const items = cart.items.map((item: any) => {
    const product = item.productId; // since it's populated
    // If product was deleted, gracefully handle:
    if (!product) return null;
    
    const subtotal = parseFloat((product.price * item.quantity).toFixed(2));
    total += subtotal;
    itemCount += item.quantity;

    return {
      productId: product._id,
      product: {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
      },
      quantity: item.quantity,
      subtotal,
    };
  }).filter(Boolean); // remove nulls if products were deleted

  return { items, total: parseFloat(total.toFixed(2)), itemCount };
};

export const getCart = async (req: any, res: Response) => {
  try {
    const userId = req.user!.userId;
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    const response = await buildCartResponse(cart);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user!.userId;

    if (!productId || !quantity || quantity < 1) {
      res.status(400).json({ error: "Bad Request", message: "productId and quantity are required" });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: "Not Found", message: "Product not found" });
      return;
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    
    // Populate before return
    await cart.populate("items.productId");
    const response = await buildCartResponse(cart);
    
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const updateCartItem = async (req: any, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user!.userId;

    if (!quantity || quantity < 1) {
      res.status(400).json({ error: "Bad Request", message: "quantity must be at least 1" });
      return;
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ error: "Not Found", message: "Cart not found" });
      return;
    }

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (!item) {
      res.status(404).json({ error: "Not Found", message: "Item not in cart" });
      return;
    }

    item.quantity = quantity;
    await cart.save();
    
    await cart.populate("items.productId");
    const response = await buildCartResponse(cart);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const clearCart = async (req: any, res: Response) => {
  try {
    const userId = req.user!.userId;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );
    res.json({ items: [], total: 0, itemCount: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};

export const removeCartItem = async (req: any, res: Response) => {
  try {
    const { productId } = req.params;
    const userId = req.user!.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.json({ items: [], total: 0, itemCount: 0 });
      return;
    }

    cart.items = cart.items.filter((i: any) => i.productId.toString() !== productId) as any;
    await cart.save();
    
    await cart.populate("items.productId");
    const response = await buildCartResponse(cart);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error", message: "An unexpected error occurred" });
  }
};
