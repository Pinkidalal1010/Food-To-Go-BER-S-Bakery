import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import Review from "./models/Review.js";
import User from "./models/User.js";
import { products as mockProducts, categories as mockCategories, reviews as mockReviews } from "./data/mockData.js";

dotenv.config();

export const seedDatabase = async () => {
  try {
    const superAdminExists = await User.findOne({ role: "superadmin" });
    if (!superAdminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@bakery.com",
        password: hashedPassword,
        role: "superadmin"
      });
      console.log("Default Super Admin generated: admin@bakery.com / admin123 🔑");
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("Empty database detected. Seeding initial products, categories, and reviews...");
      
      const productMap = new Map();

      for (const c of mockCategories) {
        const { id, productCount, ...rest } = c;
        await Category.create(rest);
      }
      
      for (const p of mockProducts) {
        const { id, ...rest } = p;
        const newProduct = await Product.create(rest);
        productMap.set(id, newProduct._id);
      }

      for (const r of mockReviews) {
        const { id, productId, userId, ...rest } = r;
        if (productMap.has(productId)) {
          await Review.create({
            ...rest,
            productId: productMap.get(productId),
            userId: new mongoose.Types.ObjectId() // Generate dummy user ID for mock reviews
          });
        }
      }

      console.log("Database seeded successfully! ✅");
    }
  } catch (err) {
    console.error("Error seeding database ==>", err);
  }
};

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bakery";
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ✅");
    
    // Auto-seed on startup
    await seedDatabase();
  } catch (err) {
    console.error(err);
  }
};