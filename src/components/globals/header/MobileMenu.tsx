/**
 * Mobile navigation menu component
 * 
 * Features:
 * - Hamburger menu for mobile devices
 * - Responsive design (hidden on desktop)
 * - Theme and language switchers included
 * - Centered positioning with left-aligned text
 * - Theme-aware styling
 */

'use client'; // Mark this component as a Client Component for Next.js

import { useState } from 'react';
// Import the i18n-aware Link component and translation hook
import { Link } from '@/i18n/routing';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeSelector from './ThemeSelector';

/**
 * Responsive mobile navigation menu
 * 
 * Displays hamburger menu on mobile devices with navigation links,
 * theme selector, and language switcher in a centered dropdown
 */
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
        className="p-2 text-foreground hover:text-primary transition-colors duration-150"
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
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-background border border-muted shadow-lg p-4 z-50 rounded-md max-w-sm w-full mx-4">
          <div className="flex flex-col gap-4">
            {/* Navigation links */}
            <Link 
              href="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150 text-left"
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150 text-left"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            
            {/* Visual separator between navigation and controls */}
            <div className="border-t border-muted my-2"></div>
            
            {/* Theme and Language selectors with labels */}
            <div className="flex items-center gap-4 justify-center">
              <span className="text-sm font-medium text-foreground text-left">Theme:</span>
              <ThemeSelector />
            </div>
            <div className="flex items-center gap-4 justify-center">
              <span className="text-sm font-medium text-foreground text-left">Language:</span>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
