import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Auth() {
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data);
      setLocation("/");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(data);
      setLocation("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <img 
            src={`${import.meta.env.BASE_URL}images/logo.png`} 
            alt="Sweet Cakes" 
            className="h-16 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><text y="20" font-family="serif" font-size="20">Sweet Cakes</text></svg>';
            }}
          />
        </div>
        <h2 className="font-display text-center text-3xl font-bold tracking-tight text-foreground mb-8">
          Welcome to Sweet Cakes
        </h2>

        <div className="bg-card py-8 px-4 shadow-xl shadow-black/5 sm:rounded-3xl sm:px-10 border border-border/50">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full bg-secondary/50 p-1">
              <TabsTrigger value="login" className="rounded-full text-sm font-semibold">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full text-sm font-semibold">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    {...loginForm.register("email")} 
                    className="rounded-xl bg-background" 
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    {...loginForm.register("password")} 
                    className="rounded-xl bg-background" 
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-md font-semibold" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input 
                    id="reg-name" 
                    {...registerForm.register("name")} 
                    className="rounded-xl bg-background" 
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email address</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    {...registerForm.register("email")} 
                    className="rounded-xl bg-background" 
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    {...registerForm.register("password")} 
                    className="rounded-xl bg-background" 
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl text-md font-semibold" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
