import React, { useState, useEffect, useRef } from "react";
import { MapPin, Phone } from "lucide-react";

const AboutSection: React.FC = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate from 1990 to 2007
            let current = 1990;
            const target = 2007;
            const increment = 1;
            const duration = 2000; // 2 seconds
            const steps = (target - current) / increment;
            const stepDuration = duration / steps;

            const timer = setInterval(() => {
              current += increment;
              setCount(current);
              if (current >= target) {
                setCount(target);
                clearInterval(timer);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);
  const offices = [
    {
      type: "Head Office",
      location: "Indore",
      address: "C 43/1, Vidya Palace, Chotta Bangarda, INDORE – 452005 (MP)",
      phone: "+91-9425902891",
      icon: <MapPin className="h-4 w-4 text-red-500" />
    },
    {
      type: "Branch Office", 
      location: "Raipur",
      address: "Shop No 45, 46, D M Tower, Ground Floor, Birgaon, Rawa Bhata – Raipur – 492003 (CG)",
      phone: "+91-9425902891",
      icon: <MapPin className="h-4 w-4 text-red-500" />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-8 sm:py-10 lg:py-12 min-h-screen lg:h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/about-1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="relative h-full flex flex-col lg:block">
          {/* Left Content */}
          <div className="max-w-full lg:max-w-2xl pt-6 sm:pt-8 lg:pt-10">
            <div>
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/10 text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                About DP Enterprises
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Authorised Channel Partners of{" "}
                <span className="text-yellow-400">
                  Milton Roy
                </span>
              </h2>
              <div className="text-base sm:text-lg text-yellow-400 font-semibold mb-3 sm:mb-4">
                For MP, CG & Nagpur Region
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                DP ENTERPRISES established in the year 2007, are the authorised Channel Partners of 
                MILTON ROY for the entire area of Madhya Pradesh, Chhattisgarh & Vidharbha (Nagpur).
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-6 sm:mb-8">
                At D P Enterprises, we prioritize quality, reliability, and customer satisfaction. 
                Our partnership with Milton Roy ensure that our clients receive top-tier products at 
                competitive prices. We also take pride in our timely delivery services and our commitment 
                to maintaining long-lasting relationships with our customers.
              </p>
            </div>
          </div>

          {/* Office Location Cards - Responsive Layout */}
          <div className="mt-8 lg:absolute lg:bottom-28 lg:right-8 space-y-3 max-w-full lg:max-w-sm">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200 transform hover:scale-105 transition-all duration-300 w-full lg:max-w-sm">
                {/* Card Header */}
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <div className="p-1.5 bg-red-50 rounded-full">
                    {office.icon}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">{office.type}</h3>
                    <p className="text-xs font-medium text-brand-500">{office.location}</p>
                  </div>
                </div>
                
                {/* Address */}
                <div className="flex items-start space-x-2 mb-2 sm:mb-3">
                  <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {office.address}
                  </p>
                </div>
                
                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <p className="text-xs font-medium text-gray-900">
                    {office.phone}
                  </p>
                </div>
                
                {/* Google Maps style bottom bar */}
                <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                      Office Location
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
