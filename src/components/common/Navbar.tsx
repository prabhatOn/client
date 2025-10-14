"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Globe, MessageSquare } from "lucide-react"
import productsData from "@/components/data/products-complete.json"
import EnquiryModal from "./EnquiryModal"

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
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
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
                  <Link href="/product" className="flex items-center text-white hover:text-blue-200 font-light transition-colors py-4">
                    Products & Services
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${showProductMenu ? 'rotate-180' : ''}`} />
                  </Link>
                  
                  {showProductMenu && (
                    <div className="absolute top-full b-10 left-0 w-[1000px] mt-0 z-50">
                      <div className="bg-[#11497b] shadow-2xl rounded-lg border border-blue-600 overflow-hidden">
                        <div className="flex">
                          {/* Categories Column */}
                          <div className="w-1/2 bg-[#11497b] border-r border-blue-600">
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-semibold text-sm">Product Categories</h3>
                                <Link 
                                  href="/product"
                                  className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                                >
                                  View All
                                </Link>
                              </div>
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
                                <div className="space-y-2 max-h-128 overflow-y-auto">
                                  {products[activeCategory as keyof typeof products].items?.slice(0, 6).map((product) => (
                                    <Link
                                      key={product.id}
                                      href={`/product/${product.slug}`}
                                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                                    >
                                      <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                        <Image
                                          src={product.image || '/assets/products/default.jpg'}
                                          alt={product.name}
                                          width={54}
                                          height={54}
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
                                    <MessageSquare className="w-6 h-6 text-gray-400" />
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

              {/* Enquiry Button */}
              <div className="hidden lg:block">
                <button 
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition-colors rounded-lg font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <>
        {/* Backdrop */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar */}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-[#11497b] z-50 transform transition-all duration-300 ease-in-out shadow-xl ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="text-white">
              <h2 className="text-xl font-medium">DP ENTERPRISES</h2>
              <p className="text-sm text-white/80">Industrial Solutions</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Sidebar Content */}
          <div className="px-6 py-8 space-y-2 overflow-y-auto h-full pb-20">
            <Link 
              href="/" 
              className="block text-white hover:text-blue-200 hover:bg-white/10 font-medium py-4 px-4 text-lg rounded-lg transition-all duration-200 -mx-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/product" 
              className="block text-white hover:text-blue-200 hover:bg-white/10 font-medium py-4 px-4 text-lg rounded-lg transition-all duration-200 -mx-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products & Services
            </Link>
            <Link 
              href="/about" 
              className="block text-white hover:text-blue-200 hover:bg-white/10 font-medium py-4 px-4 text-lg rounded-lg transition-all duration-200 -mx-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About us
            </Link>
            <Link 
              href="/contact" 
              className="block text-white hover:text-blue-200 hover:bg-white/10 font-medium py-4 px-4 text-lg rounded-lg transition-all duration-200 -mx-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact us
            </Link>
            
            {/* Enquiry Button */}
            <div className="pt-4">
              <button 
                onClick={() => {
                  setIsEnquiryModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 text-white hover:text-blue-200 hover:bg-white/10 py-4 px-4 text-lg w-full rounded-lg transition-all duration-200 -mx-4"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      </>
      
      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </>
  )
}
