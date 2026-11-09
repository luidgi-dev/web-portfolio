import { describe, expect, it } from 'vitest';
import manifest from './manifest';

describe('manifest', () => {
  it('describes a standalone app with the 192 and 512 icons', () => {
    const result = manifest();

    expect(result.display).toBe('standalone');
    expect(result.start_url).toBe('/');
    expect(result.icons?.map((icon) => icon.sizes)).toEqual(['192x192', '512x512']);
  });
});
