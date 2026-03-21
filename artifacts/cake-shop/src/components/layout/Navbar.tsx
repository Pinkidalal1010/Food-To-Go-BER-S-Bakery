import { Link, useLocation } from "wouter";
import { ShoppingBag, User as UserIcon, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Cakes", path: "/products" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex-1">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.png`} 
                alt="Sweet Cakes" 
                className="h-10 object-contain group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><text y="20" font-family="serif" font-size="20">Sweet Cakes</text></svg>';
                }}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform hover:after:origin-bottom-left hover:after:scale-x-100 ${
                  location === link.path ? "text-primary after:scale-x-100" : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 text-foreground hover:text-primary transition-colors focus:outline-none">
                    <UserIcon size={22} strokeWidth={1.5} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                  <DropdownMenuLabel className="font-display text-lg font-normal text-primary">
                    Welcome, {user?.name?.split(' ')[0] || 'Guest'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer text-destructive focus:text-destructive rounded-md"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm" className="hidden sm:flex rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white">
                  Sign In
                </Button>
                <button className="sm:hidden p-2 text-foreground hover:text-primary transition-colors">
                  <UserIcon size={22} strokeWidth={1.5} />
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-4 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium p-2 rounded-lg ${
                    location === link.path ? "bg-primary/10 text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link 
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium p-2 text-primary"
                >
                  Sign In / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
