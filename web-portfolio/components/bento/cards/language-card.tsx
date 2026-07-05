import { getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';

export async function LanguageCard() {
  const t = await getTranslations('HomePage');

  return (
    <BentoCard colSpan={1} label={t('languageLabel')}>
      <LocaleSwitcher />
    </BentoCard>
  );
}
