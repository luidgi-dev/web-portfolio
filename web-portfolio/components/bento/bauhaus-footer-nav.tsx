import { useTranslations } from 'next-intl';
import { siteLinks } from '@/lib/site';

const linkClass =
  'inline-flex min-h-[44px] items-center font-mono text-[9px] tracking-[0.18em] text-foreground/80 uppercase transition-colors duration-200 hover:text-primary focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none';
const textClass = 'font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase';

function Separator() {
  return (
    <span className="text-foreground/35" aria-hidden="true">
      ·
    </span>
  );
}

export function BauhausFooterNav() {
  const t = useTranslations('HomePage');

  return (
    <nav className="flex flex-wrap items-center gap-x-2" aria-label={t('bauhausNavLabel')}>
      <a href={siteLinks.privacy} className={linkClass}>
        {t('bauhausPrivacy')}
      </a>
      <Separator />
      <a href={siteLinks.terms} className={linkClass}>
        {t('bauhausTerms')}
      </a>
      <Separator />
      <span className={textClass}>© 2026</span>
      <Separator />
      <span className="inline-flex items-center gap-x-1.5">
        <span className={textClass}>{t('bauhausBuiltBy')}</span>
        <a
          href={siteLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('bauhausCreditLabel')}
          className={linkClass}
        >
          Luidgi
        </a>
      </span>
    </nav>
  );
}
