"use client"

import { useState, useRef } from "react"
import { MapPin, Phone, Mail, Send, ArrowDown, Clock, Globe, User, MessageSquare, Building2, Shield, ArrowRight, Navigation, Headphones, CheckCircle } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedOffice, setSelectedOffice] = useState(0)

  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const mapSectionRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true })
  const isInfoInView = useInView(infoRef, { once: true })
  const isFormInView = useInView(formRef, { once: true })

  // Office locations data
  const offices = [
    {
      id: 1,
      name: "Head Office - Pithampur",
      type: "Head Office",
      address: "123, Industrial Area Sector-1, Pithampur, Dist-Dhar (MP) 454775",
      phone: "+91-9425902891",
      email: "dpenterprises2007@gmail.com",
      city: "Pithampur",
      state: "Madhya Pradesh",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.234567890123!2d75.68456789012345!3d22.59876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM1JzU1LjYiTiA3NcKwNDEnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
      description: "Our main headquarters serving Madhya Pradesh region"
    },
    {
      id: 2,
      name: "Branch Office - Nagpur", 
      type: "Branch Office",
      address: "105, Shivshakti Complex, Katol Road, Nagpur (MH) 440013",
      phone: "+91-9425902891",
      email: "dpenterprises2007@gmail.com",
      city: "Nagpur",
      state: "Maharashtra",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.123456789012!2d79.08765432109876!3d21.14567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDgnNDQuNCJOIDc5wrAwNScxNS42IkU!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
      description: "Serving Vidharbha region and eastern Maharashtra"
    },
    {
      id: 3,
      name: "Regional Office - Raipur",
      type: "Regional Office", 
      address: "Plot No. 45, Industrial Estate, Raipur (CG) 492001",
      phone: "+91-9425902891",
      email: "dpenterprises2007@gmail.com",
      city: "Raipur",
      state: "Chhattisgarh",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.987654321098!2d81.63456789012345!3d21.23987654321098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE0JzIzLjYiTiA4McKwMzgnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
      description: "Comprehensive coverage for Chhattisgarh state"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Show success message
        alert('🎉 Thank you! Your message has been sent successfully. We will contact you within 24 hours.')
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }

    } catch (error) {
      console.error('Error submitting form:', error)
      alert('❌ There was an error sending your message. Please try again or contact us directly at +91-9425902891.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        ref={headerRef}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20"
        style={{
          background: `linear-gradient(135deg, #0f3460 0%, #1a4a75 25%, #204d7a 50%, #0f3460 100%)`,
        }}
      >
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

        {/* Minimal geometric elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 border border-white border-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-yellow-400 border-opacity-20 transform rotate-45"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content - Main Message */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight mb-6 sm:mb-8">
                Connect with precision.
                <span className="block">Partner with</span>
                <span className="text-yellow-400 font-medium">excellence</span>
              </h1>
            </motion.div>

            {/* Right Content - Supporting Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:pl-8"
            >
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6 sm:mb-8">
                Ready to discuss your pumping solutions? Our team of experts is here to help 
                you find the perfect Milton Roy equipment for your industrial needs across 
                Madhya Pradesh, Chhattisgarh, and Vidharbha regions.
              </p>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                When precision meets partnership, you don't just get equipment—you 
                get comprehensive support for your industrial processes.
              </p>

              {/* Company Badge */}
              <div className="text-white">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2 text-yellow-400" />
                <span className="font-medium text-sm sm:text-base">DP Enterprises - Milton Roy Authorized Partner</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div
            className="cursor-pointer"
            onClick={scrollToForm}
          >
            <ArrowDown className="w-6 h-6 text-yellow-400" />
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              Contact Information
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#11497b' }}>
              Let's Start a <span className="text-yellow-500">Conversation</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Reach out to our team of experts for professional consultation and tailored industrial pumping solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Company Information */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={isInfoInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Contact Cards */}
              <motion.div variants={fadeInUp} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-8 sm:w-12 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-1 sm:w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#11497b' }}>Contact Information</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>Contact Person</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Mr. Devendra Nagwan (Partner)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>Phone Number</h4>
                      <p className="text-gray-600 text-sm sm:text-base">+91-9425902891</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>Email Address</h4>
                      <p className="text-gray-600 text-sm sm:text-base break-all sm:break-normal">dpenterprises2007@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Service Coverage</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Madhya Pradesh, Chhattisgarh & Vidharbha (Nagpur)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-8 sm:w-12 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-1 sm:w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: '#11497b' }}>Business Information</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>Working Hours</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-sm sm:text-base">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>Service Area</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Available across India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>Established</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Since 2007 - 17+ Years of Excellence</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              ref={formRef}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6 h-fit hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <motion.div variants={fadeInUp} className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-8 sm:w-12 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-1 sm:w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#11497b' }}>
                  Send us a <span className="text-yellow-500">Message</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you within 24 hours with expert guidance.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold" style={{ color: '#11497b' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold" style={{ color: '#11497b' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-semibold" style={{ color: '#11497b' }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                  placeholder="+91 98765 43210"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold" style={{ color: '#11497b' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white text-sm sm:text-base"
                  placeholder="What can we help you with?"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold" style={{ color: '#11497b' }}>
                  Your Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-none bg-gray-50 focus:bg-white text-sm sm:text-base"
                  placeholder="Tell us about your industrial pumping requirements, project details, or any questions you have..."
                  required
                ></textarea>
              </motion.div>

              <motion.button
                variants={fadeInUp}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </div>
                )}
              </motion.button>

              <motion.div variants={fadeInUp} className="flex items-center justify-center pt-2 sm:pt-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                  Your information is secure and confidential
                </div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-yellow-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <div className="w-12 sm:w-16 h-1 bg-white mb-4 sm:mb-6"></div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-white">
              WHY CHOOSE DP ENTERPRISES
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">17+ Years Experience</h4>
              <p className="text-white text-opacity-90 text-sm sm:text-base">Proven expertise in industrial pumping solutions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Expert Team</h4>
              <p className="text-white text-opacity-90 text-sm sm:text-base">Qualified professionals ready to assist you</p>
            </div>

            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Milton Roy Authorized</h4>
              <p className="text-white text-opacity-90 text-sm sm:text-base">Official distributor of premium equipment</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Offices Section */}
      <section ref={mapSectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              Our Office Locations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#11497b' }}>
              Visit Our <span className="text-yellow-500">Offices</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Strategically located across three states to serve you better - find the nearest office for personalized consultation
            </p>
          </motion.div>

          {/* Office Selection Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
          >
            {offices.map((office, index) => (
              <button
                key={office.id}
                onClick={() => setSelectedOffice(index)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  selectedOffice === index
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
                }`}
              >
                {office.city}
              </button>
            ))}
          </motion.div>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {offices.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white border-2 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  selectedOffice === index ? 'border-yellow-500 shadow-lg' : 'border-gray-100'
                }`}
                onClick={() => setSelectedOffice(index)}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedOffice === index ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium mb-1 sm:mb-2 ${
                      office.type === 'Head Office' ? 'bg-blue-100 text-blue-800' :
                      office.type === 'Branch Office' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {office.type}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2" style={{ color: '#11497b' }}>
                      {office.city}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                      {office.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
                      {office.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0" />
                    <p className="text-gray-600 text-xs sm:text-sm">{office.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0" />
                    <p className="text-gray-600 text-xs sm:text-sm break-all sm:break-normal">{office.email}</p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium" style={{ color: '#11497b' }}>
                      Get Directions
                    </span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="text-lg sm:text-2xl font-bold" style={{ color: '#11497b' }}>
                  {offices[selectedOffice].name}
                </h3>
                <div className="flex items-center gap-2 text-yellow-600">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Interactive Map</span>
                </div>
              </div>
              
              <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden relative">
                {/* Map Iframe */}
                <iframe
                  src={offices[selectedOffice].mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                  title={`Map of ${offices[selectedOffice].name}`}
                ></iframe>
                
                {/* Fallback for map loading */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-2xl opacity-0 hover:opacity-0 transition-opacity">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                      <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg font-medium">Loading Map...</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Details Card Overlay */}
            <motion.div
              key={selectedOffice}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-12 sm:top-20 left-2 sm:left-8 bg-white border border-gray-100 rounded-2xl p-3 sm:p-6 w-[280px] sm:max-w-sm shadow-xl z-10"
            >
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                    offices[selectedOffice].type === 'Head Office' ? 'bg-blue-100 text-blue-800' :
                    offices[selectedOffice].type === 'Branch Office' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {offices[selectedOffice].type}
                  </div>
                  <h3 className="font-bold mb-1 text-sm sm:text-base" style={{ color: '#11497b' }}>
                    {offices[selectedOffice].city}, {offices[selectedOffice].state}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
                    {offices[selectedOffice].address}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-yellow-600 font-semibold">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all sm:break-normal">{offices[selectedOffice].phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">{offices[selectedOffice].email}</span>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors">
                  <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                  Get Directions
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

