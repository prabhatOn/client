"use client"

import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { ProductsData } from "./types"

interface ProductCarouselProps {
  products: ProductsData['categories']
  isInView: boolean
}

export default function ProductCarousel({ products, isInView }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps'
  })
  
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <span className="text-gray-600 font-medium">Scroll to explore</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <button
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              canScrollPrev 
                ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white' 
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              canScrollNext 
                ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white' 
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {Object.entries(products).map(([categoryId, category], index) => (
            <motion.div
              key={categoryId}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex-none w-[380px]"
            >
              <Link href={`/category/${categoryId}`} className="group block h-full">
                <div className="bg-white h-full flex flex-col hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 rounded-2xl border border-gray-100 overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-64 bg-white overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={category.image || "/assets/products/one.jpg"}
                      alt={category.name}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {category.items.length} Products
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-1 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-600 transition-colors duration-300" style={{ color: '#11497b' }}>
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 flex-1 leading-relaxed line-clamp-3">
                      {category.description}
                    </p>
                    
                    {/* CTA Section */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                      <span className="text-yellow-600 font-semibold group-hover:text-yellow-700 transition-colors">
                        Explore Range
                      </span>
                      <div className="flex items-center text-yellow-600 group-hover:text-yellow-700 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
