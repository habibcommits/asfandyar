import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold">Asfandyaroptico</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium eyewear and contact lenses for those who value style and vision. 
              Quality you can see, style you can feel.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop?category=sunglasses" className="hover:text-primary transition-colors">Sunglasses</Link></li>
              <li><Link href="/shop?category=eyeglasses" className="hover:text-primary transition-colors">Eyeglasses</Link></li>
              <li><Link href="/shop?category=contacts" className="hover:text-primary transition-colors">Contact Lenses</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@asfandyaroptico.com</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 123-4567</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Vision St, Optics City</div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Asfandyaroptico. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Admin Link as requested */}
            <Link href="/auth" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
