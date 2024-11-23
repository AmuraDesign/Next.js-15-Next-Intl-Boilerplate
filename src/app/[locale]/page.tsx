import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
 
export default function HomePage() {
  const t = useTranslations('HomePage');
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