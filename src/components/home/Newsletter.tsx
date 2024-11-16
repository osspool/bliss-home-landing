import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-20 bg-luxury-charcoal text-white">
      <div className="luxury-container text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">Join Our Community</h2>
        <p className="text-white/80 mb-8">
          Subscribe to receive exclusive offers, decor tips, and new arrival updates.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button className="bg-luxury-gold hover:bg-white hover:text-luxury-charcoal whitespace-nowrap">
            Subscribe Now
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;