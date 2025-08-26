"use client"

import React from "react"
import { motion } from "framer-motion"
import ProductCarousel from "./ProductCarousel"
import { ProductsData } from "./types"

interface ProductCategoriesProps {
  products: ProductsData['categories']
  isInView: boolean
}

export default function ProductCategories({ products, isInView }: ProductCategoriesProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
            Our Solutions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#11497b' }}>
            Product <span className="text-yellow-500">Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of industrial pumping solutions designed to meet 
            the most demanding applications across various industries
          </p>
        </motion.div>

        <ProductCarousel products={products} isInView={isInView} />
      </div>
    </section>
  )
}
