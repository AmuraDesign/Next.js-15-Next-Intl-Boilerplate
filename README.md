# Next.js 15 + next-intl Multi-Locale Boilerplate

## 🛠️ Tech Stack

- **Next.js 15.3+** (App Router)
- **React 19**
- **TypeScript 5**
- **next-intl 4** – advanced internationalization
- **Tailwind CSS 4**
- **@headlessui/react** & **@heroicons/react** – accessible UI components & icons
- **PostCSS 8** – for Tailwind
- **ESLint 9** + `eslint-config-next` – code quality & formatting
- **Cookie-based locale persistence**
- **Automatic SEO & Open Graph (OG) image generation**
- **Automatic multilingual sitemap generation** with hreflang support
- **Full SSG/SSR/ISR support**

---

A professional, modern starter for **Next.js 15** apps with **fully dynamic internationalization (i18n)** using [next-intl](https://next-intl-docs.vercel.app/), SEO best practices, localizable metadata, Open Graph images per page & locale, and robust 404/catch-all handling.
Ideal for multilingual SaaS, corporate sites, and any app where localization, SEO, and user experience matter.

## ✨ Features

- **Full SSR/SSG support** using Next.js App Router (15.x)
- **Dynamic locale subpaths** (e.g., `/de-CH/ueber-uns`, `/en-US/about`, `/fr-FR/a-propos`, `/ar-SA/عنّا`)
- **Locale-aware navigation** and links everywhere, using next-intl
- **SEO: Localized metadata** (`generateMetadata` API) for every page
- **Dynamic Open Graph images** (OG) – rendered per page and per locale, with translation
- **Automatic language detection** and locale redirect via middleware (incl. cookie support)
- **Custom 404 page** (localized), plus robust `[...rest]` catch-all route
- **Locale switcher** that persists preference in a cookie
- **Responsive navigation:** desktop & mobile menus with translation
- **Production-ready folder structure:** easy to extend with new pages and locales
- **TypeScript**, ESLint and Tailwind CSS (v4)
- **All translation messages in `/messages` as simple JSON** (per locale)
- **RTL support** for Arabic language
- **13 pre-configured locales** with proper translations

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (required for Next.js 15)
- **pnpm** (recommended), npm, or yarn

### 1. Clone and Install

```bash
git clone https://github.com/AmuraDesign/Next.js-15-Next-Intl-Boilerplate
cd Next.js-15-Next-Intl-Boilerplate
pnpm install   # or npm install or yarn
```

### 2. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be auto-redirected to your preferred locale, and can switch between all configured languages.

### 3. Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production (also generates sitemap)
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors automatically
pnpm type-check   # Run TypeScript type checking
```

---

## 🌐 Supported Locales

The boilerplate comes with **13 pre-configured locales**:

| Locale  | Language | Country        | Example URL             |
| ------- | -------- | -------------- | ----------------------- |
| `de-DE` | German   | Germany        | `/de-DE/ueber-uns`      |
| `de-CH` | German   | Switzerland    | `/de-CH/ueber-uns`      |
| `de-AT` | German   | Austria        | `/de-AT/ueber-uns`      |
| `en-US` | English  | United States  | `/en-US/about`          |
| `en-UK` | English  | United Kingdom | `/en-UK/about`          |
| `fr-FR` | French   | France         | `/fr-FR/a-propos`       |
| `it-IT` | Italian  | Italy          | `/it-IT/chi-siamo`      |
| `es-ES` | Spanish  | Spain          | `/es-ES/sobre-nosotros` |
| `tr-TR` | Turkish  | Turkey         | `/tr-TR/hakkimizda`     |
| `sq-AL` | Albanian | Albania        | `/sq-AL/rreth-nesh`     |
| `hr-HR` | Croatian | Croatia        | `/hr-HR/o-nama`         |
| `bs-BA` | Bosnian  | Bosnia         | `/bs-BA/o-nama`         |
| `ar-SA` | Arabic   | Saudi Arabia   | `/ar-SA/عنّا`           |

---

## 🗂️ Folder Structure

```
src/
  app/
    [locale]/
      about/
        opengraph-image.tsx    # OG image for /about (dynamic per locale)
        page.tsx               # About page, fully localized, with SEO metadata
      [...rest]/
        page.tsx               # Catch-all, triggers 404 for unknown subpages
      not-found.tsx            # Localized 404 page
      opengraph-image.tsx      # OG image for homepage
      layout.tsx               # Locale layout, loads translations & sets direction
      page.tsx                 # Home page, fully localized, with SEO metadata
  components/
    Header.tsx                 # Sticky app bar with navigation & locale switcher
    LocaleSwitcher.tsx         # Dropdown for changing language (with cookie)
    MobileMenu.tsx             # Mobile nav menu (hamburger)
    Navigation.tsx             # Desktop navigation
  i18n/
    next-sitemap.routingData.js # Routing data for sitemap generation
    request.ts                 # Loads messages for current locale (SSR)
    routing.ts                 # Defines locales, pathnames, i18n navigation
  middleware.ts                # Redirects and enforces locale paths
  globals.css                  # Global styles (Tailwind CSS 4)
messages/
  de-DE.json                   # German (Germany) translations
  en-US.json                   # English (US) translations
  fr-FR.json                   # French translations
  # ... 10 more locale files
next-sitemap.config.js         # Sitemap configuration
next.config.ts                 # Next.js config with next-intl plugin
postcss.config.mjs             # PostCSS config for Tailwind
tsconfig.json                  # TypeScript configuration
package.json                   # Dependencies and scripts
public/
  robots.txt                   # Generated robots.txt with sitemap reference
  sitemap.xml                  # Generated sitemap index
  sitemap-0.xml               # Generated main sitemap with hreflang tags
```

---

## 🌐 Internationalization (i18n)

### Configuration

- **Locales** are defined in [`src/i18n/routing.ts`](src/i18n/routing.ts)
- **Localized URLs** (e.g., `/de-CH/ueber-uns`, `/en-US/about`) are mapped in the same file via the `pathnames` property
- **Translations** for each language are stored in `/messages/{locale}.json`
- **Translation hooks** (`useTranslations`) and the i18n-aware `Link` component are used everywhere

### Locale Detection and Persistence

- Users are redirected to their preferred locale (from cookie or browser) via [`src/middleware.ts`](src/middleware.ts)
- Changing the language in the `LocaleSwitcher` sets a `NEXT_LOCALE` cookie for one year
- The middleware handles all locale routing automatically

### Adding a New Locale

1. **Add your locale code** to `src/i18n/routing.ts` in the `locales` array
2. **Map pathnames** for new routes/pages as needed
3. **Create** a new translation file in `/messages/`, e.g. `es-ES.json`
4. **Add translation keys** as needed (see example files)
5. **Add locale data** to `LocaleSwitcher.tsx` (name and flag)

### Translation Structure

Each locale file follows this structure:

```json
{
  "HomePage": {
    "title": "Welcome!",
    "about": "Go to the about page",
    "meta": {
      "title": "Page Title",
      "description": "Page description",
      "ogImageTitle": "OG Image Title",
      "ogImageDescription": "OG Image Description",
      "ogImageBrand": "Brand Name"
    }
  },
  "Header": {
    "navigation": {
      "home": "Home",
      "about": "About",
      "openMenu": "Open menu",
      "closeMenu": "Close menu"
    }
  }
}
```

---

## 🧑‍💻 Adding New Pages

### 1. Create the Page Component

Create a new folder in `src/app/[locale]/` for your page:

```typescript
// src/app/[locale]/contact/page.tsx
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    // ... other metadata
  };
}

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("content")}</p>
    </div>
  );
}
```

### 2. Add Route Mapping

Update `src/i18n/routing.ts`:

```typescript
pathnames: {
  '/': { /* ... */ },
  '/about': { /* ... */ },
  '/contact': {
    'de-DE': '/kontakt',
    'en-US': '/contact',
    'fr-FR': '/contact',
    // ... all other locales
  }
}
```

### 3. Add Navigation Links

Update `src/components/Navigation.tsx` and `src/components/MobileMenu.tsx`:

```typescript
<Link href="/contact" className="...">
  {t("contact")}
