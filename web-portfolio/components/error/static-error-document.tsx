import '@/app/globals.css';
import { fontVariables } from '@/app/fonts';
import { FilmNoiseOverlay } from '@/components/film-noise-overlay';
import { DEFAULT_THEME_ID } from '@/lib/themes';

/**
 * Own `<html>` for the error pages that render outside `[locale]/layout` (root not-found, global error).
 * No ThemeProvider or intl there, so the default ambiance is pinned.
 */
export function StaticErrorDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} ${DEFAULT_THEME_ID} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <FilmNoiseOverlay />
        {children}
      </body>
    </html>
  );
}
