// src/app/[locale]/page.tsx

import { useTranslations } from 'next-intl';      // Client-side translation hook
import { getTranslations } from 'next-intl/server'; // Server-side translation helper (for metadata)
import type { Metadata } from 'next';             // Next.js metadata typing
import { Link } from '@/i18n/routing';            // i18n-aware Link component

// Generate SEO metadata per locale (Next.js 15.3+ best practice)
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Extract locale from params (async for consistency with Next.js App Router)
  const { locale } = await params;

  // Load translations for the "HomePage" namespace in the current locale
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  // Return SEO metadata, including Open Graph and Twitter info, using localized translations
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.ogImageTitle'),
      description: t('meta.ogImageDescription'),
      url: `http://localhost:3000/${locale}`,
      // The Open Graph image is picked up automatically from the OG image segment
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    }
  };
}

// Home page component, fully localized
export default function HomePage() {
  // Use the translations for the "HomePage" namespace on the client side
  const t = useTranslations('HomePage');
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      {/* About page link, localized label */}
      <Link 
        href="/about" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {t('about')}
      </Link>
    </div>
  );
}
