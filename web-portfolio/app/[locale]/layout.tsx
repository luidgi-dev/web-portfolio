import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { DocumentShell } from '@/components/document-shell';
import { ThemeProvider } from '@/components/theme-provider';
import { routing } from '@/i18n/routing';
import { localeAlternates, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: hasLocale(routing.locales, locale) ? localeAlternates(locale) : undefined,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <DocumentShell lang={locale}>
      <ThemeProvider>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </ThemeProvider>
    </DocumentShell>
  );
}
