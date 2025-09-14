"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { 
  Phone,
  Mail,
  Package
} from "lucide-react"
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
  tradeInfo?: Record<string, any>
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

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query

  const [productData, setProductData] = useState<ProductItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const [formData, setFormData] = useState({
    requirements: "",
    email: "",
    mobile: "",
    company: "",
    quantity: ""
  })

  useEffect(() => {
    if (slug) {
      setIsLoading(true)
      // Simulate network delay for better UX
      const timer = setTimeout(() => {
        const foundProduct = Object.values(products)
          .flatMap((category: ProductCategory) => category.items)
          .find((item: ProductItem) => item.id === slug)

        if (foundProduct) {
          setProductData(foundProduct)
        } else {
          router.push("/404")
        }
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [slug, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous error
    setErrorMessage('')
    
    // Validate required fields
    if (!formData.requirements || !formData.email || !formData.mobile) {
      setErrorMessage('Please fill in all required fields (Email, Mobile, and Requirements).')
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName: productData?.name || 'Unknown Product',
          enquiryType: 'Product Enquiry'
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        // Reset form
        setFormData({
          requirements: "",
          email: "",
          mobile: "",
          company: "",
          quantity: ""
        })
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit enquiry')
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      setErrorMessage(error instanceof Error ? error.message : 'There was an error submitting your enquiry. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleCallNow = () => {
    window.open('tel:+919876543210', '_self')
  }

  const handleSendInquiry = () => {
    // Scroll to the inquiry form
    const inquiryForm = document.getElementById('inquiry-form')
    if (inquiryForm) {
      inquiryForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isLoading || !productData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Product Page Style Background */}
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
          {/* Header */}
          <div className="mb-12">
            <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
            <h3 className="text-sm font-bold tracking-wide uppercase mb-6 text-yellow-500">
              PRECISION ENGINEERING
            </h3>
            <h1 className="text-3xl lg:text-5xl font-normal text-white leading-tight mb-8">
              {productData.name}
            </h1>
            {productData.description && (
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
                {productData.description}
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCallNow}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
            
            <button
              onClick={handleSendInquiry}
              className="border border-gray-400 text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Send Inquiry</span>
            </button>
          </div>
        </div>
      </section>

      <main>
        {/* Product Overview Section - White Background */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Product Image and Features */}
              <div className="order-2 lg:order-1 space-y-8">
                <div className="bg-white rounded-lg p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-md h-80">
                    <Image
                      src={productData.image || "/placeholder.svg"}
                      alt={productData.name}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Key Features */}
                {productData.features && productData.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-normal text-gray-800 mb-6">Key Features</h4>
                    <div className="space-y-3">
                      {productData.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details and Applications */}
              <div className="order-1 lg:order-2 space-y-8">
                <div className="w-16 h-1" style={{ backgroundColor: '#11497b' }}></div>
                <h3 className="text-sm font-bold tracking-wide uppercase" style={{ color: '#11497b' }}>
                  PRODUCT DETAILS
                </h3>

                {/* Description */}
                {productData.description && (
                  <div className="border-b border-gray-100 pb-6">
                    <p className="text-sm text-gray-500 mb-2">Description</p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {productData.description}
                    </p>
                  </div>
                )}

                {/* Key Specifications */}
                <div className="space-y-4">
                  <h4 className="text-lg font-normal text-gray-800">Specifications</h4>
                  <div className="space-y-0">
                    {productData.specifications ? (
                      Object.entries(productData.specifications).slice(0, 6).map(([key, value], index) => (
                        <div key={key} className="border-b border-gray-100 py-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg px-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span className="text-gray-800 font-medium">{value}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">Specifications will be provided upon inquiry.</p>
                    )}
                  </div>
                </div>

                {/* Applications */}
                {productData.applications && productData.applications.length > 0 && (
                  <div>
                    <h4 className="text-lg font-normal text-gray-800 mb-6">Applications</h4>
                    <div className="space-y-3">
                      {productData.applications.map((application, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 leading-relaxed">{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications Section - Yellow Background */}
        <section className="py-12 md:py-16 bg-yellow-500">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <div className="w-16 h-1 bg-white mb-6"></div>
                <h3 className="text-2xl lg:text-3xl font-normal text-white">
                  TECHNICAL SPECIFICATIONS
                </h3>
              </div>

              {productData.specifications && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(productData.specifications).map(([key, value], index) => (
                    <div key={key} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-5 hover:bg-opacity-20 transition-all duration-200 border border-white border-opacity-20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Package className="w-5 h-5 text-white flex-shrink-0" />
                          <h4 className="text-base font-medium text-white leading-relaxed">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h4>
                        </div>
                        <div className="text-base font-normal text-white ml-4 text-right">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Inquiry Form Section - White Background */}
        <section id="inquiry-form" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-1 bg-yellow-500 mb-6 mx-auto"></div>
                <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4">
                  REQUEST PRODUCT INFORMATION
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Get detailed specifications, pricing, and technical support for your industrial pumping requirements.
                </p>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Enquiry Submitted Successfully!
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Thank you for your interest in {productData?.name}. We have received your enquiry and our technical team will contact you within 24 hours with detailed specifications and pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Required Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10 units"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Requirements
                  </label>
                  <textarea
                    id="requirements"
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe your specific requirements, application details, or any questions you have about this product..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
                      isSending 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Inquiry'
                    )}
                  </button>
                  
                  <a
                    href={`tel:+919876543210`}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
                  >
                    Call Directly
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}