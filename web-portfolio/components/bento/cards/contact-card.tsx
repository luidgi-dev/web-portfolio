import { FileDown, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { RadarOrnament } from '@/components/bento/decor/radar-ornament';
import { BentoCard } from '@/components/bento/bento-card';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/contact-icons';
import { siteLinks } from '@/lib/site';

const contactItems = [
  { href: siteLinks.linkedin, label: 'LinkedIn', icon: LinkedInIcon, external: true },
  { href: siteLinks.github, label: 'GitHub', icon: GitHubIcon, external: true },
  { href: siteLinks.email, labelKey: 'contactEmail' as const, icon: Mail, external: false },
  { href: siteLinks.cv, labelKey: 'contactCv' as const, icon: FileDown, external: false },
];

export async function ContactCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('contactLabel')} className="relative overflow-hidden">
      <RadarOrnament className="pointer-events-none absolute -bottom-4 -left-4 h-28 w-28 opacity-[0.07]" />
      <div className="relative" data-testid="contact-card">
        <p className="font-display text-lg font-bold tracking-tight leading-snug md:text-xl">
          {t('contactHeadline')}
        </p>
        <p className="mt-2 font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
          {t('contactHint')}
        </p>
        <nav className="contact-tile-grid mt-4" aria-label={t('contactLabel')}>
          {contactItems.map(({ href, label, labelKey, icon: Icon, external }) => {
            const linkLabel = labelKey ? t(labelKey) : label!;

            return (
              <a
                key={href}
                href={href}
                className="contact-tile group"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon
                  className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="text-center font-mono text-[9px] tracking-[0.2em] uppercase">
                  {linkLabel}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </BentoCard>
  );
}
