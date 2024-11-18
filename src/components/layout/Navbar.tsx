import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  {
    id: "1",
    name: "Living Room",
    items: ["Sofas", "Chairs", "Tables", "Storage"]
  },
  {
    id: "2",
    name: "Bedroom",
    items: ["Beds", "Wardrobes", "Dressers", "Nightstands"]
  },
  {
    id: "3",
    name: "Dining",
    items: ["Dining Sets", "Tables", "Chairs", "Sideboards"]
  },
  {
    id: "4",
    name: "Decor",
    items: ["Lighting", "Rugs", "Mirrors", "Art"]
  }
];

const Navbar = () => {
  const { cartCount } = useCart();
  const [searchCategory, setSearchCategory] = useState("all");

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b">
      <div className="luxury-container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-serif text-3xl text-luxury-charcoal hover:text-luxury-gold transition-colors">
            Bliss Home
          </Link>

          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xl mx-8">
            <div className="flex w-full gap-2">
              <Select value={searchCategory} onValueChange={setSearchCategory}>
                <SelectTrigger className="w-[140px] bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Input 
                  className="pl-3 pr-24 bg-white/50 backdrop-blur-sm" 
                  placeholder="Search products..." 
                />
                <Button 
                  className="absolute right-0 top-0 h-full rounded-l-none bg-luxury-gold hover:bg-luxury-charcoal text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-luxury-cream">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
                <DropdownMenuItem asChild>
                  <Link to="/signin" className="w-full cursor-pointer">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signup" className="w-full cursor-pointer">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="w-full cursor-pointer">My Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-luxury-cream">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:block border-t">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="gap-6">
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuTrigger className="h-12 text-base hover:text-luxury-gold bg-transparent hover:bg-transparent">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute top-0 left-0 w-full">
                    <div className="w-[240px] bg-white/95 backdrop-blur-md shadow-lg rounded-lg p-6 m-2">
                      <h3 className="font-serif text-lg mb-4 text-luxury-charcoal">{category.name}</h3>
                      <ul className="space-y-3">
                        {category.items.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={`/products?category=${category.id}&type=${item.toLowerCase()}`}
                              className="block py-2 px-3 text-sm text-gray-600 hover:text-luxury-gold hover:bg-luxury-cream/50 rounded-md transition-colors"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;