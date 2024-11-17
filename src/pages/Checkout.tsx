import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, MapPin, Truck, CreditCard } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import DeliveryMethodSelector from "@/components/checkout/DeliveryMethodSelector";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";

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
              <div className="lg:col-span-2 space-y-8">
                {step === "delivery" && (
                  <form onSubmit={handleDeliverySubmit} className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                      <h2 className="text-xl font-serif">Delivery Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={deliveryDetails.address.phone}
                            onChange={(e) => setDeliveryDetails({
                              ...deliveryDetails,
                              address: { ...deliveryDetails.address, phone: e.target.value }
                            })}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="addressLine1">Address Line 1 *</Label>
                          <Input
                            id="addressLine1"
                            value={deliveryDetails.address.addressLine1}
                            onChange={(e) => setDeliveryDetails({
                              ...deliveryDetails,
                              address: { ...deliveryDetails.address, addressLine1: e.target.value }
                            })}
                            placeholder="Enter your address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={deliveryDetails.address.city}
                            onChange={(e) => setDeliveryDetails({
                              ...deliveryDetails,
                              address: { ...deliveryDetails.address, city: e.target.value }
                            })}
                            placeholder="Enter your city"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={deliveryDetails.address.postalCode}
                            onChange={(e) => setDeliveryDetails({
                              ...deliveryDetails,
                              address: { ...deliveryDetails.address, postalCode: e.target.value }
                            })}
                            placeholder="Enter postal code"
                          />
                        </div>
                      </div>
                      
                      <DeliveryMethodSelector
                        selected={deliveryDetails.method}
                        onSelect={(method) => setDeliveryDetails({ ...deliveryDetails, method })}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto">
                      Continue to Payment
                    </Button>
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

                      {paymentMethod === "bkash" && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="bkashNumber">bKash Number</Label>
                            <Input
                              id="bkashNumber"
                              value={bkashNumber}
                              onChange={(e) => setBkashNumber(e.target.value)}
                              placeholder="Enter your bKash number"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="transactionId">Transaction ID</Label>
                            <Input
                              id="transactionId"
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              placeholder="Enter transaction ID"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      Place Order
                    </Button>
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
              <div className="lg:col-span-1">
                <CheckoutSummary cart={cart} deliveryMethod={deliveryDetails.method} />
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