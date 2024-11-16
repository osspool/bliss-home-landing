import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import homeData from "@/data/home.json";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = homeData.hero.slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative h-full luxury-container flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-serif mb-4 animate-fade-up">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                {slide.subtitle}
              </p>
              <Button
                className="animate-fade-up bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white"
                style={{ animationDelay: "0.4s" }}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default Hero;