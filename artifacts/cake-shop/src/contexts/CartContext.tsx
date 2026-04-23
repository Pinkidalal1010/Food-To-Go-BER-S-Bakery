import { createContext, useContext, useState, ReactNode } from "react";
import { useCart as useCartQuery, useCartMutations } from "../hooks/useQueries";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

interface CartContextType {
  items: any[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const { data: cartData } = useCartQuery();
  const { addToCart: addMutation, updateQuantity: updateMutation, removeFromCart: removeMutation, clearCart: clearMutation } = useCartMutations();

  const items = cartData?.items || [];

  const addToCart = (product: any, quantity: number) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Sign in required",
        description: "Please sign in to add items to your cart."
      });
      return;
    }
    addMutation.mutate({ productId: product.id, quantity }, {
      onSuccess: () => {
        setIsCartOpen(true);
        toast({
          title: "Added to cart",
          description: `${quantity}x ${product.name} added to your cart.`
        });
      }
    });
  };

  const removeFromCart = (productId: string) => {
    if (!isAuthenticated) return;
    removeMutation.mutate(productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!isAuthenticated) return;
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    updateMutation.mutate({ productId, quantity });
  };

  const clearCart = () => {
    if (!isAuthenticated) return;
    clearMutation.mutate();
  };

  const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);
  const itemCount = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
