import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '@/components/theme-provider';
import { themes } from '@/lib/themes';
import { BentoCard } from './bento-card';

function renderBentoCard(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('BentoCard', () => {
  it('renders the structural mono label when provided', () => {
    renderBentoCard(
      <BentoCard label="Introduction">
        <p>Content</p>
      </BentoCard>
    );

    expect(screen.getByText('// Introduction')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('omits the label when not provided', () => {
    renderBentoCard(
      <BentoCard>
        <p>Content only</p>
      </BentoCard>
    );

    expect(screen.queryByText(/^\/\//)).not.toBeInTheDocument();
    expect(screen.getByText('Content only')).toBeInTheDocument();
  });

  it('applies colSpan via lookup classes', () => {
    renderBentoCard(
      <BentoCard colSpan={2} label="Wide">
        <p>Wide content</p>
      </BentoCard>
    );

    const section = screen.getByText('Wide content').closest('section');
    expect(section).toHaveClass('md:col-span-2');
  });

  it('applies rowSpan via lookup classes', () => {
    renderBentoCard(
      <BentoCard rowSpan={2} label="Tall">
        <p>Tall content</p>
      </BentoCard>
    );

    const section = screen.getByText('Tall content').closest('section');
    expect(section).toHaveClass('md:row-span-2');
  });

  it('applies padding by default', () => {
    renderBentoCard(
      <BentoCard label="Padded">
        <p>Padded content</p>
      </BentoCard>
    );

    const section = screen.getByText('Padded content').closest('section');
    expect(section).toHaveClass('p-6');
  });

  it('removes padding when padded is false', () => {
    renderBentoCard(
      <BentoCard padded={false}>
        <p>Edge content</p>
      </BentoCard>
    );

    const section = screen.getByText('Edge content').closest('section');
    expect(section).not.toHaveClass('p-6');
  });

  it('uses theme token classes only on the shell', () => {
    renderBentoCard(
      <BentoCard label="Tokens">
        <p>Token content</p>
      </BentoCard>
    );

    const section = screen.getByText('Token content').closest('section');
    expect(section).toHaveClass('bg-card', 'border-border');
    expect(section?.className).not.toMatch(/#[0-9a-f]{3,8}/i);
  });

  it.each(themes.map((theme) => [theme.id, theme.nameEn] as const))(
    'renders with theme %s (%s)',
    (themeId) => {
      document.documentElement.classList.remove('theme-01', 'theme-02', 'theme-03', 'theme-04');
      document.documentElement.classList.add(themeId);

      renderBentoCard(
        <BentoCard label="Theme">
          <p>Theme content</p>
        </BentoCard>
      );

      expect(screen.getByText('Theme content').closest('section')).toHaveClass('bg-card');
    }
  );
});
