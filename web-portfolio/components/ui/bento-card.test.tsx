import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../theme-provider';
import { BentoCard } from './bento-card';

describe('BentoCard', () => {
  it('renders the structural mono label', () => {
    render(
      <ThemeProvider>
        <BentoCard label="Introduction">
          <p>Content</p>
        </BentoCard>
      </ThemeProvider>
    );

    expect(screen.getByText('// Introduction')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
