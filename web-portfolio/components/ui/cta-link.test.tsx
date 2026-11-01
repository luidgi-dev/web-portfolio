import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CtaLink } from './cta-link';

describe('CtaLink', () => {
  it('renders a link when given an href', () => {
    render(<CtaLink href="/en" text="Back to the homepage" />);

    expect(screen.getByRole('link', { name: /back to the homepage/i })).toHaveAttribute(
      'href',
      '/en'
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a button that calls onClick', () => {
    const onClick = vi.fn();
    render(<CtaLink onClick={onClick} text="Try again" />);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
