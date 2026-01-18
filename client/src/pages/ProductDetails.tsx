import { useParams, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link href="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link href="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden border">
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border cursor-pointer hover:border-primary">
                    <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              <span className="text-sm font-medium text-primary/60 uppercase tracking-wider">{product.brand || "Generic"}</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {product.stock > 0 && (
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-secondary transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 hover:bg-secondary transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 rounded-full text-lg h-14" onClick={handleAddToCart}>
                    <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                  </Button>
                </div>
              </div>
            )}
            
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between py-2 border-b">
                <span>Material</span>
                <span className="font-medium text-foreground">{product.material || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Usage</span>
                <span className="font-medium text-foreground">{product.usage || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Lens Type</span>
                <span className="font-medium text-foreground">{product.lensType || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
