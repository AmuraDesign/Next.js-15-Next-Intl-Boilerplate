import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('Header.navigation');
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link 
        href="/" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('home')}
      </Link>
      <Link 
        href="/about" 
        className="text-sm font-medium hover:text-gray-600 transition-colors"
      >
        {t('about')}
      </Link>
    </nav>
  );
}