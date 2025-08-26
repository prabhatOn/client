"use client"

import React, { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"
import productsData from "@/components/data/products-complete.json"
import {
  HeroSection,
  InspirationalMessage,
  AboutContent,
  CompanyStats,
  CompanyInformation,
  ProductCategories,
  statsData,
  ProductsData
} from "@/components/about"

const products = (productsData as ProductsData).categories

export default function About() {
  const [counts, setCounts] = useState(statsData.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isAboutInView = useInView(aboutRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })
  const isInfoInView = useInView(infoRef, { once: true })
  const isProductsInView = useInView(productsRef, { once: true })

  // Counting animation for stats
  useEffect(() => {
    if (isStatsInView && !hasAnimated) {
      setHasAnimated(true)
      
      statsData.forEach((stat, index) => {
        let current = 0
        const target = stat.number
        const increment = target / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCounts(prev => {
              const newCounts = [...prev]
              newCounts[index] = target
              return newCounts
            })
            clearInterval(timer)
          } else {
            setCounts(prev => {
              const newCounts = [...prev]
              newCounts[index] = Math.floor(current)
              return newCounts
            })
          }
        }, 30)
      })
    }
  }, [isStatsInView, hasAnimated])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroSection isInView={isHeroInView} />
      </div>

      {/* Inspirational Message Section */}
      <InspirationalMessage />

      {/* About Content Section */}
      <div ref={aboutRef}>
        <AboutContent isInView={isAboutInView} />
      </div>

      {/* Company Stats Section */}
      <div ref={statsRef}>
        <CompanyStats isInView={isStatsInView} />
      </div>

      {/* Company Information Section */}
      <div ref={infoRef}>
        <CompanyInformation isInView={isInfoInView} />
      </div>

      {/* Product Categories Section */}
      <div ref={productsRef}>
        <ProductCategories products={products} isInView={isProductsInView} />
      </div>
    </div>
  )
}
