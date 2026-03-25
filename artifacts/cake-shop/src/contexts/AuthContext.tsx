import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User, LoginRequest, RegisterRequest } from "@workspace/api-client-react";
import { useLoginUser, useRegisterUser, useGetCurrentUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading, refetch } = useGetCurrentUser({
    query: {
      enabled: !!token,
      retry: false,
    },
    request: {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    }
  });

  const loginMutation = useLoginUser();
  const registerMutation = useRegisterUser();

  const login = async (data: LoginRequest) => {
    try {
      const response = await loginMutation.mutateAsync({ data });
      localStorage.setItem("token", response.token);
      setToken(response.token);
      await refetch();
      toast({ title: "Welcome back!", description: "You have successfully logged in." });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Login failed", 
        description: error.message || "Please check your credentials and try again." 
      });
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await registerMutation.mutateAsync({ data });
      localStorage.setItem("token", response.token);
      setToken(response.token);
      await refetch();
      toast({ title: "Welcome to Ber's Bakery!", description: "Your account has been created." });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Registration failed", 
        description: error.message || "Could not create your account." 
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.setQueryData(["/api/auth/me"], null);
    toast({ title: "Logged out", description: "You have been logged out successfully." });
  };

  // If token is invalid, clear it
  useEffect(() => {
    if (token && !isLoading && !user) {
      // Potentially bad token
      const checkValid = async () => {
        try {
          const res = await refetch();
          if (res.isError) {
            localStorage.removeItem("token");
            setToken(null);
          }
        } catch {
          // ignore
        }
      }
      checkValid();
    }
  }, [user, isLoading, token, refetch]);

  return (
    <AuthContext.Provider value={{
      user: user || null,
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
