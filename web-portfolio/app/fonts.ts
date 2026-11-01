import { DM_Mono, DM_Sans, Playfair_Display, Sora } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '900'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
});

/** Font CSS variables for every document that renders its own `<html>`. */
export const fontVariables = [playfairDisplay, dmSans, dmMono, sora]
  .map((font) => font.variable)
  .join(' ');