</Link>
```

### 4. Add Translations

Add to all locale files in `/messages/`:

```json
{
  "ContactPage": {
    "title": "Contact Us",
    "content": "Get in touch with us...",
    "meta": {
      "title": "Contact Us - Your Site",
      "description": "Get in touch with us..."
    }
  },
  "Header": {
    "navigation": {
      "contact": "Contact"
    }
  }
}
```

### 5. Update Sitemap (Optional)

Add to `src/i18n/next-sitemap.routingData.js`:

```javascript
const pathnames = {
  "/contact": {
    "de-DE": "/kontakt",
    "en-US": "/contact",
    // ... all locales
  },
};
```

---

## 🔎 SEO & Metadata

### Per-Page SEO

- Uses **`generateMetadata`** (Next.js 15+) for per-locale, per-page SEO tags
- **Open Graph (OG) images** are generated **dynamically** per page and locale
- Twitter Card metadata included as well

### Open Graph Images

Each page can have its own dynamic OG image:

```typescript
// src/app/[locale]/contact/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "ContactPage",
  });

  return new ImageResponse(
    (
      <div
        style={
          {
            /* ... */
          }
        }
      >
        <div>{t("meta.ogImageTitle")}</div>
        <div>{t("meta.ogImageDescription")}</div>
      </div>
    ),
    size
  );
}
```

---

## 🗺️ Sitemap & SEO Setup

The boilerplate uses **next-sitemap** for automatic generation of multilingual sitemaps with complete hreflang support.

### Configuration

**`next-sitemap.config.js`** - Main configuration file:

- Automatically generates all localized URLs based on routing data
- Creates hreflang tags for each language
- Configures sitemap size, change frequency, and priority

**`src/i18n/next-sitemap.routingData.js`** - Routing data for sitemap:

- Defines all supported locales
- Maps base paths to localized URLs

### Automatic Generation

The sitemap is automatically generated after each build:

```bash
pnpm build  # Also automatically generates the sitemap
```

**Generated files:**

- `public/sitemap.xml` - Sitemap index (references sitemap-0.xml)
- `public/sitemap-0.xml` - Main sitemap with all URLs and hreflang tags
- `public/robots.txt` - Robots file with sitemap reference

### Environment Variables

**`.env.local`** (optional):

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

If not set, `http://localhost:3000` is used as default.

