import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Eye, HeadphonesIcon, MessageSquare } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const QuickLinks = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 rounded-full z-50 bg-white shadow-md border border-gray-200 hidden sm:block">
        <div className="px-8 py-3">
          <div className="flex items-center space-x-8">
            {/* Quick Links Label */}
            <span className="text-gray-700 font-medium text-sm">
              QUICK LINKS:
            </span>

            {/* Download Center */}
            <Link
              href="/dp-data.txt"
              download
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Center</span>
            </Link>

            {/* See Products */}
            <Link
              href="/product"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
            >
              <Eye className="w-4 h-4" />
              <span>See Products</span>
            </Link>

            {/* Enquiry */}
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquiry</span>
            </button>

            {/* Support */}
            <Link
              href="/contact"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
            >
              <HeadphonesIcon className="w-4 h-4" />
              <span>Support</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </>
  );
};

export default QuickLinks;
