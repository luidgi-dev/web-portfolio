import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { ContactTiles } from '@/components/bento/contact-tiles';

export async function ContactCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard
      colSpan={1}
      label={t('contactLabel')}
      labelStyle="chip"
      className="relative overflow-hidden"
    >
      <div className="relative" data-testid="contact-card">
        <p className="font-display text-lg font-bold tracking-tight leading-snug md:text-xl">
          {t('contactHeadline')}
        </p>
        <p className="mt-2 font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
          {t('contactHint')}
        </p>
        <ContactTiles className="mt-4" />
      </div>
    </BentoCard>
  );
}
