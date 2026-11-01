import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { siteLinks } from '@/lib/site';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';
import { BauhausFooterNav } from './bauhaus-footer-nav';

describe('BauhausFooterNav', () => {
  it.each([
    { locale: 'en', messages: enMessages, builtBy: 'Built by' },
    { locale: 'fr', messages: frMessages, builtBy: 'Conçu par' },
  ])('renders the $locale legal links and the GitHub credit', ({ locale, messages, builtBy }) => {
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <BauhausFooterNav />
      </NextIntlClientProvider>
    );
    const t = messages.HomePage;

    expect(screen.getByRole('navigation', { name: t.bauhausNavLabel })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: t.bauhausPrivacy })).toHaveAttribute(
      'href',
      siteLinks.privacy
    );
    expect(screen.getByRole('link', { name: t.bauhausTerms })).toHaveAttribute(
      'href',
      siteLinks.terms
    );

    expect(screen.getByText(builtBy).closest('a')).toBeNull();
    const creditLink = screen.getByRole('link', { name: /^Luidgi/ });
    expect(creditLink).toHaveTextContent(/^Luidgi$/);
    expect(creditLink).toHaveAttribute('href', siteLinks.github);
    expect(creditLink).toHaveAttribute('target', '_blank');
    expect(creditLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(creditLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });
});
