import { Link } from "wouter";
import { useOrders } from "../hooks/useQueries";
import api from "../lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight, Calendar, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const { data: orders, isLoading, isError } = useOrders();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleCancel = async (orderId: string) => {
    setCancellingId(orderId);
    try {
      await api.patch(`/orders/${orderId}/cancel`);
      toast({ title: "Order cancelled", description: "Your order has been cancelled successfully." });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Cannot cancel", description: err.message });
    } finally {
      setCancellingId(null);
      setConfirmId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Please log in</h2>
        <p className="text-muted-foreground mb-8">You need to be logged in to view your orders.</p>
        <Button asChild className="rounded-full"><Link href="/auth">Sign In</Link></Button>
      </div>
    );
  }

  if (isLoading) return <LoadingScreen />;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    processing: "bg-purple-100 text-purple-800 border-purple-200",
    shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const canCancel = (status: string) =>
    status === "pending" || status === "confirmed" || status === "processing";

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">Track and manage all your orders from Ber's Bakery.</p>

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
            <p className="text-muted-foreground mb-8 max-w-md">
              You haven't placed any orders yet. Discover our fresh bakery collection!
            </p>
            <Button asChild className="rounded-full px-8"><Link href="/products">Shop Now</Link></Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => {
              const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
                year: "numeric", month: "short", day: "numeric",
              });
              const delivery = new Date(order.estimatedDelivery).toLocaleDateString("en-GB", {
                weekday: "short", month: "short", day: "numeric",
              });

              return (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="p-5 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-secondary/10">
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={13} />
                        Placed {date} · Est. delivery {delivery}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xl font-bold text-primary">£{order.total.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</div>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-3 mb-5">
                      {order.items.slice(0, 5).map((item: any) => (
                        <div
                          key={item.productId}
                          className="flex items-center gap-2 bg-secondary/30 rounded-xl px-3 py-2 border border-border/40"
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-xs font-semibold text-foreground leading-tight line-clamp-1 max-w-[120px]">
                              {item.productName}
                            </p>
                            <p className="text-xs text-muted-foreground">x{item.quantity} · £{item.subtotal.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 5 && (
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary font-bold text-muted-foreground border border-border/50 text-sm">
                          +{order.items.length - 5}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-border/40">
                      {/* Cancel button — only for cancellable statuses */}
                      {canCancel(order.status) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 gap-1.5"
                          disabled={cancellingId === order.id}
                          onClick={() => setConfirmId(order.id)}
                        >
                          <XCircle size={14} />
                          {cancellingId === order.id ? "Cancelling…" : "Cancel Order"}
                        </Button>
                      ) : (
                        <span />
                      )}

                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10 rounded-full group"
                      >
                        <Link href={`/order-confirmation/${order.id}`} className="flex items-center gap-1.5">
                          View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

      {/* Cancel confirmation dialog */}
      <AlertDialog open={!!confirmId} onOpenChange={(open) => { if (!open) setConfirmId(null); }}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your order. If you've already paid, a refund will be processed within 3–5 business days. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmId && handleCancel(confirmId)}
              className="rounded-full bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
