import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCreateOrder } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const checkoutSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().min(5, "Zip code is required"),
  }),
  paymentMethod: z.enum(["credit_card", "debit_card", "cash_on_delivery"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  
  const createOrder = useCreateOrder();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "credit_card",
    }
  });

  // Redirect if empty cart or not auth
  if (!isAuthenticated) {
    setLocation("/auth");
    return null;
  }
  
  if (items.length === 0) {
    setLocation("/products");
    return null;
  }

  const shippingCost = 15.00;
  const finalTotal = total + shippingCost;

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // CreateOrderRequest matches form data perfectly thanks to schema design
      const order = await createOrder.mutateAsync({ data });
      clearCart();
      toast({ title: "Order placed successfully!", description: `Order #${order.id}` });
      setLocation(`/order-confirmation/${order.id}`);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Checkout failed", 
        description: error.message || "An error occurred during checkout." 
      });
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">Checkout</h1>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Shipping Address */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Full Name</Label>
                  <Input {...form.register("shippingAddress.fullName")} className="rounded-xl bg-background" />
                  {form.formState.errors.shippingAddress?.fullName && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.fullName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input {...form.register("shippingAddress.phone")} className="rounded-xl bg-background" />
                  {form.formState.errors.shippingAddress?.phone && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.phone.message}</p>
                  )}
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label>Address</Label>
                  <Input {...form.register("shippingAddress.address")} className="rounded-xl bg-background" />
                  {form.formState.errors.shippingAddress?.address && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  <Input {...form.register("shippingAddress.city")} className="rounded-xl bg-background" />
                  {form.formState.errors.shippingAddress?.city && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.city.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input {...form.register("shippingAddress.state")} className="rounded-xl bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input {...form.register("shippingAddress.zipCode")} className="rounded-xl bg-background" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>
              
              <RadioGroup 
                defaultValue="credit_card" 
                onValueChange={(v) => form.setValue("paymentMethod", v as any)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 border border-border rounded-xl p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <RadioGroupItem value="credit_card" id="r1" />
                  <Label htmlFor="r1" className="flex-1 cursor-pointer font-medium">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-xl p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <RadioGroupItem value="debit_card" id="r2" />
                  <Label htmlFor="r2" className="flex-1 cursor-pointer font-medium">Debit Card</Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-xl p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <RadioGroupItem value="cash_on_delivery" id="r3" />
                  <Label htmlFor="r3" className="flex-1 cursor-pointer font-medium">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-secondary/20 rounded-2xl p-6 border border-border/50 sticky top-24">
              <h3 className="font-display text-2xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-auto pr-2">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.product.imageUrl} className="w-full h-full object-cover" alt={item.product.name} />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-2">{item.product.name}</p>
                      <p className="text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold">
                      ${item.subtotal.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6 bg-border/60" />
              
              <div className="space-y-3 mb-6 text-sm font-medium">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-foreground">${shippingCost.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-6 bg-border/60" />
              
              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>

              <Button 
                type="submit" 
                disabled={createOrder.isPending}
                className="w-full h-14 rounded-xl text-lg font-semibold shadow-lg shadow-primary/25"
              >
                {createOrder.isPending ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By placing your order, you agree to our Terms and Conditions.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
