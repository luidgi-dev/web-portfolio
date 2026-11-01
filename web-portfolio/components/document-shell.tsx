import '@/app/globals.css';
import { fontVariables } from '@/app/fonts';
import { FilmNoiseOverlay } from '@/components/film-noise-overlay';
import { DEFAULT_THEME_ID } from '@/lib/themes';

/**
 * The site's `<html>` and `<body>`. Shared by the locale layout and the error pages that replace it
 * (root not-found, global error), so fonts, default ambiance and grain stay the same everywhere.
 */
export function DocumentShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${fontVariables} ${DEFAULT_THEME_ID} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <FilmNoiseOverlay />
        {children}
      </body>
    </html>
  );
}
