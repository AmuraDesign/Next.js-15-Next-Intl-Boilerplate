import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  // Stellen Sie sicher, dass eine gültige Sprache verwendet wird
  if (!locale || !routing.locales.includes(locale as 
    | "de-DE" | "de-CH" | "de-AT"
    | "en-US" | "en-UK"
    | "es-ES"
    | "tr-TR"
    | "sq-AL"
    | "it-IT"
    | "fr-FR"
    | "hr-HR"
    | "bs-BA"
    | "ar-SA")) {
    locale = routing.defaultLocale;
  }
  
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});