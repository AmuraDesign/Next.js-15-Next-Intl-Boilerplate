// src/app/[locale]/page.tsx

import { useTranslations } from 'next-intl';              // Client-side translation hook
import { getTranslations } from 'next-intl/server';       // Server-side translation helper for metadata
import type { Metadata } from 'next';                     // Next.js metadata typing
import { routing } from '@/i18n/routing';                 // Locale list for generateStaticParams
import { Link } from '@/i18n/routing';                    // i18n-aware Link component

// Generate static params for all supported locales (used for SSG)
export async function generateStaticParams() {
  // Return one entry for each supported locale
  return routing.locales.map((locale) => ({ locale }));
}

// Allow Next.js to statically generate this page if possible (default behavior)
export const dynamic = 'auto'; // Enable static generation when possible, fallback to dynamic if needed

// Optional: Use revalidate if you want ISR (Incremental Static Regeneration)
// export const revalidate = 3600; // Rebuild every hour (optional)

// Generate localized SEO metadata per locale (Next.js 15+ best practice)
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Wait for the locale parameter (required in App Router)
  const { locale } = await params;

  // Load translation messages from the HomePage namespace
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  // Return localized SEO metadata
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.ogImageTitle'),
      description: t('meta.ogImageDescription'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`, // Uses environment variable
      // The OG image itself is loaded automatically from opengraph-image.tsx
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    }
  };
}

// Fully localized homepage component
export default function HomePage() {
  // Load translations for this page (HomePage namespace)
  const t = useTranslations('HomePage');

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-4xl font-bold text-foreground">{t('title')}</h1>
      
      {/* Theme demonstration section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">{t('themeDemo.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Primary color example */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h3 className="font-medium text-primary mb-2">{t('themeDemo.primaryColor')}</h3>
            <p className="text-foreground text-sm">{t('themeDemo.primaryDescription')}</p>
          </div>
          
          {/* Secondary color example */}
          <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <h3 className="font-medium text-secondary mb-2">{t('themeDemo.secondaryColor')}</h3>
            <p className="text-foreground text-sm">{t('themeDemo.secondaryDescription')}</p>
          </div>
          
          {/* Accent color example */}
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <h3 className="font-medium text-accent mb-2">{t('themeDemo.accentColor')}</h3>
            <p className="text-foreground text-sm">{t('themeDemo.accentDescription')}</p>
          </div>
        </div>
        
        {/* Interactive elements */}
        <div className="space-y-3">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200">
            {t('themeDemo.primaryButton')}
          </button>
          
          <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors duration-200 ml-2">
            {t('themeDemo.secondaryButton')}
          </button>
          
          <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors duration-200 ml-2">
            {t('themeDemo.accentButton')}
          </button>
        </div>
      </div>
      
      {/* Link to About page with localized label */}
      <div className="pt-4">
        <Link 
          href="/about" 
          className="text-primary hover:text-primary/80 underline transition-colors duration-200"
        >
          {t('about')}
        </Link>
      </div>
    </div>
  );
}
