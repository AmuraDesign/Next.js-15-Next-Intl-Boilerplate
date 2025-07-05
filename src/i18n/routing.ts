import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
    // A list of all locales that are supported
    locales: [
      'de-DE', 'de-CH', 'de-AT',
      'en-US', 'en-UK',
      'es-ES',
      'tr-TR',
      'sq-AL',
      'it-IT',
      'fr-FR',
      'hr-HR',
      'bs-BA',
      'ar-SA'
    ],
  
    // Used when no locale matches
    defaultLocale: 'en-US'
  });
  
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);