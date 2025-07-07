/**
 * Main header component for the application
 * 
 * Features:
 * - Responsive design with mobile menu
 * - Theme-aware styling using CSS variables
 * - Internationalization support
 * - Language and theme switchers
 * - Sticky positioning at the top
 */

import LocaleSwitcher from './LocaleSwitcher';    // Language switcher dropdown
import ThemeSelector from './ThemeSelector';      // Theme switcher dropdown
import Navigation from './Navigation';            // Desktop navigation links
import MobileMenu from './MobileMenu';            // Hamburger menu for mobile
import { Link } from '@/i18n/routing';            // i18n-aware link component

/**
 * Main header bar component, sticky at the top of the page
 * 
 * Responsive behavior:
 * - Desktop: Shows navigation links, language switcher, and theme selector
 * - Mobile: Shows hamburger menu with all options in dropdown
 */
export default function Header() {
  return (
    <header
      // Theme-enabled: use CSS variable tokens for all major colors
      className="
        fixed top-0 left-0 right-0
        bg-background
        border-b border-muted
        shadow-sm
        z-50
        transition-colors
        duration-300
      "
      style={{
        // Fallback for browsers without CSS variable support (optional)
        backgroundColor: 'var(--color-background)',
        borderBottomColor: 'var(--color-muted)',
      }}
    >
      {/* Container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header content */}
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand (always clickable, always links to home page) */}
          <Link
            href="/"
            className="
              font-bold text-xl
              text-foreground
              hover:text-primary
              transition-colors duration-150
            "
          >
            Logo
          </Link>

          {/* Desktop navigation (hidden on mobile by default) */}
          <Navigation />

          {/* Right side: language switcher, theme switcher, and mobile menu */}
          <div className="flex items-center gap-4">
            {/* Desktop controls (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-4">
              <LocaleSwitcher />
              <ThemeSelector />
            </div>
            {/* Mobile menu (visible on mobile, hidden on desktop) */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
