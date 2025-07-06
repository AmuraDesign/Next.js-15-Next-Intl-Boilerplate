// src/components/Navigation.tsx

// Import the i18n-aware Link component and translation hook
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// Responsive navigation bar for desktop (hidden on mobile)
export default function Navigation() {
  // Access translated navigation labels from the "Header.navigation" namespace
  const t = useTranslations('Header.navigation');

  return (
    <nav className="hidden md:flex items-center gap-6">
      {/* Home link, translated label */}
      <Link 
        href="/" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('home')}
      </Link>
      {/* About link, translated label */}
      <Link 
        href="/about" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('about')}
      </Link>
    </nav>
  );
}
