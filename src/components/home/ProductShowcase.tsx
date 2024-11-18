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
    <section className="relative py-20 bg-luxury-cream overflow-hidden">
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
      
      <div className="luxury-container relative">
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
          
          <div className="col-span-3 pl-8">
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
                      <div className="h-full">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white" />
                <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;