import { DM_Mono, DM_Sans, Playfair_Display } from 'next/font/google';
import '../globals.css';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { FilmNoiseOverlay } from '@/components/film-noise-overlay';
import { ThemeProvider } from '@/components/theme-provider';
import { routing } from '@/i18n/routing';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '900'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Mid-Century Modern portfolio showcasing digital craft and experience design.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable} theme-03 h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <FilmNoiseOverlay />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
