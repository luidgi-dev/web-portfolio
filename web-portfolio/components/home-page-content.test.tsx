import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { HomePageContent } from './home-page-content';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

describe('HomePageContent', () => {
  it.each([
    ['en', enMessages, 'To get started, edit the page.tsx file.'],
    ['fr', frMessages, 'Pour commencer, modifiez le fichier page.tsx.'],
  ] as const)('renders translated title in %s', (locale, messages, title) => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HomePageContent />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });
});
