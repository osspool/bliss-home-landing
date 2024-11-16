import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import homeData from "@/data/home.json";

const FeaturedProducts = () => {
  const { toast } = useToast();

  const handleQuickAdd = (productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart`,
      duration: 2000,
    });
  };

  return (
    <section className="py-20 bg-luxury-beige">
      <div className="luxury-container">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          Featured Collection
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of exquisite pieces that will transform your space
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => handleQuickAdd(product.name)}
                    variant="secondary"
                    className="bg-white hover:bg-white/90 text-luxury-charcoal"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Quick Add
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                <p className="text-luxury-gold font-medium">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-luxury-gold text-luxury-charcoal hover:bg-luxury-gold hover:text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;