import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import OrderList from "@/components/orders/OrderList";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { fetchOrders, type Order } from "@/lib/api";

const Orders = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders
  });

  const handleCancelRequest = async (orderId: string) => {
    toast({
      title: "Cancel request submitted",
      description: "Your cancellation request is being processed.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  return (
    <div className="min-h-screen bg-luxury-cream">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-serif mb-8">My Orders</h1>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {orders && orders.length > 0 ? (
            <>
              <OrderList orders={currentOrders} onCancelRequest={handleCancelRequest} />
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => setCurrentPage(prev => prev - 1)} />
                        </PaginationItem>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => setCurrentPage(prev => prev + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">
              You haven't placed any orders yet.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;