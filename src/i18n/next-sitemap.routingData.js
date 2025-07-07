// src/i18n/next-sitemap.routingData.js
// This file contains the routing data used by next-sitemap to generate
// multilingual sitemaps with proper hreflang tags for SEO

// All supported locales for the application
const locales = [
  "de-DE",
  "de-CH",
  "de-AT", // German variants
  "en-US",
  "en-GB", // English variants
  "es-ES", // Spanish
  "tr-TR", // Turkish
  "sq-AL", // Albanian
  "it-IT", // Italian
  "fr-FR", // French
  "hr-HR", // Croatian
  "bs-BA", // Bosnian
  "ar-SA", // Arabic (Saudi Arabia)
];

// Mapping of base paths to localized URLs for each locale
// This ensures that each page has proper localized URLs in the sitemap
const pathnames = {
  // Homepage - same path for all locales
  "/": {
    "de-DE": "/",
    "de-CH": "/",
    "de-AT": "/",
    "en-US": "/",
    "en-GB": "/",
    "fr-FR": "/",
    "it-IT": "/",
    "es-ES": "/",
    "tr-TR": "/",
    "sq-AL": "/",
    "hr-HR": "/",
    "bs-BA": "/",
    "ar-SA": "/",
  },
  // About page - localized paths for each language
  "/about": {
    "de-DE": "/ueber-uns", // German: "About us"
    "de-CH": "/ueber-uns", // Swiss German: "About us"
    "de-AT": "/ueber-uns", // Austrian German: "About us"
    "en-US": "/about", // US English: "About"
    "en-GB": "/about", // UK English: "About"
    "fr-FR": "/a-propos", // French: "About"
    "it-IT": "/chi-siamo", // Italian: "Who we are"
    "es-ES": "/sobre-nosotros", // Spanish: "About us"
    "tr-TR": "/hakkimizda", // Turkish: "About us"
    "sq-AL": "/rreth-nesh", // Albanian: "About us"
    "hr-HR": "/o-nama", // Croatian: "About us"
    "bs-BA": "/o-nama", // Bosnian: "About us"
    "ar-SA": "/عنّا", // Arabic: "About us"
  },
};

// Export the routing data for next-sitemap configuration
module.exports = { locales, pathnames };
