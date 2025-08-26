"use client"

import { useState, useRef } from "react"
import { MapPin, Phone, Mail, Send, ArrowDown, Clock, Globe, User, MessageSquare, Building2, Shield, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const mapSectionRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true })
  const isInfoInView = useInView(infoRef, { once: true })
  const isFormInView = useInView(formRef, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(formData)
    setIsSubmitting(false)
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    })
  }

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" })
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
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/contact.png"
            alt="DP Enterprises Contact"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              Contact Information
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#11497b' }}>
              Let's Start a <span className="text-yellow-500">Conversation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Reach out to our team of experts for professional consultation and tailored industrial pumping solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={isInfoInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <motion.div variants={fadeInUp} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#11497b' }}>Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Our Location</h4>
                      <p className="text-gray-600 leading-relaxed">
                        C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, 
                        CHHOTA BANGARDA, Indore - 452005, Madhya Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Phone Number</h4>
                      <p className="text-gray-600">+91 7313748861</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Contact Person</h4>
                      <p className="text-gray-600">Mr. Devendra Nagwan (Partner)</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#11497b' }}>Business Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Working Hours</h4>
                      <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Service Area</h4>
                      <p className="text-gray-600">Available across India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#11497b' }}>Established</h4>
                      <p className="text-gray-600">Since 2007 - 17+ Years of Excellence</p>
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
              className="bg-white border border-gray-100 rounded-2xl p-8 space-y-6 h-fit hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <h2 className="text-3xl font-bold" style={{ color: '#11497b' }}>
                  Send us a <span className="text-yellow-500">Message</span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours with expert guidance.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold" style={{ color: '#11497b' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white"
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white"
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white"
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 focus:bg-white"
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
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-none bg-gray-50 focus:bg-white"
                  placeholder="Tell us about your industrial pumping requirements, project details, or any questions you have..."
                  required
                ></textarea>
              </motion.div>

              <motion.button
                variants={fadeInUp}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </div>
                )}
              </motion.button>

              <motion.div variants={fadeInUp} className="flex items-center justify-center pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-yellow-600" />
                  Your information is secure and confidential
                </div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-yellow-500">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="w-16 h-1 bg-white mb-6"></div>
            <h3 className="text-2xl lg:text-3xl font-normal text-white">
              WHY CHOOSE DP ENTERPRISES
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">17+ Years Experience</h4>
              <p className="text-white text-opacity-90">Proven expertise in industrial pumping solutions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Expert Team</h4>
              <p className="text-white text-opacity-90">Qualified professionals ready to assist you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Milton Roy Authorized</h4>
              <p className="text-white text-opacity-90">Official distributor of premium equipment</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapSectionRef} className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              Visit Our Office
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#11497b' }}>
              Find Us <span className="text-yellow-500">Easily</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Located in the heart of Indore, Madhya Pradesh - easily accessible and ready to serve your industrial needs
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-4 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="aspect-w-16 h-[500px] w-full rounded-2xl overflow-hidden">
                {/* Map Placeholder */}
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Interactive Map</p>
                    <p className="text-gray-400 text-sm mt-2">Google Maps integration for easy navigation</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-8 left-8 bg-white border border-gray-100 rounded-2xl p-6 max-w-sm shadow-xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#11497b' }}>DP Enterprises</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, 
                    CHHOTA BANGARDA, Indore - 452005
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-yellow-600 font-semibold">
                <Phone className="w-4 h-4" />
                +91 7313748861
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Get Directions</span>
                  <ArrowRight className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

