import { Card } from "@/components/ui/card";
import homeData from "@/data/home.json";

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-luxury-beige">
      <div className="luxury-container">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeData.featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
      </div>
    </section>
  );
};

export default FeaturedProducts;