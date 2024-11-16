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
              <li><a href="#" className="hover:text-luxury-gold">Living Room</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Dining</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Bedroom</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-sm text-luxury-charcoal/80">
              <li><a href="#" className="hover:text-luxury-gold">Our Story</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Contact</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Shipping</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-luxury-charcoal/80">
              <li><a href="#" className="hover:text-luxury-gold">Instagram</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Pinterest</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Facebook</a></li>
              <li><a href="#" className="hover:text-luxury-gold">Twitter</a></li>
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