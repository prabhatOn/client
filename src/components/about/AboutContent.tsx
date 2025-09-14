"use client"

import React from "react"
import { motion } from "framer-motion"

interface AboutContentProps {
  isInView: boolean
}

export default function AboutContent({ isInView }: AboutContentProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase mb-4 sm:mb-6" style={{ color: '#11497b' }}>
            MOVING FORWARD
          </h3>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-800 leading-relaxed max-w-4xl">
            For more than 15 years, we have delivered reliable industrial pumping solutions 
            and pioneered technologies that drove industry-transforming changes and improved 
            countless operations. Now, we continue that work with even greater focus.
          </h1>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start"
        >
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Timeline Badge */}
            <div className="inline-block">
              <span className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-800">
                Since 2007
              </span>
            </div>
            
            {/* Main Story Text */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We dared to imagine superior pumping solutions and 
                vowed to build systems that work, for everyone. That 
                promise continues with DP Enterprises as your trusted 
                partner for Milton Roy precision pumps and dosing equipment.
              </p>
            </div>

            {/* Company Divisions */}
            <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
              <div className="border-b border-gray-200 pb-3 sm:pb-4">
                <h4 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-gray-600 mb-2">
                  MILTON ROY PUMPS
                </h4>
              </div>
              
              <div className="border-b border-gray-200 pb-3 sm:pb-4">
                <h4 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-gray-600 mb-2">
                  DOSING SYSTEMS
                </h4>
              </div>

              <div className="border-b border-gray-200 pb-3 sm:pb-4">
                <h4 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-gray-600 mb-2">
                  INDUSTRIAL SOLUTIONS
                </h4>
              </div>
            </div>
          </div>

          {/* Right Content - Company Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Company Profile Card */}
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
              {/* Company Logo */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <img 
                  src="/about-logo.png" 
                  alt="DP Enterprises Logo" 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
              </div>
              
              {/* Company Info */}
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  DP Enterprises
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium" style={{ color: '#11497b' }}>
                  Authorized Milton Roy Distributor
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Excellence in precision pumping solutions and industrial equipment 
                  distribution across India since 2007.
                </p>
                
                {/* Quality Badge */}
                <div className="mt-4 sm:mt-6 inline-flex items-center px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm border">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" style={{ color: '#11497b' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">Trusted Quality</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
