// src/app/[locale]/about/page.tsx

import { useTranslations } from 'next-intl';              // Client-side translation hook
import { getTranslations } from 'next-intl/server';       // Server-side translation helper (for metadata)
import type { Metadata } from 'next';                     // Next.js metadata type
import { routing } from '@/i18n/routing';                 // Locale definitions for generateStaticParams

// Generate static params for all supported locales (enables SSG)
export async function generateStaticParams() {
  // Map each supported locale to the expected params object
  return routing.locales.map((locale) => ({ locale }));
}

// Allow Next.js to statically generate this page if possible (default behavior)
export const dynamic = 'auto'; // Enable static generation when possible, fallback to dynamic if needed

// Optional: If you want to use ISR (rebuild every N seconds), you could also add:
// export const revalidate = 3600; // Revalidate every 1 hour (optional)

// Generate localized SEO metadata per page/locale (Next.js 15+ best practice)
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Await and extract the locale from params (needed in App Router)
  const { locale } = await params;

  // Load translation messages from the AboutPage namespace
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  // Return full SEO metadata, including Open Graph & Twitter cards
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.ogTitle'),
      description: t('meta.description'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/about` // Uses environment variable
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description')
    }
  };
}

// The fully localized About page component
export default function AboutPage() {
  // Load translations for this page (AboutPage namespace)
  const t = useTranslations('AboutPage');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p>{t('content')}</p>
    </div>
  );
}
