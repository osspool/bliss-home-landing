import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const calculateItemTotal = (basePrice: number, priceModifier: number = 0, quantity: number) => {
    return (basePrice + priceModifier) * quantity;
  };

  const calculateSubtotal = () => {
    if (!cart?.items.length) return 0;
    return cart.items.reduce((total, item) => {
      const priceModifier = item.product.variations?.reduce((mod, variation) => {
        const selectedOption = variation.options.find(
          opt => opt.value === item.variations[variation.name]
        );
        return mod + (selectedOption?.priceModifier || 0);
      }, 0) || 0;
      return total + calculateItemTotal(item.product.basePrice, priceModifier, item.quantity);
    }, 0);
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    try {
      updateQuantity(itemId, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28">
        <div className="luxury-container py-8">
          <h1 className="text-3xl md:text-4xl font-serif mb-8">Shopping Cart</h1>
          
          {!cart?.items.length ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-lg">{item.product.name}</h3>
                          {Object.entries(item.variations).map(([name, value]) => (
                            <p key={name} className="text-sm text-muted-foreground">
                              {name}: {value}
                            </p>
                          ))}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={isUpdating || item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            disabled={isUpdating}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-medium">
                          ${calculateItemTotal(
                            item.product.basePrice,
                            item.product.variations?.reduce((mod, variation) => {
                              const selectedOption = variation.options.find(
                                opt => opt.value === item.variations[variation.name]
                              );
                              return mod + (selectedOption?.priceModifier || 0);
                            }, 0) || 0,
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="font-serif text-xl mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-4 border-t">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;