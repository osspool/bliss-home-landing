import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, MapPin, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import DeliveryForm from "@/components/checkout/DeliveryForm";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import CouponSection from "@/components/checkout/CouponSection";

const Checkout = () => {
  const { cart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState<"delivery" | "payment" | "confirmation">("delivery");
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: {
      label: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
      phone: "",
    },
    method: "Dhaka City",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");
  const [bkashNumber, setBkashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDetails.address.addressLine1 || !deliveryDetails.address.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "bkash" && (!bkashNumber || !transactionId)) {
      toast({
        title: "Error",
        description: "Please provide bKash details",
        variant: "destructive",
      });
      return;
    }
    setStep("confirmation");
    toast({
      title: "Order Placed Successfully!",
      description: "We'll send you an email with your order details.",
    });
  };

  const handleApplyCoupon = (code: string) => {
    // In a real application, you would validate the coupon code here
    setAppliedCoupon(code);
    toast({
      title: "Coupon Applied",
      description: `Coupon code "${code}" has been applied to your order.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28 pb-16">
        <div className="luxury-container">
          <div className="max-w-6xl mx-auto">
            {/* Checkout Steps */}
            <div className="flex items-center justify-center mb-8 text-sm">
              <div className={`flex items-center ${step === "delivery" ? "text-luxury-gold" : "text-gray-500"}`}>
                <MapPin className="w-4 h-4 mr-1" />
                Delivery
              </div>
              <ChevronRight className="w-4 h-4 mx-4 text-gray-400" />
              <div className={`flex items-center ${step === "payment" ? "text-luxury-gold" : "text-gray-500"}`}>
                <CreditCard className="w-4 h-4 mr-1" />
                Payment
              </div>
              <ChevronRight className="w-4 h-4 mx-4 text-gray-400" />
              <div className={`flex items-center ${step === "confirmation" ? "text-luxury-gold" : "text-gray-500"}`}>
                <Truck className="w-4 h-4 mr-1" />
                Confirmation
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {step === "delivery" && (
                  <form onSubmit={handleDeliverySubmit} className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h2 className="text-xl font-serif mb-6">Delivery Details</h2>
                      <DeliveryForm
                        deliveryDetails={deliveryDetails}
                        setDeliveryDetails={setDeliveryDetails}
                      />
                    </div>
                    <Button type="submit">Continue to Payment</Button>
                  </form>
                )}

                {step === "payment" && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                      <h2 className="text-xl font-serif">Payment Method</h2>
                      <PaymentMethodSelector
                        selected={paymentMethod}
                        onSelect={setPaymentMethod}
                      />
                    </div>
                    <Button type="submit">Place Order</Button>
                  </form>
                )}

                {step === "confirmation" && (
                  <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-serif">Order Confirmed!</h2>
                      <p className="text-gray-600">
                        Thank you for your order. We'll send you an email with your order details.
                      </p>
                      <Button asChild className="mt-4">
                        <Link to="/products">Continue Shopping</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1 space-y-6">
                <CheckoutSummary cart={cart} deliveryMethod={deliveryDetails.method} />
                {step !== "confirmation" && (
                  <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <h3 className="font-medium">Have a coupon?</h3>
                    <CouponSection onApplyCoupon={handleApplyCoupon} />
                    {appliedCoupon && (
                      <p className="text-sm text-green-600">
                        Coupon "{appliedCoupon}" applied successfully!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;