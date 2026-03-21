import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Award, Heart, Clock } from "lucide-react";
import { useGetFeaturedProducts } from "@workspace/api-client-react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";

export default function Home() {
  const { data: featuredProducts, isLoading, isError } = useGetFeaturedProducts();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-bg.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn}
            className="max-w-2xl space-y-8"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-widest uppercase mb-2 border border-primary/20">
              Artisanal Bakery
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-foreground text-balance">
              Love at First <span className="text-primary italic">Bite.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
              Hand-crafted cakes made with premium ingredients, designed to make your special moments unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 hover:text-primary">
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-8 border-t border-border/50">
              <div className="flex -space-x-3">
                {/* Unsplash avatars for testimonials */}
                <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Customer" />
                <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" alt="Customer" />
                <img className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Customer" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-medium mt-1 text-foreground">Loved by 2,000+ customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-card border-y border-border/50 relative z-20 -mt-8 mx-4 sm:mx-8 rounded-2xl shadow-xl shadow-black/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
            <div className="flex items-center justify-center gap-4 px-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Premium Quality</h4>
                <p className="text-sm text-muted-foreground">Finest ingredients</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 px-4 pt-8 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Baked with Love</h4>
                <p className="text-sm text-muted-foreground">Artisan crafted</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 px-4 pt-8 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Fresh Daily</h4>
                <p className="text-sm text-muted-foreground">Baked every morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Signature Creations</h2>
              <p className="text-muted-foreground text-lg">Discover our most loved cakes, crafted to perfection and guaranteed to delight.</p>
            </div>
            <Button asChild variant="ghost" className="group rounded-full hover:bg-primary/10 hover:text-primary">
              <Link href="/products" className="flex items-center gap-2">
                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <LoadingSpinner className="py-12" />
          ) : isError ? (
            <div className="text-center py-12 bg-muted/30 rounded-2xl border border-border border-dashed">
              <p className="text-muted-foreground">Currently updating our featured collection. Check back soon!</p>
            </div>
          ) : featuredProducts?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Banners */}
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Wedding Cakes", img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800", q: "wedding" },
              { title: "Birthday Specials", img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800", q: "birthday" },
              { title: "Cupcakes", img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800", q: "cupcakes" }
            ].map((cat) => (
              <Link 
                key={cat.title} 
                href={`/products?category=${cat.q}`}
                className="group relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden block"
              >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-display text-white font-bold mb-2 group-hover:-translate-y-2 transition-transform">{cat.title}</h3>
                  <div className="flex items-center text-white/80 gap-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all delay-75">
                    <span className="text-sm uppercase tracking-wider font-semibold">Explore</span> <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
