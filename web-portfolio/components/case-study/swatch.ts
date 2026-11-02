// Palette slot and material for the nth item of a set, see the swatch and
// material classes in app/styles/utilities/materials.css.
const materials = ['linen', 'wood', 'leather', 'brass'] as const;

export const swatchClass = (index: number) => `swatch-${(index % 4) + 1}`;

// The code printed on the nth item of a set: 04-A, 04-B…
export const itemCode = (code: string, index: number) =>
  `${code}-${String.fromCharCode(65 + index)}`;

export const materialClass = (index: number) => `material-${materials[index % materials.length]}`;
