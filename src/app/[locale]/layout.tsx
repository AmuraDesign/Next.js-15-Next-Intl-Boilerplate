// Next.js 15+ metadata block for adaptive favicons, PWA, and touch icons (PNG only, dark+light, best practice)
export const metadata = {
  title: 'Next-Intl Boilerplate',                    // Default title for all pages
  description: 'Next-Intl Boilerplate',              // Default SEO description
  manifest: '/icon/site.webmanifest',                // PWA manifest for add-to-home and install
  applicationName: 'Next-Intl Boilerplate',          // App name for PWA and browsers

  icons: {
    icon: [
      // Adaptive PNG favicons for light and dark mode
      {
        url: '/icon/icon-96x96.png',
        href: '/icon/icon-96x96.png',
        media: '(prefers-color-scheme: light)',      // Shown in light mode
        sizes: '96x96'
      },
      {
        url: '/icon/icon-96x96-dark.png',
        href: '/icon/icon-96x96-dark.png',
        media: '(prefers-color-scheme: dark)',       // Shown in dark mode
        sizes: '96x96'
      },

      // Fallback ICO, used by legacy browsers
      {
        url: '/icon/favicon.ico',
        href: '/icon/favicon.ico'
      }
    ],
    apple: [
      // Apple Touch Icon for iOS/Android home screen (usually just one variant is enough)
      {
        url: '/icon/apple-touch-icon.png',
        href: '/icon/apple-touch-icon.png'
      }
      // Optionally: you could also add apple-touch-icon-dark.png with a media query,
      // but most devices/browsers ignore media queries for apple-touch-icon.
    ]
  }
}

// Viewport and theme color settings (Next.js 15.3+ best practice)
export const viewport = {
  themeColor: '#ffffff',           // Browser UI color (e.g. address bar)
  width: 'device-width',           // Responsive width for all devices
  initialScale: 1,                 // Initial zoom level
  maximumScale: 1,                 // Maximum zoom level
  userScalable: false,             // Disables user zoom (use with care for accessibility!)
};

/**
 * Root layout component for localized pages
 * 
 * Features:
 * - Internationalization support with Next.js App Router
 * - Dynamic locale routing with [locale] parameter
 * - RTL support for Arabic language
 * - Theme-aware styling
 * - SEO optimization with proper lang attributes
 * - Global header and main content area
 */

import { NextIntlClientProvider } from 'next-intl';      // Provider for translations context
import { getMessages } from 'next-intl/server';          // Server helper to load translations
import { notFound } from 'next/navigation';              // Next.js API for 404 handling
import { routing } from '@/i18n/routing';                // Locale configuration
import Header from '../../components/globals/header/Header';            // Main app header
import '../globals.css';                                // Global styles (Tailwind, theme variables, etc.)

/**
 * Main layout for all localized pages ([locale] segment)
 * 
 * Handles locale validation, message loading, and provides the basic page structure
 * with header and main content area. Supports RTL languages and theme-aware styling.
 */
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Extract the locale from the route params (async for Next.js App Router)
  const { locale } = await params;

  // Validate that the requested locale is supported
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load the translation messages for the selected locale
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}                        // Set the HTML lang attribute for SEO and accessibility
      className="h-full antialiased"
      dir={locale.startsWith('ar') ? 'rtl' : 'ltr'} // Set text direction (RTL for Arabic, LTR for others)
    >
      <body className="min-h-screen bg-background text-foreground">
        {/* Provide all translations to the React component tree */}
        <NextIntlClientProvider messages={messages}>
          {/* Global header with navigation, theme selector, and language switcher */}
          <Header />
          
          {/* Main content area with responsive padding and max width */}
          <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
