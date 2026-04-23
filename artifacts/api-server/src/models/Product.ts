import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    servingSize: { type: String },
    weight: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model("Product", productSchema);
