"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react"
import productsData from "@/components/data/products-complete.json"

// Type definitions for the complete product data
type ProductCategories = keyof typeof productsData.categories
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description: string
  items?: any[]
}
type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  items: ProductItem[]
}

const products = productsData.categories

export default function Navbar() {
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }
      
      // Change background when scrolled
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowProductMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Blue Header - Grundfos Style with Scroll Behavior */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? 'bg-[#11497b] shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="text-white">
                  <h1 className="text-2xl text-white font-medium">DP ENTERPRISES</h1>
                  <p className="text-sm text-white opacity-90">Industrial Solutions</p>
                </div>
              </div>
            </Link>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Business Details */}
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-white/90">GST: 23AAGFD3172Q1Z7</span>
                <span className="text-white/90">|</span>
                <span className="text-white/90">+91-9425902891</span>
                <span className="text-white/90">|</span>
                <span className="text-white/90">dpenterprises2007@gmail.com</span>
              </div>
              
              {/* Country/Language Selector */}
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4" />
                <span>India - EN</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* HR Divider */}
        <hr className="border-[#ffffff4d] border-t mx-20" />

        {/* Navigation Bar */}
        <div className={`${isScrolled ? 'bg-[#11497b]' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Main Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                
                <div 
                  className="relative group"
                  onMouseEnter={() => setShowProductMenu(true)}
                  onMouseLeave={() => setShowProductMenu(false)}
                >
                  <button className="flex items-center text-white hover:text-blue-200 font-light transition-colors py-4">
                    Products & Services
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${showProductMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showProductMenu && (
                    <div className="absolute top-full left-0 w-[800px] mt-0 z-50">
                      <div className="bg-[#11497b] shadow-2xl rounded-lg border border-blue-600 overflow-hidden">
                        <div className="flex">
                          {/* Categories Column */}
                          <div className="w-1/2 bg-[#11497b] border-r border-blue-600">
                            <div className="p-4">
                              <h3 className="text-white font-semibold text-sm mb-3">Product Categories</h3>
                              <div className="space-y-1">
                                {Object.entries(products).map(([key, category]) => (
                                  <div
                                    key={key}
                                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                      activeCategory === key 
                                        ? 'bg-white/20 text-white' 
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                                    onMouseEnter={() => setActiveCategory(key)}
                                  >
                                    <div className="flex-1">
                                      <h4 className="font-medium text-white text-sm">{category.name}</h4>
                                      <p className="text-xs text-white/80 opacity-70">{category.items?.length || 0} products</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Products Column */}
                          <div className="w-1/2 bg-white">
                            {activeCategory && products[activeCategory as keyof typeof products] ? (
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-[#11497b] font-semibold text-sm">
                                    {products[activeCategory as keyof typeof products].name}
                                  </h3>
                                </div>
                                <div className="space-y-2 max-h-80 overflow-y-auto">
                                  {products[activeCategory as keyof typeof products].items?.slice(0, 6).map((product) => (
                                    <Link
                                      key={product.id}
                                      href={`/product/${product.slug}`}
                                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                                    >
                                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                        <Image
                                          src={product.image || '/assets/products/default.jpg'}
                                          alt={product.name}
                                          width={24}
                                          height={24}
                                          className="object-cover rounded"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 text-xs group-hover:text-[#11497b] transition-colors line-clamp-2">
                                          {product.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                          {product.description}
                                        </p>
                                      </div>
                                    </Link>
                                  )) || []}
                                </div>
                                
                                {/* Bottom CTA */}
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                  <Link
                                    href={`/category/${activeCategory}`}
                                    className="flex items-center justify-center w-full py-2 bg-[#11497b] text-white rounded-lg text-sm font-medium hover:bg-[#0f3a5f] transition-colors group"
                                  >
                                    <span>View All {products[activeCategory as keyof typeof products].items?.length || 0} Products</span>
                                    <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 h-80 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <Search className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <p className="text-sm">Hover over a category to see products</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                 <Link href="/" className="text-white hover:text-blue-200 font-light transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-blue-200 font-light transition-colors">
                  About us
                </Link>

                <Link href="/contact" className="text-white hover:text-blue-200 font-light transition-colors">
                  Contact us
                </Link>
              </div>

              {/* Search Icon */}
              <div className="hidden lg:block">
                <button className="p-2 text-white hover:text-blue-200 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t border-white/10 ${isScrolled ? 'bg-[#11497b]' : 'bg-[#11497b]/90'}`}>
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-white hover:text-blue-200 font-medium py-2">
                Home
              </Link>
              <Link href="/product" className="block text-white hover:text-blue-200 font-medium py-2">
                Products & Services
              </Link>
              <Link href="/about" className="block text-white hover:text-blue-200 font-medium py-2">
                About us
              </Link>
              <Link href="/contact" className="block text-white hover:text-blue-200 font-medium py-2">
                Contact us
              </Link>
              <div className="pt-2 border-t border-white/10">
                <button className="flex items-center space-x-2 text-white hover:text-blue-200 py-2">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
