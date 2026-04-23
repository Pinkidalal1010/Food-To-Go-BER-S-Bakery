import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useOrderMutations } from "../hooks/useQueries";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CreditCard, Landmark, Banknote, ShieldCheck, Lock } from "lucide-react";

const checkoutSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z.string().min(7, "Valid phone number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "County / Region is required"),
    zipCode: z.string().min(3, "Eircode / Postcode is required"),
  }),
  paymentMethod: z.enum(["credit_card", "debit_card", "bank_transfer", "cash_on_delivery"]),
  cardDetails: z.object({
    cardholderName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
  }).optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const paymentMethods = [
  {
    id: "credit_card" as const,
    label: "Credit Card",
    description: "Visa, Mastercard, Amex",
    icon: <CreditCard size={22} />,
    brands: ["VISA", "MC", "AMEX"],
  },
  {
    id: "debit_card" as const,
    label: "Debit Card",
    description: "All major debit cards accepted",
    icon: <CreditCard size={22} />,
    brands: ["VISA", "MC"],
  },
  {
    id: "bank_transfer" as const,
    label: "Bank Transfer",
    description: "Pay directly from your bank",
    icon: <Landmark size={22} />,
    brands: [],
  },
  {
    id: "cash_on_delivery" as const,
    label: "Cash on Delivery",
    description: "Pay when you receive your order",
    icon: <Banknote size={22} />,
    brands: [],
  },
];

