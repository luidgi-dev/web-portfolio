import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { HomePageContent } from './home-page-content';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

describe('HomePageContent', () => {
  it.each([
    ['en', enMessages, 'Crafting Digital Experiences with Warm Precision'],
    ['fr', frMessages, 'Créer des Expériences numériques avec précision'],
  ] as const)('renders translated hero heading in %s', (locale, messages, title) => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HomePageContent />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });

  it('renders the bento grid layout container', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <HomePageContent />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('bento-grid')).toBeInTheDocument();
  });
});
