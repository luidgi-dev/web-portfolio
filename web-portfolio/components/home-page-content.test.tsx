import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from './theme-provider';
import { HomePageContent } from './home-page-content';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

function renderHomePage(locale: 'en' | 'fr', messages: typeof enMessages) {
  return render(
    <ThemeProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HomePageContent />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}

describe('HomePageContent', () => {
  it.each([
    ['en', enMessages, 'Crafting Digital Experiences with Warm Precision'],
    ['fr', frMessages, 'Créer des Expériences numériques avec précision'],
  ] as const)('renders translated hero heading in %s', (locale, messages, title) => {
    renderHomePage(locale, messages);

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
  });

  it('renders the bento grid layout container', () => {
    renderHomePage('en', enMessages);

    expect(screen.getByTestId('bento-grid')).toBeInTheDocument();
  });

  it('renders the theme selector inside the bento grid', () => {
    renderHomePage('en', enMessages);

    expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
  });

  it('switches theme when an ambiance is selected', () => {
    renderHomePage('en', enMessages);

    fireEvent.click(screen.getByRole('radio', { name: /02 Terracotta Sand/i }));

    expect(document.documentElement.classList.contains('theme-02')).toBe(true);
  });
});
