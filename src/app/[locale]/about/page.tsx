// src/app/[locale]/about/page.tsx

import { useTranslations } from 'next-intl';        // Client-side translation hook
import { getTranslations } from 'next-intl/server'; // Server-side translation for metadata
import type { Metadata } from 'next';               // Next.js metadata type

// Generate SEO metadata per locale (Next.js 15.3+ best practice)
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Await and extract locale from params (async for Next.js App Router)
  const { locale } = await params;
  // Load translations for the AboutPage namespace in the current locale
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  // Return localized SEO metadata
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.ogTitle'),
      description: t('meta.description'),
      url: `http://localhost:3000/${locale}/about`
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description')
    }
  };
}

// About page component (localized)
export default function AboutPage() {
  // Use translations for the AboutPage namespace on the client side
  const t = useTranslations('AboutPage');
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p>{t('content')}</p>
    </div>
  );
}