---

## 📱 Responsive Navigation

- **Desktop navigation**: Always visible on `md+` screens, fully localized
- **Mobile menu**: Hamburger button with a translated menu, closes on link click
- **Locale switcher**: Dropdown, shows flag and language, sets cookie and navigates instantly

---

## 🛡️ 404 & Catch-All

- **Custom 404 page** (localized) at `[locale]/not-found.tsx`
- **Catch-all route** (`[...rest]/page.tsx`) that triggers the 404 for any unknown subroutes under any locale

---

## 🖼️ Open Graph Image Customization

- Each route/locale can have its own Open Graph image
- The image is fully localizable (translations are fetched at runtime)
- For RTL (e.g. Arabic), adjust OG image rendering as needed

---

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)

```typescript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {};

export default withNextIntl(nextConfig);
```

### TypeScript Configuration (`tsconfig.json`)

Includes path mapping for `@/*` to `./src/*` and Next.js specific settings.

### PostCSS Configuration (`postcss.config.mjs`)

Configured for Tailwind CSS 4:

```javascript
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

---

## 💡 Best Practices

- **All navigation and URLs** use next-intl's `Link` and helpers – no hardcoded locale strings!
- **Locale is enforced in the URL** via middleware (no fallback to non-locale root)
- **All content, navigation, and metadata** are translatable and locale-aware
- **All translation keys** are type-safe (thanks to TypeScript and next-intl)
- **SEO and social sharing** work for every language, everywhere
- **Use namespaces** in translation files for better organization
- **Always await params** in Next.js 15 App Router functions

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables if needed
4. Deploy!

### Other Platforms

The boilerplate works with any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- etc.

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [next-sitemap Documentation](https://github.com/iamvishnusankar/next-sitemap)
- [Open Graph image API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Vercel - Internationalized Routing](https://vercel.com/docs/concepts/internationalization/)
- [Google - hreflang Best Practices](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🧑‍🎨 Credits

Made by [AmuraDesign.ch](https://amuradesign.ch)
Fullstack Web Developer, Bern, Switzerland

**Special thanks to [@kvcli](https://github.com/kvcli) for adding Arabic language support and RTL functionality.**

---

## 📄 License

MIT — see [LICENSE](LICENSE)