function formatCardNumber(val: string) {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<string>("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const { createOrder } = useOrderMutations();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "credit_card",
    },
  });

  if (!isAuthenticated) {
    setLocation("/auth");
    return null;
  }

  if (items.length === 0) {
    setLocation("/products");
    return null;
  }

  const shippingCost = total >= 50 ? 0 : 4.99;
  const finalTotal = total + shippingCost;
  const isCardPayment = selectedPayment === "credit_card" || selectedPayment === "debit_card";

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const order = await createOrder.mutateAsync(data as any);
      clearCart();
      toast({ title: "Order placed successfully!", description: `Order #${order.id.slice(0, 8).toUpperCase()}` });
      setLocation(`/order-confirmation/${order.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: error.message || "An error occurred during checkout.",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-foreground mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8 flex items-center gap-1.5">
          <Lock size={14} className="text-green-500" />
          Secure checkout — your information is protected
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1: Shipping */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Full Name</Label>
                  <Input {...form.register("shippingAddress.fullName")} placeholder="e.g. Bernadette Murphy" className="rounded-xl bg-background h-11" />
                  {form.formState.errors.shippingAddress?.fullName && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input {...form.register("shippingAddress.phone")} placeholder="e.g. 087 123 4567" className="rounded-xl bg-background h-11" />
                  {form.formState.errors.shippingAddress?.phone && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.phone.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>City / Town</Label>
                  <Input {...form.register("shippingAddress.city")} placeholder="e.g. Dublin" className="rounded-xl bg-background h-11" />
                  {form.formState.errors.shippingAddress?.city && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.city.message}</p>
                  )}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Address Line</Label>
                  <Input {...form.register("shippingAddress.address")} placeholder="Street address, apartment, etc." className="rounded-xl bg-background h-11" />
                  {form.formState.errors.shippingAddress?.address && (
                    <p className="text-sm text-destructive">{form.formState.errors.shippingAddress.address.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>County / Region</Label>
                  <Input {...form.register("shippingAddress.state")} placeholder="e.g. County Dublin" className="rounded-xl bg-background h-11" />
                </div>

                <div className="space-y-1.5">
                  <Label>Eircode / Postcode</Label>
                  <Input {...form.register("shippingAddress.zipCode")} placeholder="e.g. D01 F5P2" className="rounded-xl bg-background h-11" />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setSelectedPayment(method.id);
                        form.setValue("paymentMethod", method.id);
                      }}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left w-full transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-background hover:border-primary/40 hover:bg-secondary/30"
                      }`}
                    >
                      <div className={`mt-0.5 p-2 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {method.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-foreground text-sm">{method.label}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                        {method.brands.length > 0 && (
                          <div className="flex gap-1.5 mt-2">
                            {method.brands.map((brand) => (
                              <span key={brand} className="text-[10px] font-bold px-1.5 py-0.5 border border-border/70 rounded bg-background text-foreground/70">
                                {brand}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card Details Form */}
              {isCardPayment && (
                <div className="border border-border rounded-xl p-5 bg-secondary/20 space-y-5 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={16} className="text-green-500" />
                    <span className="text-xs text-muted-foreground font-medium">Your card details are encrypted and secure</span>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Cardholder Name</Label>
                    <Input
                      {...form.register("cardDetails.cardholderName")}
                      placeholder="Name as it appears on card"
                      className="rounded-xl bg-background h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Card Number</Label>
                    <div className="relative">
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="rounded-xl bg-background h-11 pr-24 font-mono tracking-wider"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <span className="text-[10px] font-bold text-blue-600 border border-blue-200 bg-blue-50 rounded px-1">VISA</span>
                        <span className="text-[10px] font-bold text-red-600 border border-red-200 bg-red-50 rounded px-1">MC</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Expiry Date</Label>
                      <Input
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="rounded-xl bg-background h-11 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>CVV / CVC</Label>
                      <Input
                        {...form.register("cardDetails.cvv")}
                        placeholder="3 or 4 digits"
                        maxLength={4}
                        type="password"
                        className="rounded-xl bg-background h-11 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Info */}
              {selectedPayment === "bank_transfer" && (
                <div className="border border-border rounded-xl p-5 bg-blue-50/50 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Landmark size={16} className="text-primary" />
                    Bank Transfer Details
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Bank:</span>
                      <span>Allied Irish Banks (AIB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Account Name:</span>
                      <span>Ber's Bakery Ltd</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">IBAN:</span>
                      <span className="font-mono">IE29 AIBK 9311 5212 3456 78</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">BIC:</span>
                      <span className="font-mono">AIBKIE2D</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                    Please use your order number as the payment reference. Your order will be processed once payment is confirmed.
                  </p>
                </div>
              )}

              {/* Cash on Delivery Info */}
              {selectedPayment === "cash_on_delivery" && (
                <div className="border border-border rounded-xl p-5 bg-green-50/50 animate-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold text-sm text-foreground flex items-center gap-2 mb-2">
                    <Banknote size={16} className="text-green-600" />
                    Cash on Delivery
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pay with cash when your order arrives. Please have the exact amount ready. Our delivery driver cannot always provide change.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-5">Order Summary</h3>

              <div className="space-y-3 mb-5 max-h-[35vh] overflow-auto pr-1">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/40">
                      <img src={item.product.imageUrl} className="w-full h-full object-cover" alt={item.product.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold text-sm shrink-0">£{item.subtotal.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground font-medium">£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-semibold" : "text-foreground font-medium"}>
                    {shippingCost === 0 ? "FREE" : `£${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
                    Free delivery on orders over £50
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-primary">£{finalTotal.toFixed(2)}</span>
              </div>

              <Button
                type="submit"
                disabled={createOrder.isPending}
                className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20"
              >
                {createOrder.isPending
                  ? "Processing…"
                  : selectedPayment === "cash_on_delivery"
                  ? `Place Order · £${finalTotal.toFixed(2)}`
                  : selectedPayment === "bank_transfer"
                  ? `Confirm Order · £${finalTotal.toFixed(2)}`
                  : `Pay Now · £${finalTotal.toFixed(2)}`}
              </Button>

              <div className="flex items-center justify-center gap-4 mt-4">
                <ShieldCheck size={14} className="text-muted-foreground" />
                <p className="text-xs text-center text-muted-foreground">
                  Secure & encrypted checkout
                </p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
