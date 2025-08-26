"use client"

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import productsData from "@/components/data/products-complete.json";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

const CategoryCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Extract categories from the products data
  const categories: Category[] = Object.values(productsData.categories).map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    itemCount: category.items?.length || 0
  }));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 256; // Width of one card plus gap (reduced from 320)
      const newScrollLeft = scrollRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="h-fit py-10 bg-white flex flex-col justify-center">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our{" "}
              <span className="text-yellow-500">
                Product Categories
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover our comprehensive range of industrial pumping solutions across different categories
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-50 group"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-brand-500" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-50 group"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-brand-500" />
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group flex-none w-64"
              >
                <div className="bg-white rounded-2xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-brand-50 h-[70vh]">
                  {/* Category Image */}
                  <div className="relative h-1/2 overflow-hidden bg-white">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      sizes="256px"
                    />
                    
                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-500 text-white shadow-lg">
                        {category.itemCount} Products
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Line */}
                  <hr className="border-brand-50" />

                  {/* Category Info */}
                  <div className="p-4 h-1/2 flex flex-col bg-white justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-brand-500 font-semibold text-sm group-hover:text-brand-600 transition-colors duration-200">
                        View Products
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-500 group-hover:text-brand-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-50 group"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-brand-500" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-brand-50 group"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-brand-500" />
            </button>
          </div>
        </div>

        {/* View All Categories CTA */}
        <div className="text-center mt-8">
          <Link
            href="/product"
            className="inline-flex items-center px-8 py-3 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
