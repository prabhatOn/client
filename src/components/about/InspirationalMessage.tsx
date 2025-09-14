"use client"

import React from "react"

interface InspirationalMessageProps {
  isInView?: boolean
}

export default function InspirationalMessage({ isInView }: InspirationalMessageProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 min-h-[50vh] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#11497b' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Main Message */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Together is what makes the <br className="hidden sm:block" />
              impossible <span className="text-yellow-500 font-bold">achievable</span>
            </h1>
          </div>
          
          {/* Supporting Text */}
          <div className="text-center lg:text-left">
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-200 leading-relaxed">
              Excellence takes more than just innovative solutions. It takes teams across industries, 
              technologies, and dedicated partnerships. It takes the power of collaboration. 
              Because when you combine expertise with purpose, you unite 
              relevant experiences, ideas, and capabilities to help industries advance. Get 
              together right, and you don't just move the needle—you can transform the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
