import { Button } from "@/components/ui/button";
import homeData from "@/data/home.json";

const Editorial = () => {
  return (
    <section className="py-20">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif">{homeData.editorial.title}</h2>
            <p className="text-xl text-luxury-gold">{homeData.editorial.subtitle}</p>
            <p className="text-luxury-charcoal/80 leading-relaxed">
              {homeData.editorial.content}
            </p>
            <Button className="bg-luxury-charcoal hover:bg-luxury-gold text-white">
              Explore Our Story
            </Button>
          </div>
          <div className="relative aspect-[4/5]">
            <img
              src={homeData.editorial.image}
              alt="Luxury interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-luxury-gold -translate-x-4 -translate-y-4 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;