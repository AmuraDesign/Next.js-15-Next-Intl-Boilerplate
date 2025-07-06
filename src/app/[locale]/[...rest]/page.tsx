// src/app/[locale]/[...rest]/page.tsx

import { notFound } from 'next/navigation'; // Next.js function to trigger a 404 response

// Catch-all route for any unmatched path under [locale]
// This ensures that unknown or non-existent routes show the custom 404 page
export default function CatchAllPage() {
  notFound(); // Immediately trigger the 404 page
}
