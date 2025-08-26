"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, MapPin, Calendar } from "lucide-react";

// Counter component with animation
const AnimatedCounter = ({ 
  end, 
  suffix = "", 
  duration = 1500, 
  delay = 0 
}: { 
  end: number, 
  suffix?: string, 
  duration?: number, 
  delay?: number 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = end / (duration / 50);
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
};

const statsData = [
  {
    icon: Calendar,
    number: 17,
    suffix: "+",
    label: "Years of Experience",
    description: "Serving industries since 2007"
  },
  {
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Happy Clients",
    description: "Trusted by businesses across regions"
  },
  {
    icon: Award,
    number: 1000,
    suffix: "+",
    label: "Projects Completed",
    description: "Successfully delivered solutions"
  },
  {
    icon: MapPin,
    number: 3,
    suffix: "",
    label: "Coverage Areas",
    description: "MP, Chhattisgarh & Nagpur"
  }
];

export default function StatsSection() {
  return (
    <section className="bg-brand-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Achievements
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-800 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Building trust through excellence and delivering reliable industrial solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                  <IconComponent className="h-8 w-8 text-yellow-500" />
                </div>
                
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={1500}
                    delay={index * 50}
                  />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-gray-800 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-12 pt-8 border-t border-gray-900/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-900 font-medium text-lg">
            Authorized Channel Partner of Milton Roy
          </p>
          <p className="text-gray-800 text-sm mt-2">
            Delivering precision industrial pumping solutions with excellence and reliability
          </p>
        </motion.div>
      </div>
    </section>
  );
}
