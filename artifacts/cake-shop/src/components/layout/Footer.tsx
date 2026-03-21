import { Link } from "wouter";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern-bg.png)` }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-display text-3xl text-primary-foreground tracking-wide">Sweet Cakes</h3>
            <p className="text-background/70 leading-relaxed font-light">
              Crafting unforgettable moments through artisanal, hand-crafted cakes made with premium ingredients and boundless love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1 duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1 duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1 duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Our Cakes
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-background/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-accent">Contact Us</h4>
            <ul className="space-y-4 text-background/70 font-light">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                <span>123 Baker Street, Pastry District<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span>+1 (555) 123-CAKE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <span>hello@sweetcakes.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-xl mb-6 text-accent">Newsletter</h4>
            <p className="text-background/70 font-light mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-background/5 border border-background/20 rounded-lg px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-background/10 text-center text-background/50 text-sm font-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Sweet Cakes Premium Bakery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
