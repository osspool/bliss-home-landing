// Mock function to simulate fetching orders from an API
export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const fetchOrders = async (): Promise<Order[]> => {
  // Mock data - in a real app, this would be an API call
  return [
    {
      id: "1",
      orderNumber: "ORD-001",
      date: "2024-02-20",
      status: "delivered",
      total: 299.99,
      items: [
        {
          id: "item1",
          name: "Luxury Sofa",
          quantity: 1,
          price: 299.99
        }
      ]
    },
    // Add more mock orders as needed
  ];
};