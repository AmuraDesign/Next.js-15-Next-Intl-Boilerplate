// src/app/[locale]/layout.tsx

import { NextIntlClientProvider } from 'next-intl';      // Provider for translations context
import { getMessages } from 'next-intl/server';          // Server helper to load translations
import { notFound } from 'next/navigation';              // Next.js API for 404 handling
import { routing } from '@/i18n/routing';                // Locale config
import Header from '../../components/Header';            // Main app header
import '../globals.css';                                // Global styles (Tailwind, etc.)

// Main layout for all localized pages ([locale] segment)
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Extract the locale from the route params (async for Next.js App Router)
  const { locale } = await params;

  // If the locale is not supported, trigger a 404
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load the messages for the selected locale
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}                        // Set the HTML lang attribute for SEO and accessibility
      className="h-full antialiased"
      dir={locale.startsWith('ar') ? 'rtl' : 'ltr'} // Set text direction (RTL for Arabic)
    >
      <body className="min-h-screen bg-background text-foreground">
        {/* Provide all translations to the React tree */}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
