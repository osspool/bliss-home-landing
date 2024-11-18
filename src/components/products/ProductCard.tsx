import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    basePrice: number;
    images: string[];
    variations?: Array<{
      name: string;
      options: Array<{
        value: string;
        priceModifier: number;
        quantity: number;
      }>;
    }>;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const hasVariations = product.variations && product.variations.length > 0;

  const handleQuickAdd = () => {
    if (hasVariations) return;
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    });
  };

  return (
    <Card className="group h-full flex flex-col bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {hasVariations ? (
            <Link to={`/products/${product._id}`}>
              <Button variant="secondary" className="bg-white hover:bg-white/90 text-luxury-charcoal">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Options
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleQuickAdd}
              variant="secondary"
              className="bg-white hover:bg-white/90 text-luxury-charcoal"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          )}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="font-serif text-lg mb-2 line-clamp-2">{product.name}</h3>
        <div>
          <p className="text-luxury-gold font-medium">
            ${product.basePrice.toFixed(2)}
          </p>
          {hasVariations && (
            <p className="text-sm text-muted-foreground mt-2">
              Multiple options available
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};