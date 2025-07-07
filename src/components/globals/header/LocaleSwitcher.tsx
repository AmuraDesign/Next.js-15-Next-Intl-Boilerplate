/**
 * Language/Locale switcher component
 * 
 * Features:
 * - Dropdown menu with all supported locales
 * - Flag icons and localized language names
 * - Persistent locale preference via cookies
 * - Responsive design (text hidden on mobile)
 * - Theme-aware styling
 */

'use client'; // Mark this file as a Client Component for Next.js

import { usePathname, useRouter } from '@/i18n/routing'; // i18n-aware router and pathname
import { routing, type Locale } from '@/i18n/routing';   // Routing config and type for locale
import { useLocale } from 'next-intl';                   // Hook to get the active locale
import { Fragment } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';    // Headless UI for accessible dropdowns
import { LanguageIcon } from '@heroicons/react/24/outline';

/**
 * Dropdown component for switching the language/locale
 * 
 * Displays current locale with flag and name, opens dropdown with all available locales
 * Automatically persists user preference and navigates to the same page in new locale
 */
export default function LocaleSwitcher() {
  const router = useRouter();              // i18n-aware router instance
  const pathname = usePathname();          // current pathname, aware of i18n
  const currentLocale = useLocale() as Locale; // currently active locale

  // Mapping of each locale to its display name and flag emoji
  const localeData: { [key: string]: { name: string; flag: string } } = {
    'de-DE': { name: 'Deutsch', flag: '🇩🇪' },
    'de-CH': { name: 'Deutsch (CH)', flag: '🇨🇭' },
    'de-AT': { name: 'Deutsch (AT)', flag: '🇦🇹' },
    'en-US': { name: 'English (US)', flag: '🇺🇸' },
    'en-GB': { name: 'English (GB)', flag: '🇬🇧' },
    'es-ES': { name: 'Español', flag: '🇪🇸' },
    'tr-TR': { name: 'Türkçe', flag: '🇹🇷' },
    'sq-AL': { name: 'Shqip', flag: '🇦🇱' },
    'it-IT': { name: 'Italiano', flag: '🇮🇹' },
    'fr-FR': { name: 'Français', flag: '🇫🇷' },
    'hr-HR': { name: 'Hrvatski', flag: '🇭🇷' },
    'bs-BA': { name: 'Bosanski', flag: '🇧🇦' },
    'ar-SA': { name: 'العربية', flag: '🇸🇦' }
  };

  // Data for the currently active locale, fallback to en-US
  const currentLocaleData = localeData[currentLocale] || localeData['en-US'];

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Button to open the locale dropdown, shows flag and language name */}
      <MenuButton className="inline-flex items-center justify-center gap-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-muted transition-colors duration-150 min-w-[44px]">
        <span className="w-4 h-4 flex items-center justify-center text-sm">{currentLocaleData.flag}</span>
        <span className="text-sm font-medium hidden lg:inline">{currentLocaleData.name}</span>
        <LanguageIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Change language</span>
      </MenuButton>

      {/* Dropdown menu for locale selection */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto border border-muted">
          <div className="py-1">
            {/* Render each available locale as a menu item */}
            {routing.locales.map((locale) => {
              const localeInfo = localeData[locale];
              return (
                <MenuItem key={locale}>
                  {() => (
                    <button
                      className={`${
                        locale === currentLocale ? 'bg-primary/10 text-primary' : 'text-foreground'
                      } flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150`}
                      onClick={() => {
                        // Set a persistent cookie with the user's preferred locale (valid for 1 year)
                        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
                        // Route to the same page in the selected locale
                        router.replace(pathname, { locale });
                      }}
                    >
                      <span className="text-lg flex-shrink-0">{localeInfo.flag}</span>
                      <span className="font-medium">{localeInfo.name}</span>
                      {/* Show a checkmark if this is the currently selected locale */}
                      {locale === currentLocale && (
                        <span className="ml-auto text-primary">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </button>
                  )}
                </MenuItem>
              );
            })}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
