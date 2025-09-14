"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface HeroSectionProps {
  isInView: boolean
}

export default function HeroSection({ isInView }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] flex  justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        >
          <source src="/about-vid.mp4" type="video/mp4" />
          {/* Fallback background image if video fails to load */}
          <Image
            src="/assets/about.webp"
            alt="DP Enterprises About"
            fill
            className="object-cover"
          />
        </video>
      </div>
    </motion.section>
  )
}
