const { locales, pathnames } = require("./src/i18n/next-sitemap.routingData");

// Get the site URL from environment variable or use localhost as fallback
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Generates all localized URLs for the sitemap
 * This function creates entries for each locale and path combination
 * with proper hreflang tags for SEO
 */
function generateLocalizedPaths() {
  const paths = [];

  // Iterate through all base paths and their localized mappings
  for (const [basePath, localesMap] of Object.entries(pathnames)) {
    // For each locale, create a sitemap entry
    for (const locale of locales) {
      const localizedPath = localesMap[locale];
      if (localizedPath !== undefined) {
        const url = `/${locale}${localizedPath}`;

        paths.push({
          loc: `${siteUrl}${url}`,
          // Store alternative language versions under `alternateRefs`
          // This is the field that next-sitemap expects for hreflang tags
          alternateRefs: locales
            .map((l) => {
              const altPath = localesMap[l];
              return altPath
                ? {
                    hreflang: l,
                    href: `${siteUrl}/${l}${altPath}`,
                  }
                : null;
            })
            .filter(Boolean),
        });
      }
    }
  }

  return paths;
}

// next-sitemap configuration
module.exports = {
  // Base URL of the site
  siteUrl,

  // Generate robots.txt automatically
  generateRobotsTxt: true,

  // Maximum URLs per sitemap file (creates sitemap-0.xml, sitemap-1.xml, etc.)
  sitemapSize: 5000,

  // How often the page is likely to change
  changefreq: "daily",

  // Priority of this URL relative to other URLs on your site
  priority: 0.7,

  // Add custom paths to the sitemap
  additionalPaths: async () => generateLocalizedPaths(),

  // Transform function to customize each sitemap entry
  transform: async (config, path) => {
    return {
      loc: path.loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),

      // next-sitemap uses this field to generate <xhtml:link> hreflang tags
      alternateRefs: path.alternateRefs || [],
    };
  },
};
