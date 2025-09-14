"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Grid, List, X, Star, ArrowUpDown } from "lucide-react"
import ProductCard from "@/components/product/ProductCard"
import productsData from "@/components/data/products-complete.json"

// Type definitions for the complete product data
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  price?: {
    min: number
    max: number
    currency: string
    unit: string
  }
  specifications?: Record<string, any>
  features?: string[]
  applications?: string[]
}

type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  overview?: string
  advantages?: string[]
  applications?: string[]
  items: ProductItem[]
}

const products = productsData.categories as Record<string, ProductCategory>

export default function MainProduct() {  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([])
  const [allProducts, setAllProducts] = useState<ProductItem[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const allProductItems = Object.values(products).flatMap((category: ProductCategory) => 
      category.items.map(item => ({ ...item, categoryId: category.id, categoryName: category.name }))
    )
    setAllProducts(allProductItems)
    setFilteredProducts(allProductItems)
  }, [])
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      let filtered = allProducts.filter(product => {
        const matchesSearch = searchTerm === "" || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
        
        const matchesCategory = selectedCategory === "all" || 
          (product as any).categoryId === selectedCategory
        
        return matchesSearch && matchesCategory
      })

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue = a[sortBy as keyof ProductItem] || ""
        let bValue = b[sortBy as keyof ProductItem] || ""
        
        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue)
          return sortOrder === "asc" ? comparison : -comparison
        }
        
        return 0
      })

      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, sortBy, sortOrder, allProducts])
  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Professional Hero Section */}
      <section className="relative pt-10 bg-gradient-to-r from-blue-800 to-blue-900 text-white overflow-hidden" style={{
        background: `linear-gradient(135deg, #0f3460 0%, #1a4a75 25%, #204d7a 50%, #0f3460 100%)`,
      }}>
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.02) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.02) 75%)
              `,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
            }}
          />
        </div>

        {/* Minimal geometric elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 right-4 sm:right-20 w-16 h-16 sm:w-32 sm:h-32 border border-white border-opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-12 h-12 sm:w-24 sm:h-24 border border-yellow-400 border-opacity-20 transform rotate-45"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content - Main Message */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-6 sm:mb-8">
                Precision is what makes the 
                <span className="block">complex</span>
                <span className="text-yellow-400 font-medium">reliable</span>
              </h1>
            </div>

            {/* Right Content - Supporting Text */}
            <div className="lg:pl-8">
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6 sm:mb-8">
                Industrial excellence demands more than just equipment. It requires 
                precision-engineered pumping solutions, proven dosing technologies, 
                and trusted partnerships. It takes the reliability of Milton Roy 
                systems combined with decades of expertise to deliver consistent 
                results in the most demanding industrial environments.
              </p>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                When precision meets purpose, you don't just maintain operations—you 
                optimize entire industrial processes for maximum efficiency.
              </p>

              {/* Company Badge */}
              <div className="text-white">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2 text-yellow-400" />
                <span className="font-medium text-sm sm:text-base">DP Enterprises - Milton Roy Authorized Partner</span>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white border-opacity-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-light text-yellow-400 mb-1 sm:mb-2">{Object.keys(products).length}+</div>
                <div className="text-blue-200 text-sm sm:text-base">Product Categories</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-light text-yellow-400 mb-1 sm:mb-2">{allProducts.length}+</div>
                <div className="text-blue-200 text-sm sm:text-base">Industrial Solutions</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-light text-yellow-400 mb-1 sm:mb-2">17+</div>
                <div className="text-blue-200 text-sm sm:text-base">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top Row - Search Bar */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 sm:pr-4 py-2 sm:py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white text-sm sm:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            {/* Bottom Row - Filter and View Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              {/* Left Side - Filters */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 sm:px-4 py-2 pr-7 sm:pr-8 text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-[120px] sm:min-w-[150px]"
                  >
                    <option value="all">All Categories</option>
                    {Object.values(products).map((category: ProductCategory) => (
                      <option key={category.id} value={category.id}>
                        {category.name.replace('Milton Roy ', '')}
                      </option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-neutral-400 pointer-events-none" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-')
                      setSortBy(field)
                      setSortOrder(order as "asc" | "desc")
                    }}
                    className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 sm:px-4 py-2 pr-7 sm:pr-8 text-xs sm:text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="id-asc">Newest First</option>
                    <option value="id-desc">Oldest First</option>
                  </select>
                  <ArrowUpDown className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-neutral-400 pointer-events-none" />
                </div>

                {/* Clear Filters Button */}
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-neutral-600 hover:text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Clear Filters</span>
                    <span className="sm:hidden">Clear</span>
                  </button>
                )}
              </div>

              {/* Right Side - Results Count and View Mode */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Results Count */}
                <span className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">
                  {filteredProducts.length} products
                </span>

                {/* View Mode Toggle */}
                <div className="flex border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 sm:p-2 transition-colors ${
                      viewMode === "grid" 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 sm:p-2 transition-colors ${
                      viewMode === "list" 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center gap-3 text-primary-600">
              <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-primary-600"></div>
              <span className="font-medium text-sm sm:text-base">Loading products...</span>
            </div>
          </motion.div>
        )}

        {/* Products Grid/List */}
        {!isLoading && (
          <motion.div
            key={`${viewMode}-${filteredProducts.length}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-3 sm:space-y-4"
            }
          >            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard 
                  product={{
                    id: product.id,
                    name: product.name,
                    description: product.description || `High-quality ${product.name.toLowerCase()} for industrial applications`,
                    image: product.image,
                    price: product.price ? {
                      min: product.price.min,
                      max: product.price.max,
                      currency: product.price.currency
                    } : {
                      min: 25000,
                      max: 75000,
                      currency: "INR"
                    },
                    specifications: product.specifications ? Object.entries(product.specifications).map(([name, value]) => ({
                      name,
                      value: value as string | number
                    })) : [],
                    features: product.features || [],
                    applications: product.applications || []
                  }} 
                  index={index} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="max-w-md mx-auto px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-secondary-900 mb-2 sm:mb-3">
                No products found
              </h3>              <p className="text-secondary-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Try adjusting your search terms to find what you're looking for.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

