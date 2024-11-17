import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeliveryMethodSelector from "./DeliveryMethodSelector";

interface DeliveryFormProps {
  deliveryDetails: {
    address: {
      label: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    method: string;
  };
  setDeliveryDetails: (details: any) => void;
}

const DeliveryForm = ({ deliveryDetails, setDeliveryDetails }: DeliveryFormProps) => {
  const handleAddressChange = (field: string, value: string) => {
    setDeliveryDetails({
      ...deliveryDetails,
      address: {
        ...deliveryDetails.address,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={deliveryDetails.address.phone}
            onChange={(e) => handleAddressChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLine1">Address Line 1 *</Label>
          <Input
            id="addressLine1"
            value={deliveryDetails.address.addressLine1}
            onChange={(e) => handleAddressChange("addressLine1", e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={deliveryDetails.address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            value={deliveryDetails.address.postalCode}
            onChange={(e) => handleAddressChange("postalCode", e.target.value)}
            placeholder="Enter postal code"
            required
          />
        </div>
      </div>
      
      <DeliveryMethodSelector
        selected={deliveryDetails.method}
        onSelect={(method) => setDeliveryDetails({ ...deliveryDetails, method })}
      />
    </div>
  );
};

export default DeliveryForm;