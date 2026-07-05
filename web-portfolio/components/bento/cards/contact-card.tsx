import { FileDown, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { RadarOrnament } from '@/components/bento/decor/radar-ornament';
import { BentoCard } from '@/components/bento/bento-card';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/contact-icons';
import { siteLinks } from '@/lib/site';
import { cn } from '@/lib/utils';

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
      <div
        className="bento-surface-tech pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <RadarOrnament className="pointer-events-none absolute -bottom-4 -left-4 h-28 w-28 opacity-[0.07]" />
      <div className="relative" data-testid="contact-card">
        <p className="font-display text-lg font-bold tracking-tight leading-snug md:text-xl">
          {t('contactHeadline')}
        </p>
        <nav className="mt-5 grid grid-cols-2 gap-3" aria-label={t('contactLabel')}>
          {contactItems.map(({ href, label, labelKey, icon: Icon, external }) => {
            const linkLabel = labelKey ? t(labelKey) : label!;

            return (
              <a
                key={href}
                href={href}
                className={cn(
                  'group flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-2 py-3 backdrop-blur-[1px]',
                  'text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary'
                )}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-center font-mono text-[8px] tracking-wider uppercase">
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
