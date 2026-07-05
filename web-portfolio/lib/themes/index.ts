export type ThemeId = 'theme-01' | 'theme-02' | 'theme-03' | 'theme-04';

export interface ThemeMeta {
  id: ThemeId;
  number: string;
  nameEn: string;
  nameFr: string;
  swatch: string;
  colorScheme: 'light' | 'dark';
}

export const DEFAULT_THEME_ID: ThemeId = 'theme-03';

export const THEME_STORAGE_KEY = 'mcm-theme';

export const themes: ThemeMeta[] = [
  {
    id: 'theme-01',
    number: '01',
    nameEn: 'White Plaster',
    nameFr: 'Plâtre Blanc',
    swatch: '#6B8060',
    colorScheme: 'light',
  },
  {
    id: 'theme-02',
    number: '02',
    nameEn: 'Terracotta Sand',
    nameFr: 'Sable Terracotta',
    swatch: '#C4472A',
    colorScheme: 'light',
  },
  {
    id: 'theme-03',
    number: '03',
    nameEn: 'Amber Chocolate',
    nameFr: 'Chocolat Ambré',
    swatch: '#C8963E',
    colorScheme: 'dark',
  },
  {
    id: 'theme-04',
    number: '04',
    nameEn: 'Oxblood Night',
    nameFr: 'Oxblood Nuit',
    swatch: '#922828',
    colorScheme: 'dark',
  },
];

export const themeIds = themes.map((theme) => theme.id);

export function isThemeId(value: string): value is ThemeId {
  return themeIds.includes(value as ThemeId);
}
