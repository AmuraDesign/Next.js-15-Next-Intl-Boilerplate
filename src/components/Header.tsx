import LocaleSwitcher from './LocaleSwitcher';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { Link } from '@/i18n/routing';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="font-bold text-xl text-gray-900 hover:text-gray-600">
            Logo
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}