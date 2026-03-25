import { useState } from "react";
import { useListProducts } from "@workspace/api-client-react";
import { useLocation, useSearch } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { LoadingScreen } from "@/components/ui/loading";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Products() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [sortBy, setSortBy] = useState(params.get("sortBy") || "newest");
  const [priceRange, setPriceRange] = useState([0, 70]);

  // Construct query params
  const queryParams: any = {};
  if (searchTerm) queryParams.search = searchTerm;
  if (category !== "all") queryParams.category = category;
  if (sortBy) queryParams.sortBy = sortBy;
  queryParams.maxPrice = priceRange[1];

  const { data: products, isLoading, isError } = useListProducts(queryParams);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "cakes", label: "Cakes" },
    { id: "bread", label: "Bread" },
    { id: "birthday", label: "Birthday Cakes" },
    { id: "eclairs", label: "Eclairs & Pastries" },
  ];

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Filter size={18} /> Categories</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={category === cat.id}
                onChange={() => setCategory(cat.id)}
                className="w-4 h-4 text-primary focus:ring-primary border-border"
              />
              <span className={`${category === cat.id ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground transition-colors"}`}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={200}
          step={5}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground font-medium">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-secondary/30 border-b border-border/50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
            <p className="text-muted-foreground text-lg font-light">
              Browse our selection of artisan cakes, cupcakes, and sweet treats baked fresh daily with love.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
              
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search cakes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-full border-border/50 bg-background focus-visible:ring-primary/20"
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden w-full sm:w-auto rounded-full gap-2">
                      <SlidersHorizontal size={16} /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader className="mb-8">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] rounded-full bg-background border-border/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <LoadingScreen />
            ) : isError ? (
              <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
                <p className="text-muted-foreground">We couldn't load the products. Please try again later.</p>
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-full"
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("all");
                    setPriceRange([0, 200]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
