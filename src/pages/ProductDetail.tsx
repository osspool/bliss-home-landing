import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockProducts } from "@/data/mockProducts";
import { ReviewForm } from "@/components/products/ReviewForm";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

  // Find product from mock data
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

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="luxury-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg border cursor-pointer hover:border-primary"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
                <p className="text-2xl text-luxury-gold font-medium">
                  ${calculateTotalPrice().toFixed(2)}
                </p>
              </div>

              {/* Variations */}
              {product.variations?.map((variation) => (
                <div key={variation.name} className="space-y-4">
                  <h3 className="font-medium">{variation.name}</h3>
                  <RadioGroup
                    onValueChange={(value) =>
                      setSelectedVariations((prev) => ({
                        ...prev,
                        [variation.name]: value,
                      }))
                    }
                  >
                    <div className="flex gap-4">
                      {variation.options.map((option) => (
                        <div key={option.value}>
                          <RadioGroupItem
                            value={option.value}
                            id={`${variation.name}-${option.value}`}
                            className="peer hidden"
                          />
                          <Label
                            htmlFor={`${variation.name}-${option.value}`}
                            className="flex items-center justify-center px-4 py-2 border rounded-md peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer"
                          >
                            {option.value}
                            {option.priceModifier > 0 && ` (+$${option.priceModifier})`}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}

              {/* Quantity */}
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
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="prose max-w-none mt-8">
                <div className="formatted-content" dangerouslySetInnerHTML={{ __html: product.description }} />
              </TabsContent>
              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Reviews</CardTitle>
                        <CardDescription>
                          Average Rating: 4.5/5
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {product.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                              <div className="flex items-center gap-2 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-luxury-gold text-luxury-gold"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <ReviewForm productId={product._id} />
                  </div>
                </div>
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