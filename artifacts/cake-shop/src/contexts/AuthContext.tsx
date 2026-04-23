import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/api";

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (formData: any) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast({ title: "Welcome back!", description: "You have successfully logged in." });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Login failed", 
        description: error.response?.data?.message || "Please check your credentials and try again." 
      });
      throw error;
    }
  };

  const register = async (formData: any) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast({ title: "Welcome to Ber's Bakery!", description: "Your account has been created." });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Registration failed", 
        description: error.response?.data?.message || "Could not create your account." 
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    queryClient.clear();
    toast({ title: "Logged out", description: "You have been logged out successfully." });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
