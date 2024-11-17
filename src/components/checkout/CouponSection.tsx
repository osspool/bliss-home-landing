import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
}

const CouponSection = ({ onApplyCoupon }: CouponSectionProps) => {
  const [couponCode, setCouponCode] = useState("");
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }
    onApplyCoupon(couponCode);
    setCouponCode("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h3 className="font-medium">Have a coupon?</h3>
      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleApplyCoupon} variant="outline">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default CouponSection;