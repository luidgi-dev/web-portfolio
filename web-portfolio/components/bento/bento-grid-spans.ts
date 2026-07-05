export const colSpanClasses = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
} as const;

export const rowSpanClasses = {
  1: 'md:row-span-1',
  2: 'md:row-span-2',
} as const;

export type ColSpan = keyof typeof colSpanClasses;
export type RowSpan = keyof typeof rowSpanClasses;
