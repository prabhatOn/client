"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Package
} from "lucide-react"

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  video?: string
  cta: {
    primary: { text: string; href: string }
    secondary: { text: string; href: string }
  }
  stats: Array<{
    value: string
    label: string
    icon: React.ElementType
  }>
  theme: {
    gradient: string
    accent: string
  }
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Precision Engineering",
    subtitle: "World-Class Industrial Pumping Solutions",
    description: "Experience unmatched reliability with Milton Roy's advanced dosing pumps. Engineered for precision, built for performance, trusted by industries worldwide.",
    image: "/assets/products/m-Roy-Series-A-B-H-P-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg",
    cta: {
      primary: { text: "Explore Products", href: "/product" },
      secondary: { text: "Watch Demo", href: "#demo" }
    },
    stats: [
      { value: "99.9%", label: "Accuracy", icon: Zap },
      { value: "500+", label: "Installations", icon: Package },
      { value: "17+", label: "Years Experience", icon: Award },
      { value: "24/7", label: "Support", icon: Shield }
    ],
    theme: {
      gradient: "from-blue-600 via-blue-700 to-indigo-800",
      accent: "text-blue-400"
    }
  },
  {
    id: 2,
    title: "Advanced Technology",
    subtitle: "Next-Generation Hydraulic Solutions",
    description: "Discover our cutting-edge hydraulic dosing pumps designed for the most demanding industrial applications. Superior performance, uncompromising quality.",
    image: "/assets/products/B105-Series-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg",
    cta: {
      primary: { text: "View Hydraulic Series", href: "/category/hydraulic-actuated-pumps" },
      secondary: { text: "Technical Specs", href: "/contact" }
    },
    stats: [
      { value: "40+", label: "Bar Pressure", icon: TrendingUp },
      { value: "200+", label: "Process Plants", icon: Package },
      { value: "Premium", label: "Performance", icon: Award },
      { value: "High", label: "Efficiency", icon: Zap }
    ],
    theme: {
      gradient: "from-emerald-600 via-teal-700 to-cyan-800",
      accent: "text-emerald-400"
    }
  },
  {
    id: 3,
    title: "Smart Innovation",
    subtitle: "Intelligent Electro-Magnetic Systems",
    description: "Revolutionary electro-magnetic dosing technology that adapts to your process requirements. Smart, efficient, and incredibly precise.",
    image: "/assets/products/V-A-Series-Electro-Magnetically-Actuated-Diaphragm-Dosing-Pump.jpg",
    cta: {
      primary: { text: "Discover Electro Series", href: "/category/electro-actuated-pumps" },
      secondary: { text: "Get Quote", href: "/contact" }
    },
    stats: [
      { value: "±1%", label: "Dosing Accuracy", icon: Zap },
      { value: "Smart", label: "Controls", icon: Award },
      { value: "Energy", label: "Efficient", icon: TrendingUp },
      { value: "IoT", label: "Ready", icon: Shield }
    ],
    theme: {
      gradient: "from-purple-600 via-violet-700 to-indigo-800",
      accent: "text-purple-400"
    }
  }
]

const ModernHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }, [currentSlide])

  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [nextSlide, isPlaying])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const current = heroSlides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Video/Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Overlay Gradients */}
              <div className={`absolute inset-0 bg-gradient-to-r ${current.theme.gradient} opacity-80`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent)]" />
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.1)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 50, x: -30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              >
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-semibold">Milton Roy Authorized Partner</span>
              </motion.div>

              {/* Title */}
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg font-medium text-white/80 tracking-wide uppercase"
                >
                  {current.subtitle}
                </motion.h2>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    {current.title}
                  </span>
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl text-white/90 leading-relaxed max-w-2xl"
              >
                {current.description}
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {current.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="mb-3 mx-auto w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <stat.icon className={`w-6 h-6 ${current.theme.accent}`} />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70 uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href={current.cta.primary.href}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {current.cta.primary.text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <button
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-md transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {current.cta.secondary.text}
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Product Showcase */}
            <motion.div
              key={`showcase-${currentSlide}`}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              {/* Main Product Image */}
              <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-8">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-contain p-4"
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Award className="w-8 h-8 text-yellow-900" />
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Shield className="w-6 h-6 text-emerald-900" />
                </motion.div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Play/Pause Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        {isPlaying ? (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-1.5 h-4 bg-white rounded-sm mr-1" />
            <div className="w-1.5 h-4 bg-white rounded-sm" />
          </div>
        ) : (
          <Play className="w-6 h-6 ml-0.5" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>
    </section>
  )
}

export default ModernHeroSlider
