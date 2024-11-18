import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Editorial from "@/components/home/Editorial";
import Newsletter from "@/components/home/Newsletter";
import ProductShowcase from "@/components/home/ProductShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <ProductShowcase />
        <FeaturedProducts />
        <Editorial />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;