import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts, useOrders, useAdminMutations } from "../hooks/useQueries";
import { useLocation } from "wouter";
import { LoadingScreen } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingBag, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPanel() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  
  const { createProduct, deleteProduct, updateOrderStatus } = useAdminMutations();

  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 10, category: "cakes", imageUrl: "" });

  if (authLoading || productsLoading || ordersLoading) return <LoadingScreen />;

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    setLocation("/");
    return null;
  }

  const handleCreateProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.description || !newProduct.imageUrl) {
        toast({ variant: "destructive", description: "Please fill all fields" });
        return;
      }
      await createProduct.mutateAsync(newProduct);
      toast({ description: "Product created successfully!" });
      setNewProduct({ name: "", description: "", price: 10, category: "cakes", imageUrl: "" });
    } catch (e) {
      toast({ variant: "destructive", description: "Failed to create product" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast({ description: "Product deleted" });
    } catch {
      toast({ variant: "destructive", description: "Failed to delete product" });
    }
  };

  const handleUpdateStatus = async (id: string, current: string) => {
    const statuses = ["pending", "confirmed", "processing", "shipped", "delivered"];
    const next = statuses[statuses.indexOf(current) + 1] || "delivered";
    try {
      await updateOrderStatus.mutateAsync({ id, status: next });
      toast({ description: `Order status updated to ${next}` });
    } catch {
      toast({ variant: "destructive", description: "Failed to update order status" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="products">
        <TabsList className="mb-6 bg-secondary/30 p-1 rounded-full grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="products" className="rounded-full">Products</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-8">
          {/* Create Product Card */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus size={18} /> Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              <Input placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
              <Input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} />
              <Input placeholder="Image URL (e.g. /images/cake.jpg)" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
              <Input placeholder="Description" className="md:col-span-2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <Button className="mt-4" onClick={handleCreateProduct} disabled={createProduct.isPending}>Submit Product</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products?.map((p: any) => (
              <div key={p.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col justify-between">
                <div>
                  <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-primary mb-4">${p.price}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(p.id)}><Trash2 size={14} className="mr-2" /> Delete</Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-4">
            {orders?.map((o: any) => (
              <div key={o.id} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-bold">Order #{o.id.slice(-8).toUpperCase()}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</p>
                  <p className="font-semibold text-primary mt-2">Status: <span className="uppercase text-xs tracking-wider border border-primary/20 bg-primary/5 px-2 py-1 rounded">{o.status}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg mb-2">${o.total}</p>
                  <Button onClick={() => handleUpdateStatus(o.id, o.status)}>Bump Status <Package size={16} className="ml-2" /></Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
