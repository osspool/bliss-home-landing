import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const limit = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, category, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(search && { search }),
      });
      const response = await fetch(`/api/products?${params}`);
      return response.json();
    },
  });

  const handleSearch = (value: string) => {
    setSearchParams(prev => {
      if (value) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-luxury-cream">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <ProductFilters />
          </aside>
          
          <main className="flex-1">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <ProductGrid products={data?.docs || []} isLoading={isLoading} />

            {data && (
              <div className="mt-8">
                <Pagination className="justify-center">
                  <PaginationContent>
                    {data.hasPrevPage && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                      </PaginationItem>
                    )}
                    {Array.from({ length: data.totalPages }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          isActive={page === i + 1}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {data.hasNextPage && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(page + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;