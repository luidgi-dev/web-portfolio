import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it, vi } from 'vitest';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';
import LocaleError from './error';

function renderError(locale: 'en' | 'fr', error: Error & { digest?: string }, retry = vi.fn()) {
  render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? enMessages : frMessages}>
      <LocaleError error={error} unstable_retry={retry} />
    </NextIntlClientProvider>
  );
  return retry;
}

describe('LocaleError', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    consoleError.mockClear();
  });

  it('never shows the error message to the visitor, only logs it', () => {
    const error = Object.assign(new Error('secret detail'), { digest: '3f9a2c1e' });
    renderError('en', error);

    expect(screen.queryByText(/secret detail/)).not.toBeInTheDocument();
    expect(screen.getByText('Ref. 3f9a2c1e')).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  it('retries the segment from the retry action', () => {
    const retry = renderError('en', new Error('boom'));

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(retry).toHaveBeenCalledOnce();
  });

  it('speaks French and links to the French homepage', () => {
    renderError('fr', new Error('boom'));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Un problème est survenu sur cette page' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /retour à l'accueil/i })).toHaveAttribute(
      'href',
      '/fr'
    );
  });
});
