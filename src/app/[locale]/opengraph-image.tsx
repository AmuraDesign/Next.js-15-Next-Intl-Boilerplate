// src/app/[locale]/opengraph-image.tsx

import { ImageResponse } from 'next/og';              // Next.js API for dynamic Open Graph image generation
import { getTranslations } from 'next-intl/server';   // Server-side translation loader

// Define the standard Open Graph image size (1200x630 is recommended by most social platforms)
export const size = {
  width: 1200,
  height: 630,
};
// Content type for OG images
export const contentType = 'image/png';

// Handler to generate a dynamic Open Graph image for each locale
export default async function OGImage({ params }: { params: { locale: string } }) {
  // Load HomePage translations for the current locale (for OG image content)
  const t = await getTranslations({ locale: params.locale, namespace: 'HomePage' });

  // Return a dynamically rendered PNG image with localized content
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0ea5e9', // Tailwind's sky-500
        }}
      >
        {/* Main OG title (large, bold, white) */}
        <div style={{ fontSize: 68, fontWeight: 700, color: '#fff', marginBottom: 32, letterSpacing: 2 }}>
          {t('meta.ogImageTitle')}
        </div>
        {/* OG description (smaller, light color, centered) */}
        <div style={{ fontSize: 32, color: '#f0f9ff', textAlign: 'center', lineHeight: 1.4, maxWidth: 900 }}>
          {t('meta.ogImageDescription')}
        </div>
        {/* Brand/website name (emphasized) */}
        <div style={{ fontSize: 32, color: '#bae6fd', fontWeight: 700, letterSpacing: 1, marginTop: 50 }}>
          {t('meta.ogImageBrand')}
        </div>
      </div>
    ),
    size
  );
}
