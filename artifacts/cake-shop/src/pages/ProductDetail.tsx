import { useState } from "react";
import { useParams } from "wouter";
import { useGetProduct, useGetProductReviews } from "@workspace/api-client-react";
import { useCart } from "@/contexts/CartContext";
import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, Truck, Info, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, isError } = useGetProduct(id || "");
  const { data: reviews } = useGetProductReviews(id || "");

  if (isLoading) return <LoadingScreen />;
  if (isError || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground">The cake you're looking for might have been eaten.</p>
        </div>
      </div>
    );
  }

  const images = [product.imageUrl, ...(product.images || [])];

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-muted/30 rounded-3xl overflow-hidden relative border border-border shadow-sm">
            <img 
              src={images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
              key={activeImage} // Force re-render for animation
            />
            {product.isFeatured && (
              <span className="absolute top-6 left-6 bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase shadow-md">
                Signature
              </span>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`${product.name} thumbnail`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">{product.category}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground underline decoration-dotted underline-offset-4 cursor-pointer">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4">
            {product.name}
          </h1>
          
          <div className="text-3xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
            {product.description}
          </p>

          <Separator className="mb-8 bg-border/60" />

          {/* Action Area */}
          <div className="bg-secondary/20 rounded-2xl p-6 border border-border/50 mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="w-full sm:w-auto">
                <label className="text-sm font-semibold text-foreground block mb-2">Quantity</label>
                <div className="flex items-center justify-between sm:justify-start w-full sm:w-32 bg-background border border-border rounded-full p-1.5 h-14 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors text-foreground"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors text-foreground"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleAdd}
                disabled={!product.isAvailable}
                className="w-full sm:flex-1 h-14 rounded-full text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                {product.isAvailable ? 'Add to Cart' : 'Sold Out'}
              </Button>
            </div>

            <ul className="space-y-3 text-sm text-muted-foreground font-medium">
              <li className="flex items-center gap-3">
                <Truck className="text-primary w-5 h-5" /> Local delivery available
              </li>
              <li className="flex items-center gap-3">
                <Info className="text-primary w-5 h-5" /> Requires 48 hours notice
              </li>
            </ul>
          </div>

          {/* Details Accordion style static */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">Ingredients & Allergens</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Ingredients:</span> {product.ingredients?.join(", ") || "Flour, Sugar, Butter, Eggs, Vanilla"}.<br/>
                <span className="font-medium text-foreground">Contains:</span> {product.allergens?.join(", ") || "Dairy, Wheat, Eggs"}. May contain traces of nuts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Size & Servings</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Serving Size:</span> {product.servingSize || "8-10 people"}<br/>
                <span className="font-medium text-foreground">Weight:</span> {product.weight || "2 lbs"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24 pt-16 border-t border-border">
        <h2 className="font-display text-3xl font-bold mb-10 text-center">Customer Reviews</h2>
        
        {reviews?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <h4 className="font-bold text-foreground mb-2">{review.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 italic">"{review.comment}"</p>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                  — {review.userName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-border border-dashed max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-4">Be the first to review this delightful creation.</p>
            <Button variant="outline" className="rounded-full">Write a Review</Button>
          </div>
        )}
      </div>
    </div>
  );
}
