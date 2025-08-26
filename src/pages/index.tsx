import React from "react";
import HeroSection from "@/components/common/HeroSection";
import FeaturedProducts from "@/components/common/FeaturedProducts";
import CategoryCarousel from "@/components/common/CategoryCarousel";
import AboutSection from "@/components/common/AboutSection";
import ClientLogos from "@/components/common/ClientLogos";
import StatsSection from "@/components/common/StatsSection";
import Footer from "@/components/common/Footer";

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Category Carousel Section */}
      <CategoryCarousel />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Client Logos Section */}
      <ClientLogos />
      
      {/* Stats Section */}
      <StatsSection />
    </div>
  );
};

export default Home;
