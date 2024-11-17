import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import OrderList from "@/components/orders/OrderList";
import { Card } from "@/components/ui/card";

// Mock data - replace with actual API call
const fetchOrders = async () => {
  return [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-02-20",
      total: 299.99,
      status: "delivered",
      items: [
        { id: "1", name: "Luxury Sofa", quantity: 1, price: 299.99 }
      ]
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-02-18",
      total: 149.99,
      status: "processing",
      items: [
        { id: "2", name: "Designer Lamp", quantity: 1, price: 149.99 }
      ]
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      date: "2024-02-15",
      total: 89.99,
      status: "cancel-requested",
      items: [
        { id: "3", name: "Decorative Vase", quantity: 1, price: 89.99 }
      ]
    }
  ];
};

const Orders = () => {
  const { toast } = useToast();
  
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders
  });

  const handleCancelRequest = async (orderId: string) => {
    // Mock API call - replace with actual API call
    toast({
      title: "Cancel request submitted",
      description: "Your cancellation request is being processed.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif mb-8">My Orders</h1>
      <Card className="p-6">
        {orders && orders.length > 0 ? (
          <OrderList orders={orders} onCancelRequest={handleCancelRequest} />
        ) : (
          <p className="text-center text-gray-500 py-8">
            You haven't placed any orders yet.
          </p>
        )}
      </Card>
    </div>
  );
};

export default Orders;