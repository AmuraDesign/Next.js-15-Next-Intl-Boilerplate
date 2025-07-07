/**
 * Desktop navigation component
 * 
 * Features:
 * - Horizontal navigation links for desktop
 * - Responsive design (hidden on mobile)
 * - Internationalization support
 * - Theme-aware styling
 * - Smooth hover transitions
 */

// Import the i18n-aware Link component and translation hook
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

/**
 * Responsive navigation bar for desktop (hidden on mobile)
 * 
 * Displays horizontal navigation links with proper spacing and hover effects
 * Uses internationalized labels from the Header.navigation namespace
 */
export default function Navigation() {
  // Access translated navigation labels from the "Header.navigation" namespace
  const t = useTranslations('Header.navigation');

  return (
    <nav className="hidden md:flex items-center gap-6">
      {/* Home link with translated label */}
      <Link 
        href="/" 
        className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
      >
        {t('home')}
      </Link>
      {/* About link with translated label */}
      <Link 
        href="/about" 
        className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
      >
        {t('about')}
      </Link>
    </nav>
  );
}
