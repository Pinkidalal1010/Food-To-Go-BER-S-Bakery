import { Link, useLocation } from "wouter";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { items, updateQuantity, removeFromCart, total, isCartOpen, setIsCartOpen } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setLocation("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0 shadow-2xl">
        <SheetHeader className="p-6 border-b border-border bg-background/50 backdrop-blur-sm relative z-10">
          <SheetTitle className="font-display text-2xl flex items-center gap-3">
            <ShoppingBag className="text-primary" />
            Your Cart
            <span className="text-sm font-sans font-normal text-muted-foreground ml-auto">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden relative">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={48} className="text-primary/50" />
              </div>
              <h3 className="font-display text-2xl text-foreground">Your cart is empty</h3>
              <p className="text-muted-foreground">Looks like you haven't added any sweet treats yet.</p>
              <Button 
                onClick={() => {
                  setIsCartOpen(false);
                  setLocation("/products");
                }}
                className="mt-4 rounded-full"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start gap-2">
                        <Link 
                          href={`/products/${item.productId}`} 
                          onClick={() => setIsCartOpen(false)}
                          className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-center gap-3 bg-secondary/50 rounded-full p-1 border border-border/50">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-background shadow-sm hover:text-primary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-background shadow-sm hover:text-primary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-bold text-primary">
                          ${item.subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-6 bg-background/95 backdrop-blur shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)] relative z-10">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              className="w-full rounded-xl py-6 text-lg font-semibold group relative overflow-hidden" 
              onClick={handleCheckout}
            >
              <span className="relative z-10 flex items-center gap-2">
                Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
