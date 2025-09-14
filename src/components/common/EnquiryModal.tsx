"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import productsData from "@/components/data/products-complete.json"

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

const products = productsData.categories

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    productCategory: "",
    product: "",
    requirements: ""
  })

  const [availableProducts, setAvailableProducts] = useState<any[]>([])
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Handle category change to update available products
  useEffect(() => {
    if (formData.productCategory && products[formData.productCategory as keyof typeof products]) {
      const categoryProducts = products[formData.productCategory as keyof typeof products].items || []
      setAvailableProducts(categoryProducts)
      setFormData(prev => ({ ...prev, product: "" })) // Reset product selection
    } else {
      setAvailableProducts([])
    }
  }, [formData.productCategory])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous error
    setErrorMessage('')
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMessage('Please fill in all required fields (Name, Email, and Phone).')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setIsSending(true)

    try {
      // Get product name if specific product is selected
      const selectedProduct = availableProducts.find(p => p.id === formData.product)
      const productName = selectedProduct ? selectedProduct.name : 
                         (formData.productCategory ? products[formData.productCategory as keyof typeof products]?.name || 'General Enquiry' : 'General Enquiry')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          subject: `Product Enquiry - ${productName}`,
          message: `Company: ${formData.companyName || 'Not specified'}
Product Category: ${formData.productCategory ? products[formData.productCategory as keyof typeof products]?.name || 'Not specified' : 'Not specified'}
Specific Product: ${selectedProduct?.name || 'Not specified'}

Requirements:
${formData.requirements || 'No specific requirements mentioned.'}`
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        // Reset form after a delay to show success message
        setTimeout(() => {
          setFormData({
            name: "",
            companyName: "",
            email: "",
            phone: "",
            productCategory: "",
            product: "",
            requirements: ""
          })
          setShowSuccess(false)
          onClose()
        }, 3000)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-[#11497b] rounded-t-lg px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium text-white">
                  REQUEST PRODUCT INFORMATION
                </h2>
                <p className="text-sm text-white/90 mt-1">
                  Get detailed specifications and pricing for your industrial requirements.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
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
                      Thank you for your enquiry. Our technical team will contact you within 24 hours with detailed specifications and pricing. This window will close automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Category
                </label>
                <select
                  id="productCategory"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                >
                  <option value="">Select a category</option>
                  {Object.entries(products).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Product
                </label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                  disabled={!formData.productCategory}
                >
                  <option value="">Select a product</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11497b] focus:border-[#11497b]"
                placeholder="Please describe your specific requirements, application details, quantity needed, or any questions you have..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSending || showSuccess}
                className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
                  isSending || showSuccess
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
                ) : showSuccess ? (
                  <>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Sent Successfully
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                disabled={isSending}
                className={`flex-1 border border-gray-300 px-6 py-3 rounded-lg transition-colors font-medium ${
                  isSending 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {showSuccess ? 'Close' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
