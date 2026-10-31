import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BreezeBlockSunlight } from './breeze-block-sunlight';

describe('BreezeBlockSunlight', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<BreezeBlockSunlight />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('gives each instance its own pattern, so two on a page do not share one', () => {
    const { container } = render(
      <>
        <BreezeBlockSunlight />
        <BreezeBlockSunlight />
      </>
    );
    const ids = [...container.querySelectorAll('pattern')].map((p) => p.id);
    expect(new Set(ids).size).toBe(2);
    for (const rect of container.querySelectorAll('svg > rect')) {
      expect(ids.map((id) => `url(#${id})`)).toContain(rect.getAttribute('fill'));
    }
  });
});
