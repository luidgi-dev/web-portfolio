import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSelector } from '@/components/ui/theme-selector';
import { HomePageContent } from './home-page-content';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

vi.mock('@/components/bento/cards/hero-card', () => ({
  HeroCard: () => (
    <section data-testid="hero-card">
      <h1>Building software people actually use.</h1>
    </section>
  ),
}));

vi.mock('@/components/bento/cards/strive-card', () => ({
  StriveCard: () => <section data-testid="strive-card">Strive</section>,
}));

vi.mock('@/components/bento/cards/profile-card', () => ({
  ProfileCard: () => <section data-testid="profile-card">Profile</section>,
}));

vi.mock('@/components/bento/cards/stack-card', () => ({
  StackCard: () => <section data-testid="stack-card">Stack</section>,
}));

vi.mock('@/components/bento/cards/contact-card', () => ({
  ContactCard: () => <section data-testid="contact-card">Contact</section>,
}));

vi.mock('@/components/bento/cards/language-card', () => ({
  LanguageCard: () => (
    <section data-testid="language-card">
      <div data-testid="locale-switcher" />
    </section>
  ),
}));

vi.mock('@/components/bento/cards/atelier-card', () => ({
  AtelierCard: () => <section data-testid="atelier-card">Atelier</section>,
}));

vi.mock('@/components/bento/cards/professional-work-card', () => ({
  ProfessionalWorkCard: () => (
    <section data-testid="professional-work-card">Professional work</section>
  ),
}));

vi.mock('@/components/bento/cards/bauhaus-geometry-card', () => ({
  BauhausGeometryCard: () => <section data-testid="bauhaus-geometry-card">Geometry</section>,
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
  it('renders the hero heading in en', () => {
    renderHomePage('en', enMessages);

    expect(
      screen.getByRole('heading', { level: 1, name: /Building software people actually use/i })
    ).toBeInTheDocument();
  });

  it('renders the hero card on fr locale', () => {
    renderHomePage('fr', frMessages);

    expect(screen.getByTestId('hero-card')).toBeInTheDocument();
  });

  it('renders the bento grid with all home cards', () => {
    renderHomePage('en', enMessages);

    expect(screen.getByTestId('bento-grid')).toBeInTheDocument();
    expect(screen.getByTestId('hero-card')).toBeInTheDocument();
    expect(screen.getByTestId('strive-card')).toBeInTheDocument();
    expect(screen.getByTestId('profile-card')).toBeInTheDocument();
    expect(screen.getByTestId('stack-card')).toBeInTheDocument();
    expect(screen.getByTestId('contact-card')).toBeInTheDocument();
    expect(screen.getByTestId('language-card')).toBeInTheDocument();
    expect(screen.getByTestId('theme-card')).toBeInTheDocument();
    expect(screen.getByTestId('atelier-card')).toBeInTheDocument();
    expect(screen.getByTestId('professional-work-card')).toBeInTheDocument();
    expect(screen.getByTestId('bauhaus-geometry-card')).toBeInTheDocument();
  });

  it('renders the locale switcher inside the bento grid', () => {
    renderHomePage('en', enMessages);

    expect(screen.getByTestId('locale-switcher')).toBeInTheDocument();
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
