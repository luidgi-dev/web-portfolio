import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import { LocaleSwitcher } from './locale-switcher';
import enMessages from '@/messages/en.json';

const replace = vi.fn();

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/',
}));

describe('LocaleSwitcher', () => {
  it('renders English first and Français second in a vertical group', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    const buttons = screen.getAllByRole('radio');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveAccessibleName('English');
    expect(buttons[1]).toHaveAccessibleName('Français');
    expect(screen.getByTestId('locale-switcher')).toHaveClass('flex-col');
  });

  it('marks the active locale as checked', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('radio', { name: 'English' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Français' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  });

  it('meets the minimum touch target height', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    for (const button of screen.getAllByRole('radio')) {
      expect(button).toHaveClass('min-h-[52px]');
    }
  });

  it('switches locale via router.replace while preserving the pathname', () => {
    replace.mockClear();

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Français' }));

    expect(replace).toHaveBeenCalledWith('/', { locale: 'fr' });
  });

  it('does not navigate when clicking the already active locale', () => {
    replace.mockClear();

    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    fireEvent.click(screen.getByRole('radio', { name: 'English' }));

    expect(replace).not.toHaveBeenCalled();
  });

  it('uses token-based active styles without hardcoded colors', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <LocaleSwitcher />
      </NextIntlClientProvider>
    );

    const activeButton = screen.getByRole('radio', { name: 'English' });
    expect(activeButton.className).toMatch(/bg-primary/);
    expect(activeButton.className).toMatch(/text-primary-foreground/);
    expect(activeButton.className).not.toMatch(/#[0-9a-f]{3,8}/i);
  });
});
