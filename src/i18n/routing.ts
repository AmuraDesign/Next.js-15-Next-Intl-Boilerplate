// src/i18n/routing.ts

// Import helpers to define i18n routing and navigation from next-intl
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// List of all supported locales for the application
export const locales = [
  'de-DE', 'de-CH', 'de-AT',  // German (Germany, Switzerland, Austria)
  'en-US', 'en-GB',           // English (US, GB)
  'es-ES',                    // Spanish
  'tr-TR',                    // Turkish
  'sq-AL',                    // Albanian
  'it-IT',                    // Italian
  'fr-FR',                    // French
  'hr-HR',                    // Croatian
  'bs-BA',                    // Bosnian
  'ar-SA'                     // Arabic (Saudi Arabia)
] as const;

// Type for allowed locale strings (used for type safety)
export type Locale = typeof locales[number];

// Define the i18n routing configuration
export const routing = defineRouting({
  // All supported locales for this project
  locales,

  // Fallback locale if no match is found
  defaultLocale: 'en-US',

  // Define localized pathnames for important routes
  pathnames: {
    '/': {
      'de-DE': '/',
      'de-CH': '/',
      'de-AT': '/',
      'en-US': '/',
      'en-GB': '/',
      'fr-FR': '/',
      'it-IT': '/',
      'es-ES': '/',
      'tr-TR': '/',
      'sq-AL': '/',
      'hr-HR': '/',
      'bs-BA': '/',
      'ar-SA': '/'
    },
    '/about': {
      'de-DE': '/ueber-uns',
      'de-CH': '/ueber-uns',
      'de-AT': '/ueber-uns',
      'en-US': '/about',
      'en-GB': '/about',
      'fr-FR': '/a-propos',
      'it-IT': '/chi-siamo',
      'es-ES': '/sobre-nosotros',
      'tr-TR': '/hakkimizda',
      'sq-AL': '/rreth-nesh',
      'hr-HR': '/o-nama',
      'bs-BA': '/o-nama',
      'ar-SA': '/عنّا'
    }
  }
});

// Export i18n-aware navigation helpers for usage throughout the app
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
