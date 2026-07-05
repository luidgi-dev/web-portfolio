import { getTranslations } from 'next-intl/server';
import { BotanicalOrnament } from '@/components/bento/decor/botanical-ornament';
import { BentoCard } from '@/components/bento/bento-card';
import { stackGroups } from '@/lib/stack';

export async function StackCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('stackLabel')} className="relative overflow-hidden">
      <BotanicalOrnament className="pointer-events-none absolute -right-2 -bottom-2 h-28 w-28 opacity-[0.045]" />
      <dl className="relative space-y-3.5" data-testid="stack-card">
        {stackGroups.map((group) => (
          <div key={group.key}>
            <dt className="font-mono text-[8px] tracking-[0.35em] text-muted-foreground uppercase">
              {t(group.labelKey)}
            </dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="bento-chip">{item}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </BentoCard>
  );
}
