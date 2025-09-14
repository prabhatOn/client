"use client"

import React from "react"
import { motion } from "framer-motion"

interface CompanyStatsProps {
  isInView: boolean
}

export default function CompanyStats({ isInView }: CompanyStatsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 xl:gap-24"
        >
          {/* Stat 1 */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <div className="w-12 h-1 bg-yellow-500 mb-4 sm:mb-6 mx-auto md:mx-0"></div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2">18+</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                Years of excellence in industrial pumping solutions
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <div className="w-12 h-1 bg-yellow-500 mb-4 sm:mb-6 mx-auto md:mx-0"></div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2">500+</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                Satisfied clients served across multiple industries
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <div className="w-12 h-1 bg-yellow-500 mb-4 sm:mb-6 mx-auto md:mx-0"></div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-2">25+</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                Milton Roy product lines in our portfolio
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
