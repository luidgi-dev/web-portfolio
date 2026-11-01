'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { ErrorPage } from '@/components/error/error-page';

export default function LocaleError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations('ErrorPage');
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // error.message stays in the console: it can carry server details.
  return (
    <ErrorPage
      code="500"
      title={t('errorTitle')}
      body={t('errorBody')}
      home={{ href: `/${locale}`, label: t('home') }}
      retry={{ label: t('retry'), onRetry: unstable_retry }}
      reference={error.digest && `${t('reference')} ${error.digest}`}
    />
  );
}
