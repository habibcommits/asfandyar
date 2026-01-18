import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} is now in your cart.`,
    });
  };

  // Fallback image handling
  const imageUrl = product.images?.[0] || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop";

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group cursor-pointer h-full">
        <Card className="h-full overflow-hidden border-0 bg-transparent shadow-none hover:shadow-lg transition-all duration-300 rounded-xl bg-card">
          <div className="aspect-[4/5] relative overflow-hidden bg-secondary/30 rounded-t-xl">
            {product.isFeatured && (
              <Badge className="absolute top-2 left-2 z-10 bg-primary/90 text-white hover:bg-primary">
                Featured
              </Badge>
            )}
            {/* Sunglasses photo */}
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            
            <div className="absolute bottom-4 right-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Button 
                onClick={handleAddToCart}
                size="icon" 
                className="h-10 w-10 rounded-full shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <CardContent className="pt-4 pb-2 px-4">
            <h3 className="font-medium text-lg leading-tight group-hover:text-primary/80 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.brand}</p>
          </CardContent>
          
          <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-orange-500 font-medium">Low Stock</span>
            )}
            {product.stock === 0 && (
              <span className="text-xs text-destructive font-medium">Out of Stock</span>
            )}
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
}
