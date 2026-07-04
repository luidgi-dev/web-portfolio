import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BentoCard } from './bento-card';

describe('BentoCard', () => {
  it('renders the structural mono label', () => {
    render(
      <BentoCard label="Introduction">
        <p>Content</p>
      </BentoCard>
    );

    expect(screen.getByText('// Introduction')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
