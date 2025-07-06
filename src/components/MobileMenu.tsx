// src/components/MobileMenu.tsx

'use client'; // Mark this component as a Client Component for Next.js

import { useState } from 'react';
// Import the i18n-aware Link component and translation hook
import { Link } from '@/i18n/routing';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

// Responsive mobile navigation menu
export default function MobileMenu() {
  // State to manage menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // Access translated navigation labels and button aria labels from the "Header.navigation" namespace
  const t = useTranslations('Header.navigation');

  return (
    <div className="md:hidden">
      {/* Toggle button for mobile menu, with translated aria-label */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label={isOpen ? t('closeMenu', { defaultValue: 'Close menu' }) : t('openMenu', { defaultValue: 'Open menu' })}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile menu content (visible when open) */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-50">
          <div className="flex flex-col gap-4">
            {/* Home link, translated label */}
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>
            {/* About link, translated label */}
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            {/* Add more mobile menu links here, following the same pattern */}
          </div>
        </div>
      )}
    </div>
  );
}
