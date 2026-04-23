import { useParams, Link } from "wouter";
import { useOrder } from "../hooks/useQueries";
import { LoadingScreen } from "@/components/ui/loading";
import { CheckCircle2, ArrowRight, Package, Truck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id || "");

  if (isLoading) return <LoadingScreen />;
  if (isError || !order) return <div>Order not found</div>;

  // Format date safely
  const deliveryDate = new Date(order.estimatedDelivery || Date.now() + 86400000 * 2).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-[80vh] bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        
        <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-xl shadow-black/5 border border-border relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="text-center mb-10 relative z-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">Thank you for your order!</h1>
            <p className="text-muted-foreground text-lg">
              We've received your order and are beginning to prepare it with love.
            </p>
            <div className="mt-4 font-mono text-sm tracking-wider text-muted-foreground bg-secondary/50 inline-block px-4 py-2 rounded-lg">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center">
            <div className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center">
              <Calendar className="text-primary mb-2" size={24} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Expected Delivery</span>
              <span className="font-medium text-sm">{deliveryDate}</span>
            </div>
            <div className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center">
              <Package className="text-primary mb-2" size={24} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Status</span>
              <span className="font-medium text-sm capitalize">{order.status}</span>
            </div>
            <div className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center">
              <Truck className="text-primary mb-2" size={24} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Shipping To</span>
              <span className="font-medium text-sm line-clamp-1">{order.shippingAddress.city}, {order.shippingAddress.state}</span>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Order Details</h3>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.productId} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted">
                      <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold">
                      ${item.subtotal.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">${order.shippingCost.toFixed(2)}</span>
                </div>
                <Separator className="my-4 border-border/50" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full shadow-lg hover:-translate-y-0.5 transition-transform">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full hover:bg-secondary">
              <Link href="/orders">View All Orders</Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
