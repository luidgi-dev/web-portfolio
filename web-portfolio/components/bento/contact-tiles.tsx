import { FileDown, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/contact-icons';
import { siteLinks } from '@/lib/site';
import { cn } from '@/lib/utils';

const contactItems = [
  { href: siteLinks.linkedin, label: 'LinkedIn', icon: LinkedInIcon, external: true },
  { href: siteLinks.github, label: 'GitHub', icon: GitHubIcon, external: true },
  { href: siteLinks.email, labelKey: 'contactEmail' as const, icon: Mail, external: false },
  { href: siteLinks.cv, labelKey: 'contactCv' as const, icon: FileDown, external: false },
];

// The contact links laid out as a tiled wall, shared by the contact card and the
// portfolio case study.
export function ContactTiles({ className }: { className?: string }) {
  const t = useTranslations('HomePage');

  return (
    <nav className={cn('contact-tile-grid', className)} aria-label={t('contactLabel')}>
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
            <span className="text-center font-mono text-[9px] tracking-[0.12em] uppercase">
              {linkLabel}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
