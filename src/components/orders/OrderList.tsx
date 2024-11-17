import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, AlertCircle, XOctagon } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

interface OrderListProps {
  orders: Order[];
  onCancelRequest: (orderId: string) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return (
        <Badge className="bg-green-500">
          <CheckCircle className="w-4 h-4 mr-1" />
          Delivered
        </Badge>
      );
    case "processing":
      return (
        <Badge className="bg-blue-500">
          <AlertCircle className="w-4 h-4 mr-1" />
          Processing
        </Badge>
      );
    case "cancel-requested":
      return (
        <Badge className="bg-orange-500">
          <XOctagon className="w-4 h-4 mr-1" />
          Cancel Requested
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary">
          <AlertCircle className="w-4 h-4 mr-1" />
          {status}
        </Badge>
      );
  }
};

const OrderList = ({ orders, onCancelRequest }: OrderListProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {orders.map((order) => (
        <AccordionItem
          key={order.id}
          value={order.id}
          className="border rounded-lg p-4"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
              <div className="flex flex-col items-start gap-2">
                <span className="font-medium">{order.orderNumber}</span>
                <span className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  ${order.total.toFixed(2)}
                </span>
                {getStatusBadge(order.status)}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Order Items</h4>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {order.status !== "delivered" && order.status !== "cancel-requested" && (
                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => onCancelRequest(order.id)}
                  >
                    Request Cancellation
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default OrderList;