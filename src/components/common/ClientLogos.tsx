import React from "react";
import Image from "next/image";

const ClientLogos: React.FC = () => {
  const companyLogos = [
    {
      src: "/clients/ADANIPOWER.NS.png",
      alt: "Adani Power",
      name: "Adani Power"
    },
    {
      src: "/clients/GPIL.NS_BIG.png", 
      alt: "Godrej Properties",
      name: "Godrej Properties"
    },
    {
      src: "/clients/GRASIM.NS_BIG.png",
      alt: "Grasim Industries", 
      name: "Grasim Industries"
    },
    {
      src: "/clients/HINDALCO.NS_BIG.png",
      alt: "Hindalco Industries",
      name: "Hindalco Industries"
    },
    {
      src: "/clients/JINDALSTEL.NS_BIG.png",
      alt: "Jindal Steel & Power",
      name: "Jindal Steel & Power"
    },
    {
      src: "/clients/logo2.png",
      alt: "Partner Company",
      name: "Partner Company"
    },
    {
      src: "/clients/NTPC.NS.png",
      alt: "NTPC Limited",
      name: "NTPC Limited"
    },
    {
      src: "/clients/PATANJALI.NS_BIG.png",
      alt: "Patanjali Ayurved",
      name: "Patanjali Ayurved"
    },
    {
      src: "/clients/SRF.NS_BIG.png",
      alt: "SRF Limited",
      name: "SRF Limited"
    },
    {
      src: "/clients/TATACONSUM.NS.png",
      alt: "Tata Consumer Products",
      name: "Tata Consumer Products"
    },
    {
      src: "/clients/ULTRACEMCO.NS.png",
      alt: "UltraTech Cement",
      name: "UltraTech Cement"
    },
    {
      src: "/clients/VEDL.NS_BIG.png",
      alt: "Vedanta Limited",
      name: "Vedanta Limited"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scrolling-wrapper {
          display: flex;
          width: max-content;
          animation: scrollLeft 30s linear infinite;
        }

        .scrolling-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .scrolling-wrapper:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* Moving Logos */}
        <div className="relative">
          <div className="scrolling-container relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="scrolling-wrapper">
              {/* First set of logos */}
              {companyLogos.map((logo, index) => (
                <div key={`first-${index}`} className="relative flex-shrink-0 w-32 h-20 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center p-4 hover:shadow-lg transition-shadow duration-300 m-4">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companyLogos.map((logo, index) => (
                <div key={`second-${index}`} className="relative flex-shrink-0 w-32 h-20 bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center p-4 hover:shadow-lg transition-shadow duration-300 m-4">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>17+ Years of Excellence</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
              <span>Milton Roy Authorized Partners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
