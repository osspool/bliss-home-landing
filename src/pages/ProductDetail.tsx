import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductVariations } from "@/components/products/ProductVariations";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductRecommendations } from "@/components/products/ProductRecommendations";
import { mockProducts } from "@/data/mockProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

  const product = mockProducts.find((p) => p._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateTotalPrice = () => {
    let total = product.basePrice;
    Object.entries(selectedVariations).forEach(([variationName, selectedValue]) => {
      const variation = product.variations?.find((v) => v.name === variationName);
      const option = variation?.options.find((o) => o.value === selectedValue);
      if (option?.priceModifier) {
        total += option.priceModifier;
      }
    });
    return total * quantity;
  };

  const handleVariationChange = (variationName: string, value: string) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [variationName]: value,
    }));
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28">
        <div className="luxury-container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImageGallery images={product.images} productName={product.name} />

            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
                <p className="text-2xl text-luxury-gold font-medium">
                  ${calculateTotalPrice().toFixed(2)}
                </p>
              </div>

              {product.variations && (
                <ProductVariations
                  variations={product.variations}
                  selectedVariations={selectedVariations}
                  onVariationChange={handleVariationChange}
                />
              )}

              <div className="space-y-4">
                <h3 className="font-medium">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="prose max-w-none mt-8">
                <div
                  className="formatted-content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <ProductRecommendations 
                  currentProductId={product._id}
                  currentCategory={product.category}
                />
              </TabsContent>
              <TabsContent value="reviews" className="mt-8">
                <ProductReviews
                  productId={product._id}
                  reviews={product.reviews || []}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;