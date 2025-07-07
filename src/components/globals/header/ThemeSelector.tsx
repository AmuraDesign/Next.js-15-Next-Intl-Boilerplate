/**
 * Theme selector component
 * 
 * Features:
 * - Dropdown menu with multiple theme options
 * - Visual color indicators for each theme
 * - Persistent theme preference via localStorage
 * - Responsive design (text hidden on mobile)
 * - Theme-aware styling
 * - Hydration-safe implementation
 * - System theme detection (OS light/dark mode)
 */

'use client';

import { Fragment, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import {
  SunIcon, MoonIcon, SparklesIcon, FireIcon, GlobeAltIcon, PaintBrushIcon
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

/**
 * Theme definitions with visual indicators and icons
 * Each theme has a unique color scheme and corresponding icon
 */
const themes = [
  { key: 'system', icon: <SunIcon className="w-4 h-4 text-blue-400" />, color: 'bg-gray-200 border-gray-400' },
  { key: 'nord', icon: <GlobeAltIcon className="w-4 h-4 text-cyan-400" />, color: 'bg-[#2e3440] border-[#88c0d0]' },
  { key: 'sakura', icon: <SparklesIcon className="w-4 h-4 text-pink-400" />, color: 'bg-[#fff0f6] border-[#f472b6]' },
  { key: 'midnight', icon: <FireIcon className="w-4 h-4 text-purple-400" />, color: 'bg-[#161622] border-[#7f5af0]' },
  { key: 'earthy', icon: <PaintBrushIcon className="w-4 h-4 text-amber-700" />, color: 'bg-[#ede9dd] border-[#94734b]' },
  { key: 'dark', icon: <MoonIcon className="w-4 h-4 text-gray-500" />, color: 'bg-[#18181b] border-[#2563eb]' }
] as const;

type ThemeKey = typeof themes[number]['key'];

/**
 * Helper function to get initial theme from localStorage
 * Returns 'system' if no theme is stored or if running on server
 */
function getInitialTheme(): ThemeKey {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as ThemeKey) || 'system';
}

/**
 * Theme selector dropdown component
 * 
 * Manages theme state and applies selected theme to the document
 * Handles hydration safely to prevent SSR/client mismatch
 * Supports system theme detection for OS light/dark mode
 */
export default function ThemeSelector() {
  // Hydration fix: Hide component until client-side
  const [hydrated, setHydrated] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>('system');
  const t = useTranslations('ThemeSelector');

  // Initialize theme and hydration - set DOM attribute immediately
  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    // Das Attribut *sofort* beim ersten Render setzen!
    if (t === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
    setHydrated(true);
  }, []);

  // Apply theme changes to document and localStorage
  useEffect(() => {
    if (!hydrated) return;
    
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', theme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, hydrated]);

  // Find current theme configuration
  const currentTheme = themes.find((t) => t.key === theme) ?? themes[0];

  // Don't render anything until hydrated to avoid hydration mismatch
  if (!hydrated) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Button to open theme dropdown, shows current theme indicator and name */}
      <MenuButton className="inline-flex items-center justify-center gap-2 rounded-md bg-background px-3 py-2 text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-muted transition-colors duration-150 min-w-[44px]">
        <span className={`w-4 h-4 rounded-full border-2 ${currentTheme.color}`} />
        <span className="text-sm font-medium hidden lg:inline">{t(currentTheme.key)}</span>
        {currentTheme.icon}
        <span className="sr-only">{t('changeTheme') || 'Change theme'}</span>
      </MenuButton>
      
      {/* Dropdown menu with all available themes */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto border border-muted">
          <div className="py-1">
            {/* Render each available theme as a menu item */}
            {themes.map((tTheme) => (
              <MenuItem key={tTheme.key}>
                {() => (
                  <button
                    className={`${
                      tTheme.key === theme ? 'bg-primary/10 text-primary' : 'text-foreground'
                    } flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-muted transition-colors duration-150`}
                    onClick={() => setTheme(tTheme.key)}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 ${tTheme.color}`} />
                    <span className="font-medium">{t(tTheme.key)}</span>
                    {tTheme.icon}
                    {/* Show checkmark for currently selected theme */}
                    {tTheme.key === theme && (
                      <span className="ml-auto text-primary">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
