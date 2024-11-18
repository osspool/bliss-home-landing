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
    <section className="relative py-24 bg-gradient-to-br from-luxury-cream to-luxury-beige overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/3 bg-luxury-charcoal transform -skew-x-12 -translate-x-1/4">
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="luxury-container relative">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-4 text-white relative z-10 pr-8">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Discover Our Latest Collection
            </h2>
            <p className="text-white/90 leading-relaxed mb-8">
              Explore our handpicked selection of luxury furniture and decor pieces
              that will transform your space into a sanctuary of style and comfort.
            </p>
            <Button
              variant="secondary"
              className="bg-white hover:bg-luxury-gold hover:text-white transition-colors duration-300"
            >
              Shop Collection
            </Button>
          </div>
          
          <div className="col-span-12 lg:col-span-8">
            <div className="relative px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {mockProducts.slice(0, 6).map((product) => (
                    <CarouselItem key={product._id} className="pl-4 basis-1/3">
                      <div className="p-1">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white hover:bg-luxury-gold hover:text-white transition-colors duration-300" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white hover:bg-luxury-gold hover:text-white transition-colors duration-300" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;