import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.filter(p => p.isFeatured).slice(0, 4) || [];
  const newArrivals = products?.slice(0, 8) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-slate-900 flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* Fashion model with glasses */}
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion eyewear"
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 text-center sm:text-left">
          <div className="max-w-xl animate-fade-in-up">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              See the World in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Style</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md">
              Discover our premium collection of handcrafted eyewear and contact lenses designed for comfort and elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-gray-100 border-none">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg text-white border-white hover:bg-white/10 hover:text-white">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">2 Year Warranty</h3>
                <p className="text-sm text-muted-foreground">Comprehensive coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Certified authentic products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold">Featured Collection</h2>
            <p className="text-muted-foreground mt-2">Curated selection just for you</p>
          </div>
          <Link href="/shop">
            <Button variant="ghost" className="group">
              View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[400px] bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category Highlight */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Premium Contact Lenses</h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Experience ultimate comfort with our range of breathable, high-moisture contact lenses. 
                Whether for daily wear or special occasions, find your perfect match.
              </p>
              <Link href="/shop?category=contacts">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black rounded-full px-8">
                  Explore Lenses
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              {/* Contact lens close up */}
              <img 
                src="https://images.unsplash.com/photo-1596460107916-430662021049?q=80&w=2070&auto=format&fit=crop" 
                alt="Contact Lenses" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
