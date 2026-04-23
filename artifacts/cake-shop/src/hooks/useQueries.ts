import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";

// === Products ===
export const useProducts = (queryParams = {}) => {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const { data } = await api.get("/products", { params: queryParams });
      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useProductReviews = (id: string) => {
  return useQuery({
    queryKey: ["product_reviews", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}/reviews`);
      return data;
    },
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data } = await api.get("/products/featured");
      return data;
    },
  });
};

// === Cart ===
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await api.get("/cart");
      return data;
    },
    enabled: !!localStorage.getItem("token")
  });
};

export const useCartMutations = () => {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const { data } = await api.post("/cart", { productId, quantity });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeFromCart = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete(`/cart/${productId}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete("/cart/clear");
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return { addToCart, updateQuantity, removeFromCart, clearCart };
};

// === Orders ===
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data;
    },
    enabled: !!localStorage.getItem("token")
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useOrderMutations = () => {
  const queryClient = useQueryClient();

  const createOrder = useMutation({
    mutationFn: async (orderData: any) => {
      const { data } = await api.post("/orders", orderData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  return { createOrder };
};

// === Admin ===
export const useAdminMutations = () => {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: async (productData: any) => {
      const { data } = await api.post("/admin/products", productData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put(`/admin/products/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/admin/products/${id}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await api.patch(`/admin/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  return { createProduct, updateProduct, deleteProduct, updateOrderStatus };
};

// === SuperAdmin ===
export const useSuperAdminUsers = () => {
  return useQuery({
    queryKey: ["superadmin_users"],
    queryFn: async () => {
      const { data } = await api.get("/superadmin/users");
      return data;
    },
  });
};

export const useSuperAdminMutations = () => {
  const queryClient = useQueryClient();

  const updateUserRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const { data } = await api.patch(`/superadmin/users/${id}/role`, { role });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["superadmin_users"] }),
  });

  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/superadmin/users/${id}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["superadmin_users"] }),
  });

  return { updateUserRole, deleteUser };
};
