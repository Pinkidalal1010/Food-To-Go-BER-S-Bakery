import { Link } from "wouter";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@workspace/api-client-react/src/generated/api.schemas";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group card-hover bg-card rounded-2xl overflow-hidden border border-border/50 relative flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isFeatured && (
          <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            Featured
          </span>
        )}
        {!product.isAvailable && (
          <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            Sold Out
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-muted/30">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="bg-white/90 backdrop-blur text-foreground font-semibold px-6 py-2.5 rounded-full shadow-lg">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-primary uppercase tracking-wide">
            {product.category}
          </p>
          <div className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-xs font-bold">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link href={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-display text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            disabled={!product.isAvailable}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
