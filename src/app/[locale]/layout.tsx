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
