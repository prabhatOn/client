"use client"

import React from "react"
import { motion } from "framer-motion"
import { companyInfo } from "./data"

interface CompanyInformationProps {
  isInView: boolean
}

export default function CompanyInformation({ isInView }: CompanyInformationProps) {
  return (
    <section className="py-16 md:py-20 bg-yellow-500">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-16 h-1 bg-white mb-6"></div>
          <h3 className="text-2xl lg:text-3xl font-normal text-white">
            COMPANY PROFILE
          </h3>
        </motion.div>

        {/* Company Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 relative">
            {/* Vertical Line Separator - Hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-30 transform -translate-x-1/2"></div>
            
            {/* First Column */}
            <div className="space-y-0">
              {companyInfo.slice(0, 3).map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + (0.1 * index) }}
                  className="border-b border-white border-opacity-20 py-6 hover:bg-white hover:bg-opacity-10 transition-colors duration-200 rounded-lg px-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <info.icon className="w-5 h-5 text-white" />
                      <h4 className="text-lg font-normal text-white">
                        {info.label}
                      </h4>
                    </div>
                    <div className="text-lg font-light text-white">
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Column */}
            <div className="space-y-0">
              {companyInfo.slice(3, 6).map((info, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + (0.1 * index) }}
                  className="border-b border-white border-opacity-20 py-6 hover:bg-white hover:bg-opacity-10 transition-colors duration-200 rounded-lg px-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <info.icon className="w-5 h-5 text-white" />
                      <h4 className="text-lg font-normal text-white">
                        {info.label}
                      </h4>
                    </div>
                    <div className="text-lg font-light text-white">
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
