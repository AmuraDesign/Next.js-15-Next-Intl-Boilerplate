import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  // Use the `useTranslations` hook to access translations for the HomePage namespace
  // This allows you to use the `t` function to get translated strings
  // For example, t('title') will return the translated string for the 'title'
  // Make sure to define the 'title' and 'about' keys in your messages files
  // (e.g., messages/en-US.json, messages/de-DE.json, etc.)

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <Link 
        href="/about" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {t('about')}
      </Link>
    </div>
  );
}