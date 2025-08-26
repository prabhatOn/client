"use client"

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#11497b] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DP</span>
              </div>
              <div>
                <h3 className="text-lg text-yellow-500 font-bold">DP Enterprises</h3>
                <p className="text-sm text-gray-300">Industrial Solutions</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Authorized Channel Partner of Milton Roy, delivering precision industrial pumping solutions since 2007.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-yellow-500 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-semibold text-yellow-500 mb-4">Product Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/electro-actuated-pumps" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Electro Actuated Pumps
                </Link>
              </li>
              <li>
                <Link href="/category/hydraulic-actuated-pumps" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Hydraulic Actuated Pumps
                </Link>
              </li>
              <li>
                <Link href="/category/mechanical-actuated-pumps" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Mechanical Actuated Pumps
                </Link>
              </li>
              <li>
                <Link href="/category/plunger-pumps" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Packed Plunger Pumps
                </Link>
              </li>
              <li>
                <Link href="/category/pump-accessories" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Pump Accessories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Contact Information Only */}
        <div className="grid grid-cols-1 gap-8">
          <div>
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-yellow-500">Head Office:</strong> C 43/1, Vidya Palace, Chotta Bangarda, INDORE – 452005 (MP)
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    <strong className="text-yellow-500">Branch Office:</strong> Shop No 45, 46, D M Tower, Ground Floor, Birgaon, Rawa Bhata – Raipur – 492003 (CG)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 text-sm">
                  <strong className="text-yellow-500">Phone:</strong> +91-9425902891 (Working Hours: 9:00 AM - 6:00 PM)
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <a 
                  href="mailto:dpenterprises2007@gmail.com"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
                >
                  <strong className="text-yellow-500">Email:</strong> dpenterprises2007@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <span>Established 2007</span>
              <Link href="/contact" className="hover:text-white transition-colors duration-300">
                Contact Information
              </Link>
            </div>
            
            <p className="text-sm text-gray-400">
              © 2025 DP Enterprises. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

