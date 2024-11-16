import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockProducts } from "@/data/mockProducts";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const limit = 8;

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || product.category._id === category;
    const matchesPrice = product.basePrice >= minPrice && 
                        (maxPrice === Infinity || product.basePrice <= maxPrice);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredProducts.length / limit);

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
    <div className="min-h-screen flex flex-col bg-luxury-cream">
      <Navbar />
      <div className="container px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Our Collection</h1>
          <p className="text-muted-foreground">
            Discover our curated selection of luxury furniture and accessories
          </p>
        </div>

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

            <ProductGrid products={paginatedProducts} isLoading={false} />

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination className="justify-center">
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                      </PaginationItem>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          isActive={page === i + 1}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {page < totalPages && (
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
      <Footer />
    </div>
  );
};

export default Products;