'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {/* Weitere Mobile-Menu-Links hier */}
          </div>
        </div>
      )}
    </div>
  );
}