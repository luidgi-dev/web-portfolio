import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSelector } from '@/components/ui/theme-selector';
import { HomePageContent } from './home-page-content';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

vi.mock('@/components/bento/cards/mock-wide-card', () => ({
  MockWideCard: () => (
    <section data-testid="mock-wide-card">
      <h2>Crafting Digital Experiences</h2>
    </section>
  ),
}));

vi.mock('@/components/bento/cards/mock-narrow-card', () => ({
  MockNarrowCard: () => <section data-testid="mock-narrow-card">Compact cell</section>,
}));

vi.mock('@/components/bento/cards/theme-card', () => ({
  ThemeCard: () => (
    <section data-testid="theme-card">
      <ThemeSelector />
    </section>
  ),
}));

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
  it('renders mock wide card heading in en', () => {
    renderHomePage('en', enMessages);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Crafting Digital Experiences' })
    ).toBeInTheDocument();
  });

  it('renders mock wide card on fr locale', () => {
    renderHomePage('fr', frMessages);

    expect(screen.getByTestId('mock-wide-card')).toBeInTheDocument();
  });

  it('renders the bento grid with three shell cells', () => {
    renderHomePage('en', enMessages);

    expect(screen.getByTestId('bento-grid')).toBeInTheDocument();
    expect(screen.getByTestId('mock-wide-card')).toBeInTheDocument();
    expect(screen.getByTestId('mock-narrow-card')).toBeInTheDocument();
    expect(screen.getByTestId('theme-card')).toBeInTheDocument();
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
