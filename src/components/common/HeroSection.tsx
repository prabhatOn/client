import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSlides = 2;

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <div className="relative min-h-[90vh] sm:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[calc(500px+30vh)] flex items-center justify-center overflow-hidden">
      {/* Slide 1 - Original Hero with Background Image */}
      <div 
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          currentSlide === 0 ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-1.jpg')",
          }}
        />
        
        {/* Light Blue Overlay */}
        <div className="absolute inset-0 bg-blue-500/30"></div>
        
        {/* Industry Tag - Top Right (Responsive) */}
        <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 right-0 bg-white text-[#11497b] px-2 sm:px-3 md:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm shadow-lg z-30 rounded-l-lg">
          🛢️ Oil & Gas
          {/* Pointed tail */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] sm:border-t-[15px] md:border-t-[20px] border-b-[10px] sm:border-b-[15px] md:border-b-[20px] border-l-[6px] sm:border-l-[9px] md:border-l-[12px] border-t-transparent border-b-transparent border-l-white transform translate-x-full"></div>
        </div>
        
        {/* Enhanced Blue Box with Glass Effect - Responsive Design */}
        <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 sm:left-8 sm:bottom-8 sm:top-auto sm:transform-none md:left-12 md:bottom-12 lg:left-20 lg:bottom-16 
                        w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[70%] lg:w-[60%] xl:w-[50%] 
                        h-auto sm:h-[60%] md:h-[55%] lg:h-[50%] 
                        bg-[#11497b]/80 rounded-2xl shadow-2xl border border-white/20 z-20">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center space-y-3 sm:space-y-4">
            {/* Reduced Headline Size */}
            <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-tight">
              <span className="block">Fueling the</span>
              <span className="block text-blue-200">Oil & Gas Industry</span>
              <span className="block">with Reliable</span>
              <span className="block text-blue-200">Flow Control Solutions</span>
            </h1>
            
            {/* Reduced Subheadline Size */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium max-w-3xl">
              From metering pumps to precision valves – trusted by leading energy operations worldwide.
            </p>
            
            {/* Enhanced CTA Button with Color Drop Animation */}
            <div className="pt-2">
              <Link href="/product" className="group relative bg-white text-[#11497b] px-4 py-2 sm:px-6 sm:py-3 font-bold text-sm sm:text-base transition-all duration-500 w-fit flex items-center space-x-2 sm:space-x-3 shadow-xl overflow-hidden">
                {/* Blue color drop background */}
                <div className="absolute inset-0 bg-[#11497b] transform scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100"></div>
                
                <div className="relative z-10 w-3 h-3 bg-[#11497b] rounded-full group-hover:bg-white transition-colors duration-500"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore our products</span>
                <svg 
                  className="relative z-10 w-4 h-4 text-[#11497b] group-hover:text-white transition-colors duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 - Hero-2 Background with Content Box */}
      <div 
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          currentSlide === 1 ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-2.jpg')",
          }}
        />
        
        {/* Dark Blue Overlay */}
        <div className="absolute bg-blue-500/35 inset-0 "></div>

        {/* Industry Tag - Top Right (Responsive) */}
        <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 right-0 bg-white text-[#11497b] px-2 sm:px-3 md:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm shadow-lg z-30 rounded-l-lg">
          🔧 Power Plant
          {/* Pointed tail */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] sm:border-t-[15px] md:border-t-[20px] border-b-[10px] sm:border-b-[15px] md:border-b-[20px] border-l-[6px] sm:border-l-[9px] md:border-l-[12px] border-t-transparent border-b-transparent border-l-white transform translate-x-full"></div>
        </div>
        
        {/* Enhanced Blue Box with Glass Effect - Responsive Design */}
        <div className="absolute inset-x-4 top-1/2 transform -translate-y-1/2 sm:left-8 sm:bottom-8 sm:top-auto sm:transform-none md:left-12 md:bottom-12 lg:left-20 lg:bottom-16 
                        w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[70%] lg:w-[60%] xl:w-[50%] 
                        h-auto sm:h-[60%] md:h-[55%] lg:h-[50%] 
                        bg-[#11497b]/80 rounded-2xl shadow-2xl border border-white/20 z-20">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center space-y-3 sm:space-y-4">
            {/* Headline */}
            <h1 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight tracking-tight">
              <span className="block">We Deliver</span>
              <span className="block text-blue-200">What We Promise</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium max-w-3xl">
              Efficient designs for maximum uptime. Power plants require a variety of chemicals throughout the facility to enable or optimize processes.
            </p>
            
            {/* Product Introduction */}
            <p className="text-blue-200 text-xs sm:text-sm md:text-base font-semibold">
              For that we have GB Series Mechanically Actuated Diaphragm Type Dosing Pump
            </p>
            
            {/* Enhanced CTA Button with Color Drop Animation */}
            <div className="pt-2">
              <Link href="/product" className="group relative bg-white text-[#11497b] px-4 py-2 sm:px-6 sm:py-3 font-bold text-sm sm:text-base transition-all duration-500 w-fit flex items-center space-x-2 sm:space-x-3 shadow-xl overflow-hidden">
                {/* Blue color drop background */}
                <div className="absolute inset-0 bg-[#11497b] transform scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100"></div>
                
                <div className="relative z-10 w-3 h-3 bg-[#11497b] rounded-full group-hover:bg-white transition-colors duration-500"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore our products</span>
                <svg 
                  className="relative z-10 w-4 h-4 text-[#11497b] group-hover:text-white transition-colors duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Mobile Responsive */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#11497b]" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#11497b]" />
      </button>

      {/* Slide Indicators - Mobile Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
