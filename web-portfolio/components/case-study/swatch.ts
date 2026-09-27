// Palette slot and material for the nth item of a set, see the swatch and
// material classes in app/styles/utilities/materials.css.
const materials = ['linen', 'wood', 'leather', 'brass'] as const;

export const swatchClass = (index: number) => `swatch-${(index % 4) + 1}`;

export const materialClass = (index: number) => `material-${materials[index % materials.length]}`;
