import { Link } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const { data: orders, isLoading, isError } = useListOrders({
    query: { enabled: isAuthenticated }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-display text-3xl font-bold mb-4">Please log in</h2>
        <p className="text-muted-foreground mb-8">You need to be logged in to view your orders.</p>
        <Button asChild className="rounded-full"><Link href="/auth">Sign In</Link></Button>
      </div>
    );
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">My Orders</h1>

        {isError || !orders ? (
          <div className="bg-card p-8 rounded-2xl border border-border text-center">
            <p className="text-muted-foreground">Unable to load orders at this time.</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-secondary/30 p-12 rounded-3xl border border-border border-dashed text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Package size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md">You haven't placed any orders yet. Discover our delicious collection of premium cakes!</p>
            <Button asChild className="rounded-full px-8"><Link href="/products">Shop Now</Link></Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
              });
              
              const statusColors: Record<string, string> = {
                pending: "bg-yellow-100 text-yellow-800",
                confirmed: "bg-blue-100 text-blue-800",
                processing: "bg-purple-100 text-purple-800",
                shipped: "bg-indigo-100 text-indigo-800",
                delivered: "bg-green-100 text-green-800",
                cancelled: "bg-red-100 text-red-800",
              };

              return (
                <div key={order.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-secondary/10">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} /> Placed on {date}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-lg font-bold text-primary">${order.total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{order.items.length} items</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-6">
                      {order.items.slice(0, 4).map(item => (
                        <div key={item.productId} className="w-16 h-16 rounded-xl overflow-hidden bg-muted border border-border/50 relative group">
                          <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 right-0 bg-background/90 backdrop-blur px-1.5 py-0.5 text-[10px] font-bold rounded-tl-lg">
                            x{item.quantity}
                          </div>
                        </div>
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center font-bold text-muted-foreground border border-border/50">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button asChild variant="ghost" className="text-primary hover:bg-primary/10 rounded-full group">
                        <Link href={`/order-confirmation/${order.id}`} className="flex items-center gap-2">
                          View Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
