'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  const localeNames: { [key: string]: string } = {
    'de-DE': 'Deutsch',
    'de-CH': 'Deutsch (CH)',
    'de-AT': 'Deutsch (AT)',
    'en-US': 'English (US)',
    'en-UK': 'English (UK)',
    'es-ES': 'Español',
    'tr-TR': 'Türkçe',
    'sq-AL': 'Shqip',
    'it-IT': 'Italiano',
    'fr-FR': 'Français',
    'hr-HR': 'Hrvatski',
    'bs-BA': 'Bosanski'
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <LanguageIcon className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Sprache ändern</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {routing.locales.map((locale) => (
              <Menu.Item key={locale}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full px-3 py-2 text-left text-sm text-gray-700`}
                    onClick={() => router.replace(pathname, { locale })}
                  >
                    {localeNames[locale]}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}