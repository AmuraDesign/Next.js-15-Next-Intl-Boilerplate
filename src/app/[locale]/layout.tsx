import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '../../components/Header';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params; // Await the params object
  const { locale } = resolvedParams;

  // Ensure the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en-US' | 'de-DE' | 'de-CH' | 'de-AT' | 'es-ES' | 'fr-FR' | 'hr-HR' | 'bs-BA' | 'it-IT' | 'sq-AL' | 'tr-TR')) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background text-foreground">
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