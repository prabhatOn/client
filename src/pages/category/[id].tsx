"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ChevronRight,
  ArrowLeft,
  Share2,
  Shield,
  Award,
  TrendingUp,
  Star,
  Package,
  CheckCircle
} from "lucide-react"
import productsData from "@/components/data/products-complete.json"
import ProductCard from "@/components/product/ProductCard"

// Type definitions for the complete product data
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description: string // Make required to match ProductCard interface
  price?: {
    min: number
    max: number
    currency: string
    unit: string
  }
  specifications?: Record<string, any>
  features?: string[]
  applications?: string[]
  items?: any[]
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

export default function CategoryProductPage() {
  const params = useParams()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  useEffect(() => {
    if (params?.id) {
      setIsLoading(true)
      // Simulate network delay for better UX
      const timer = setTimeout(() => {
        const categoryId = params.id as string
        const foundCategory = products[categoryId]
        if (foundCategory) {
          setCategory(foundCategory)
        }
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [params?.id])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: category?.name,
        text: category?.description,
        url: window.location.href,
      })
    }
  }

  if (isLoading || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading category...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Matching Product Page Style */}
      <section className="relative pt-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white overflow-hidden" style={{
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

        {/* Static Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Small outlined boxes */}
          <div className="absolute top-32 left-16 w-8 h-8 border border-white opacity-15"></div>
          <div className="absolute top-24 right-24 w-6 h-6 border border-yellow-500 opacity-20 rotate-45"></div>
          <div className="absolute bottom-40 left-32 w-10 h-10 border border-white opacity-10 rotate-12"></div>
          <div className="absolute bottom-32 right-16 w-7 h-7 border border-yellow-500 opacity-25"></div>
          
          {/* Small outlined circles */}
          <div className="absolute top-48 left-1/4 w-6 h-6 border border-white opacity-20 rounded-full"></div>
          <div className="absolute top-40 right-1/3 w-8 h-8 border border-yellow-500 opacity-15 rounded-full"></div>
          <div className="absolute bottom-48 left-2/3 w-5 h-5 border border-white opacity-25 rounded-full"></div>
          <div className="absolute bottom-56 right-1/4 w-9 h-9 border border-yellow-500 opacity-12 rounded-full"></div>
          
          {/* Additional scattered elements */}
          <div className="absolute top-1/3 left-12 w-4 h-4 border border-white opacity-18 rotate-45"></div>
          <div className="absolute top-2/3 right-12 w-6 h-6 border border-yellow-500 opacity-22 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 py-24 md:py-28 relative z-10">
          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              href="/product"
              className="flex items-center text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Products</span>
            </Link>
            
            <motion.button
              onClick={handleShare}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center text-sm text-white/70 mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/product" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">{category.name}</span>
          </motion.nav>

          {/* Header */}
          <div className="mb-12">
            <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
            <h3 className="text-sm font-bold tracking-wide uppercase mb-6 text-yellow-500">
              PRODUCT CATEGORY
            </h3>
            <h1 className="text-3xl lg:text-5xl font-normal text-white leading-tight mb-8">
              {category.name}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
              {category.description}
            </p>
          </div>

          {/* Category Stats */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center space-x-3">
              <Package className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-medium">{category.items.length} Products Available</span>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center space-x-3">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-medium">Premium Quality</span>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-medium">Certified Products</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* Category Overview Section - White Background */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Category Visual */}
              <motion.div 
                className="order-2 lg:order-1"
                variants={itemVariants}
              >
                {/* Category Image */}
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center mb-8">
                  <div className="relative w-full h-80 max-w-md">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Category Details */}
              <div className="order-1 lg:order-2 space-y-8">
                <div className="w-16 h-1" style={{ backgroundColor: '#11497b' }}></div>
                <h3 className="text-sm font-bold tracking-wide uppercase" style={{ color: '#11497b' }}>
                  CATEGORY OVERVIEW
                </h3>

                <motion.h2 
                  className="text-3xl lg:text-4xl font-normal text-gray-800 mb-6"
                  variants={itemVariants}
                >
                  About {category.name}
                </motion.h2>
                
                <motion.div 
                  className="space-y-6"
                  variants={itemVariants}
                >
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {category.overview || category.description}
                  </p>

                  {/* Category Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="text-2xl font-bold text-gray-800 mb-2">{category.items.length}</div>
                      <div className="text-sm text-gray-600">Products Available</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="text-2xl font-bold text-gray-800 mb-2">17+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="text-2xl font-bold text-gray-800 mb-2">100%</div>
                      <div className="text-sm text-gray-600">Quality Assured</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* Key Advantages & Applications Section - Yellow Background */}
        <section className="py-12 md:py-16 bg-yellow-500">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <div className="w-16 h-1 bg-white mb-6"></div>
                <h3 className="text-2xl lg:text-3xl font-normal text-white">
                  KEY ADVANTAGES & APPLICATIONS
                </h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Key Advantages */}
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                  <h4 className="text-xl font-medium text-white mb-6 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3" />
                    Key Advantages
                  </h4>
                  {category.advantages && category.advantages.length > 0 ? (
                    <div className="space-y-4">
                      {category.advantages.map((advantage, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-white/90 leading-relaxed">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 leading-relaxed">High performance and reliability</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 leading-relaxed">Industry-leading efficiency</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 leading-relaxed">Professional installation and maintenance support</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Applications */}
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                  <h4 className="text-xl font-medium text-white mb-6 flex items-center">
                    <Package className="w-6 h-6 mr-3" />
                    Applications
                  </h4>
                  {category.applications && category.applications.length > 0 ? (
                    <div className="space-y-4">
                      {category.applications.map((application, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-white/90 leading-relaxed">{application}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 leading-relaxed">Industrial processing applications</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 leading-relaxed">Water treatment systems</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/90 leading-relaxed">Chemical processing facilities</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid Section - White Background */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <div className="w-16 h-1 bg-yellow-500 mb-6 mx-auto"></div>
                <h3 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4">
                  PRODUCTS IN {category.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore our comprehensive range of high-quality {category.name.toLowerCase()}
                </p>
              </div>

              <motion.div 
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.items.map((product: any, index: number) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className="relative h-40 mb-4 bg-white rounded-lg p-2">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <h4 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium group"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
