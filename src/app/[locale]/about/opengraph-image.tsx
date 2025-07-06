// src/app/[locale]/about/opengraph-image.tsx

import { ImageResponse } from 'next/og';               // Next.js API for dynamic Open Graph image generation
import { getTranslations } from 'next-intl/server';    // Server-side translation loader

// Define the recommended Open Graph image size (1200x630px)
export const size = {
  width: 1200,
  height: 630,
};
// Set the content type to PNG for OG images
export const contentType = 'image/png';

// Handler to generate the dynamic Open Graph image for the About page per locale
export default async function OGImage({ params }: { params: { locale: string } }) {
  // Load translations for the AboutPage namespace in the requested locale
  const t = await getTranslations({ locale: params.locale, namespace: 'AboutPage' });

  // Return a dynamically rendered PNG image, fully localized
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
          background: '#23272f', // dark background
        }}
      >
        {/* Main OG title (large, bold, white) */}
        <div style={{ fontSize: 66, fontWeight: 700, color: '#fff', marginBottom: 32 }}>
          {t('meta.ogImageTitle')}
        </div>
        {/* OG description (smaller, light color, centered) */}
        <div style={{ fontSize: 32, color: '#e2e8f0', textAlign: 'center', lineHeight: 1.4, maxWidth: 900 }}>
          {t('meta.ogImageDescription')}
        </div>
        {/* Brand/website name (emphasized, colored) */}
        <div style={{ fontSize: 30, color: '#7dd3fc', fontWeight: 700, letterSpacing: 1, marginTop: 50 }}>
          {t('meta.ogImageBrand')}
        </div>
      </div>
    ),
    size
  );
}
