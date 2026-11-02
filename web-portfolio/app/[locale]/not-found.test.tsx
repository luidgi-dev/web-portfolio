import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';
import LocaleNotFound from './not-found';

describe('LocaleNotFound', () => {
  it.each([
    { locale: 'en', messages: enMessages, title: 'Page not found', home: /back to the homepage/i },
    { locale: 'fr', messages: frMessages, title: 'Page introuvable', home: /retour à l'accueil/i },
  ])(
    'renders the $locale page with a link to its homepage',
    ({ locale, messages, title, home }) => {
      render(
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleNotFound />
        </NextIntlClientProvider>
      );

      expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: home })).toHaveAttribute('href', `/${locale}`);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    }
  );
});
