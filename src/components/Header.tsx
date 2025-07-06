// src/components/Header.tsx

import LocaleSwitcher from './LocaleSwitcher';  // Language switcher dropdown
import Navigation from './Navigation';          // Desktop navigation links
import MobileMenu from './MobileMenu';          // Hamburger menu for mobile
import { Link } from '@/i18n/routing';          // i18n-aware link component

// Main header bar component, sticky at the top of the page
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand (clickable, always links to home page) */}
          <Link href="/" className="font-bold text-xl text-gray-900 hover:text-gray-600">
            Logo
          </Link>

          {/* Desktop navigation (hidden on mobile) */}
          <Navigation />

          {/* Right section: language switcher and mobile hamburger menu */}
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
