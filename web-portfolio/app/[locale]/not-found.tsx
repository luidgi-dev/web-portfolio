import { useLocale, useTranslations } from 'next-intl';
import { ErrorPage } from '@/components/error/error-page';

export default function LocaleNotFound() {
  const t = useTranslations('ErrorPage');
  const locale = useLocale();

  return (
    <ErrorPage
      code="404"
      title={t('notFoundTitle')}
      body={t('notFoundBody')}
      home={{ href: `/${locale}`, label: t('home') }}
    />
  );
}
