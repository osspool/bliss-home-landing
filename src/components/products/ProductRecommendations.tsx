import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { mockProducts } from "@/data/mockProducts";

interface ProductRecommendationsProps {
  currentProductId: string;
  currentCategory?: { _id: string; name: string };
}

export const ProductRecommendations = ({
  currentProductId,
  currentCategory,
}: ProductRecommendationsProps) => {
  const recommendations = mockProducts
    .filter(
      (product) =>
        product._id !== currentProductId &&
        (!currentCategory || product.category?._id === currentCategory._id)
    )
    .slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-serif mb-8">You May Also Like</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`}>
            <Card className="group overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-serif text-sm mb-2">{product.name}</h4>
                <p className="text-luxury-gold text-sm font-medium">
                  ${product.basePrice.toFixed(2)}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};