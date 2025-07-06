// src/components/LocaleSwitcher.tsx

'use client'; // Mark this file as a Client Component for Next.js

import { usePathname, useRouter } from '@/i18n/routing'; // i18n-aware router and pathname
import { routing, type Locale } from '@/i18n/routing';   // Routing config and type for locale
import { useLocale } from 'next-intl';                   // Hook to get the active locale
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';    // Headless UI for accessible dropdowns
import { LanguageIcon } from '@heroicons/react/24/outline';

// Dropdown for switching the language/locale
export default function LocaleSwitcher() {
  const router = useRouter();              // i18n-aware router instance
  const pathname = usePathname();          // current pathname, aware of i18n
  const currentLocale = useLocale() as Locale; // currently active locale

  // Mapping of each locale to its display name and flag
  const localeData: { [key: string]: { name: string; flag: string } } = {
    'de-DE': { name: 'Deutsch', flag: '🇩🇪' },
    'de-CH': { name: 'Deutsch (CH)', flag: '🇨🇭' },
    'de-AT': { name: 'Deutsch (AT)', flag: '🇦🇹' },
    'en-US': { name: 'English (US)', flag: '🇺🇸' },
    'en-UK': { name: 'English (UK)', flag: '🇬🇧' },
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
      {/* Button to open the locale dropdown, shows flag and language */}
      <Menu.Button className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border border-gray-200">
        <span className="text-lg">{currentLocaleData.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLocaleData.name}</span>
        <LanguageIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Change language</span>
      </Menu.Button>

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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
          <div className="py-1">
            {routing.locales.map((locale) => {
              const localeInfo = localeData[locale];
              return (
                <Menu.Item key={locale}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } ${
                        locale === currentLocale ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      } flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors duration-150`}
                      onClick={() => {
                        // Set a persistent cookie with the user's preferred locale (valid for 1 year)
                        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
                        // Route to the same page in the selected locale
                        router.replace(pathname, { locale });
                      }}
                    >
                      <span className="text-lg flex-shrink-0">{localeInfo.flag}</span>
                      <span className="font-medium">{localeInfo.name}</span>
                      {/* Show a checkmark if this is the currently selected locale */}
                      {locale === currentLocale && (
                        <span className="ml-auto text-blue-600">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
