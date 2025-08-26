"use client"

import React from "react"
import { motion } from "framer-motion"

interface AboutContentProps {
  isInView: boolean
}

export default function AboutContent({ isInView }: AboutContentProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-sm font-bold tracking-wide uppercase mb-6" style={{ color: '#11497b' }}>
            MOVING FORWARD
          </h3>
          <h1 className="text-3xl lg:text-4xl font-normal text-gray-800 leading-relaxed max-w-4xl">
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
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Timeline Badge */}
            <div className="inline-block">
              <span className="text-2xl lg:text-3xl font-light text-gray-800">
                Since 2007
              </span>
            </div>
            
            {/* Main Story Text */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                We dared to imagine superior pumping solutions and 
                vowed to build systems that work, for everyone. That 
                promise continues with DP Enterprises as your trusted 
                partner for Milton Roy precision pumps and dosing equipment.
              </p>
            </div>

            {/* Company Divisions */}
            <div className="space-y-6 pt-6">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-bold tracking-wide uppercase text-gray-600 mb-2">
                  MILTON ROY PUMPS
                </h4>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-bold tracking-wide uppercase text-gray-600 mb-2">
                  DOSING SYSTEMS
                </h4>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-bold tracking-wide uppercase text-gray-600 mb-2">
                  INDUSTRIAL SOLUTIONS
                </h4>
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Image Placeholder */}
            <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Image Placeholder</p>
                <p className="text-gray-400 text-xs mt-1">Industrial Equipment/Facility Image</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
