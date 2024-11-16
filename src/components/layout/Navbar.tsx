import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="luxury-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <a href="#" className="text-lg">Living Room</a>
                <a href="#" className="text-lg">Dining</a>
                <a href="#" className="text-lg">Bedroom</a>
                <a href="#" className="text-lg">Accessories</a>
              </div>
            </SheetContent>
          </Sheet>

          <a href="/" className="font-serif text-2xl md:text-3xl">
            Bliss Home
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm hover:text-luxury-gold transition-colors">
              Living Room
            </a>
            <a href="#" className="text-sm hover:text-luxury-gold transition-colors">
              Dining
            </a>
            <a href="#" className="text-sm hover:text-luxury-gold transition-colors">
              Bedroom
            </a>
            <a href="#" className="text-sm hover:text-luxury-gold transition-colors">
              Accessories
            </a>
          </div>

          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;