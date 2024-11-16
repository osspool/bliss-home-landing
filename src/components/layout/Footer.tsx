import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-luxury-cream border-t">
      <div className="luxury-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-6">Bliss Home</h3>
            <p className="text-sm text-luxury-charcoal/80">
              Curating luxury home décor for the modern lifestyle.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-luxury-charcoal/80">
              <li><Link to="/products" className="hover:text-luxury-gold">All Products</Link></li>
              <li><Link to="/products?category=living-room" className="hover:text-luxury-gold">Living Room</Link></li>
              <li><Link to="/products?category=dining" className="hover:text-luxury-gold">Dining</Link></li>
              <li><Link to="/products?category=bedroom" className="hover:text-luxury-gold">Bedroom</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-sm text-luxury-charcoal/80">
              <li><Link to="/our-story" className="hover:text-luxury-gold">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-luxury-gold">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-luxury-gold">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-luxury-gold">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-luxury-charcoal/80">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold">Pinterest</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-sm text-luxury-charcoal/60 text-center">
          © {new Date().getFullYear()} Bliss Home. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;