import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorPage } from './error-page';

const home = { href: '/en', label: 'Back to the homepage' };

describe('ErrorPage', () => {
  it('shows the title as the page heading and focuses it', () => {
    render(<ErrorPage code="404" title="Page not found" body="Body" home={home} />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Page not found' });
    expect(heading).toHaveFocus();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('names the browser tab after the error', () => {
    render(<ErrorPage code="404" title="Page not found" body="Body" home={home} />);

    expect(document.title).toBe('Page not found');
  });

  it('links back to the given homepage and has no retry action by default', () => {
    render(<ErrorPage code="404" title="Page not found" body="Body" home={home} />);

    expect(screen.getByRole('link', { name: /back to the homepage/i })).toHaveAttribute(
      'href',
      '/en'
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onRetry from the retry action', () => {
    const onRetry = vi.fn();
    render(
      <ErrorPage
        code="500"
        title="Something went wrong on this page"
        body="Body"
        home={home}
        retry={{ label: 'Try again', onRetry }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('prints the requested path on a 404 poster', () => {
    window.history.pushState({}, '', '/en/does-not-exist');
    render(<ErrorPage code="404" title="Page not found" body="Body" home={home} />);

    expect(screen.getByText('/en/does-not-exist')).toBeInTheDocument();
  });

  it('prints the reference on a 500 poster, not the path', () => {
    window.history.pushState({}, '', '/en/projects');
    render(
      <ErrorPage
        code="500"
        title="Something went wrong on this page"
        body="Body"
        home={home}
        reference="Ref. 3f9a2c1e"
      />
    );

    expect(screen.getByText('Ref. 3f9a2c1e')).toBeInTheDocument();
    expect(screen.queryByText('/en/projects')).not.toBeInTheDocument();
  });
});
