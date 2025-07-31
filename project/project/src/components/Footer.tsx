import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} Mindful AI. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-error-500" />
            <span>for mental wellness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;