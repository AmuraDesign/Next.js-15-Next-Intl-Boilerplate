import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(de-DE|de-CH|de-AT|en-US|en-UK|es-ES|tr-TR|sq-AL|it-IT|fr-FR|hr-HR|bs-BA)/:path*']
  };
