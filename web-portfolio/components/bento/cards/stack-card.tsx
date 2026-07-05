import { getTranslations } from 'next-intl/server';
import { RadarOrnament } from '@/components/bento/decor/radar-ornament';
import { BentoCard } from '@/components/bento/bento-card';
import { stackGroups } from '@/lib/stack';

export async function StackCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('stackLabel')} className="relative overflow-hidden">
      <RadarOrnament className="pointer-events-none absolute -top-3 -right-3 h-20 w-20 opacity-[0.06]" />
      <dl className="relative space-y-3" data-testid="stack-card">
        {stackGroups.map((group) => (
          <div key={group.key}>
            <dt className="font-mono text-[8px] tracking-[0.35em] text-muted-foreground uppercase">
              {t(group.labelKey)}
            </dt>
            <dd className="mt-1 font-sans text-xs text-foreground/90">{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </BentoCard>
  );
}
