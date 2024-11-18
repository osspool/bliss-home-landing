import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/products/ProductCard";
import { mockProducts } from "@/data/mockProducts";

const ProductShowcase = () => {
  return (
    <section className="relative min-h-[600px] bg-luxury-cream">
      <div className="absolute inset-0 w-1/4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace)",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
      
      <div className="luxury-container relative py-20">
        <div className="grid grid-cols-4 gap-8">
          <div className="text-white space-y-6 z-10">
            <h2 className="text-4xl font-serif">Discover Our Latest Collection</h2>
            <p className="text-white/90 leading-relaxed">
              Explore our handpicked selection of luxury furniture and decor pieces
              that will transform your space into a sanctuary of style and comfort.
            </p>
            <Button
              variant="secondary"
              className="bg-white hover:bg-luxury-gold hover:text-white"
            >
              Shop Collection
            </Button>
          </div>
          
          <div className="col-span-3">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {mockProducts.map((product) => (
                  <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;