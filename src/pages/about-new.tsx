"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Target, 
  Factory, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Building, 
  Wrench, 
  ArrowRight,
  Star,
  Globe,
  Mail,
  Building2
} from "lucide-react"
import productsData from "@/components/data/products-complete.json"

// Type definitions
type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  overview?: string
  items: any[]
}

type ProductsData = {
  categories: {
    [key: string]: ProductCategory
  }
}

const products = (productsData as ProductsData).categories

// Stats data for counting animation with brand colors
const statsData = [
  {
    icon: Calendar,
    number: 17,
    suffix: "+",
    label: "Years Experience",
    description: "Serving industries since 2007"
  },
  {
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Satisfied Clients", 
    description: "Trusted across industries"
  },
  {
    icon: Star,
    number: 1000,
    suffix: "+",
    label: "Projects Completed",
    description: "Successfully delivered"
  },
  {
    icon: Globe,
    number: 3,
    suffix: "",
    label: "Service Areas",
    description: "MP, CG & Nagpur region"
  }
]

// Company achievements
const achievements = [
  {
    icon: Shield,
    title: "17+ Years Experience",
    description: "Proven track record in industrial pumping solutions"
  },
  {
    icon: CheckCircle,
    title: "500+ Satisfied Clients",
    description: "Trusted by leading companies across industries"
  },
  {
    icon: Award,
    title: "Milton Roy Authorized",
    description: "Official distributor of premium pumping equipment"
  },
  {
    icon: Target,
    title: "Quality Assurance",
    description: "ISO certified products and services"
  }
]

// Company info
const companyInfo = [
  {
    icon: Calendar,
    label: "Year of Establishment",
    value: "2007"
  },
  {
    icon: Factory,
    label: "Nature of Business",
    value: "Distributor / Channel Partner"
  },
  {
    icon: Users,
    label: "Number of Employees",
    value: "11 to 25 People"
  },
  {
    icon: Building,
    label: "Annual Turnover",
    value: "Rs. 50 Lakh - 1 Crore"
  },
  {
    icon: Wrench,
    label: "GST Number",
    value: "23AAGFD0047F1Z4"
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "Indore, Madhya Pradesh"
  }
]

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
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#11497b' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/about.webp"
            alt="DP Enterprises About"
            fill
            className="object-cover opacity-20"
          />
        </div>

        {/* Yellow decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transform translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transform -translate-x-1/2"></div>

        <div className="relative container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-100 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Trusted Since 2007
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
              About
              <span className="block text-yellow-400">DP Enterprises</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Leading supplier of Milton Roy Pumps and precision dosing solutions, 
              serving industries with excellence for over 17 years.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* About Content Section */}
      <section ref={aboutRef} className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold" style={{ color: '#11497b' }}>
                  Our <span className="text-yellow-500">Story</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Established in 2007, DP Enterprises has grown to become a trusted name in industrial pumping solutions. 
                  As an authorized distributor of Milton Roy pumps, we specialize in providing high-quality, precision 
                  dosing equipment to diverse industries across India.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to excellence and customer satisfaction has enabled us to build lasting relationships 
                  with over 500 satisfied clients. We take pride in our technical expertise and comprehensive service 
                  support that ensures optimal performance of our equipment.
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center p-4 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#11497b' }}>
                      <achievement.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1" style={{ color: '#11497b' }}>{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <Image
                  src="/assets/products/Proteus-Series-Metering-Pump.jpg"
                  alt="Milton Roy Precision Pumps"
                  width={500}
                  height={400}
                  className="w-full h-80 object-contain"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-100 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-40" style={{ backgroundColor: '#11497b20' }}></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 md:py-20 lg:py-24 bg-yellow-500">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#11497b' }}>
              Our <span className="text-white">Achievements</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#11497b' }}>
              Numbers that speak for our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" style={{ color: '#11497b' }} />
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#11497b' }}>
                  {counts[index]}{stat.suffix}
                </div>
                <div className="text-lg font-semibold mb-1" style={{ color: '#11497b' }}>
                  {stat.label}
                </div>
                <p className="text-sm" style={{ color: '#11497b' }}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section ref={infoRef} className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#11497b' }}>
              Company <span className="text-yellow-500">Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key details about our organization and capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#11497b' }}>
                    <info.icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1" style={{ color: '#11497b' }}>
                      {info.label}
                    </h3>
                    <p className="text-yellow-600 font-semibold text-sm">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section ref={productsRef} className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProductsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#11497b' }}>
              Our Product <span className="text-yellow-500">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of industrial pumping solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(products).slice(0, 6).map(([categoryId, category], index) => (
              <motion.div
                key={categoryId}
                initial={{ opacity: 0, y: 20 }}
                animate={isProductsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/category/${categoryId}`} className="group block h-full">
                  <div className="bg-white h-full flex flex-col hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] rounded-xl border border-gray-100 overflow-hidden">
                    <div className="relative h-48 bg-gray-50">
                      <Image
                        src={category.image || "/assets/products/one.jpg"}
                        alt={category.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-600 transition-colors" style={{ color: '#11497b' }}>
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm flex-1 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                        <span className="text-yellow-600 font-semibold text-sm group-hover:text-yellow-700 transition-colors">
                          {category.items.length} Products
                        </span>
                        <ArrowRight className="w-4 h-4 text-yellow-600 group-hover:text-yellow-700 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#11497b' }}>
        {/* Yellow decorative elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transform translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse transform -translate-x-1/2"></div>

        <div className="container mx-auto px-6 lg:px-8 relative text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready to Get <span className="text-yellow-400">Started?</span>
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Contact us today for expert consultation on your industrial pumping needs. 
                Our team is ready to provide tailored solutions for your specific requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-blue-900 font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 group"
              >
                Contact Us Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/product" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
