import { Cart } from "@/types/cart";
import { Separator } from "@/components/ui/separator";

interface CheckoutSummaryProps {
  cart: Cart | null;
  deliveryMethod: string;
}

const CheckoutSummary = ({ cart, deliveryMethod }: CheckoutSummaryProps) => {
  const calculateSubtotal = () => {
    if (!cart?.items.length) return 0;
    return cart.items.reduce((total, item) => {
      const priceModifier = item.product.variations?.reduce((mod, variation) => {
        const selectedOption = variation.options.find(
          opt => opt.value === item.variations[variation.name]
        );
        return mod + (selectedOption?.priceModifier || 0);
      }, 0) || 0;
      return total + ((item.product.basePrice + priceModifier) * item.quantity);
    }, 0);
  };

  const getDeliveryCharge = () => {
    return deliveryMethod === "Dhaka City" ? 60 : 120;
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = subtotal + deliveryCharge;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 sticky top-24">
      <h2 className="font-serif text-xl">Order Summary</h2>
      
      <div className="space-y-4">
        {cart?.items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span className="flex-grow">
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-medium">
              ${((item.product.basePrice + 
                (item.product.variations?.reduce((mod, variation) => {
                  const selectedOption = variation.options.find(
                    opt => opt.value === item.variations[variation.name]
                  );
                  return mod + (selectedOption?.priceModifier || 0);
                }, 0) || 0)) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery</span>
          <span>${deliveryCharge.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-medium">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutSummary;