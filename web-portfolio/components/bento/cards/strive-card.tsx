import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { BentoCard } from '@/components/bento/bento-card';
import { StriveCaseStudy } from '@/components/case-study/strive-case-study';
import { Modal, ModalContent, ModalTrigger } from '@/components/ui/modal';
import { getProject } from '@/lib/projects';

export async function StriveCard() {
  const [t, tCaseStudy, locale] = await Promise.all([
    getTranslations('HomePage'),
    getTranslations('CaseStudy'),
    getLocale(),
  ]);
  const { meta, content, number } = getProject('strive', locale);

  return (
    <BentoCard colSpan={1} rowSpan={2} label={content.type} className="relative overflow-hidden">
      <div className="relative flex h-full flex-col" data-testid="strive-card">
        <div className="flex items-start justify-between gap-3">
          <Image
            src="/strive/logo-dark.svg"
            alt=""
            width={52}
            height={52}
            className="rounded-xl border border-border/40"
          />
          <ul
            className="flex max-w-[5.5rem] flex-wrap justify-end gap-1.5"
            aria-label={t('striveTagsLabel')}
          >
            {content.tags.map((tag) => (
              <li key={tag}>
                <span className="bento-chip">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="font-strive mt-4 text-xl font-bold tracking-tight">{content.title}</h2>
        <p className="mt-2 font-strive text-sm font-semibold tracking-tight text-foreground/90">
          {content.tagline}
        </p>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-foreground/90">
          {content.summary}
        </p>
        <p className="mt-3 font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
          {t('striveAvailability', { host: new URL(meta.url).host })}
        </p>
        <p
          className="mt-4 inline-flex items-center gap-2 text-foreground/80 transition-colors group-hover:text-primary"
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] tracking-widest uppercase">{t('striveCta')}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
      <Modal>
        <ModalTrigger
          aria-label={t('striveOpenLabel')}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
        />
        <ModalContent
          title={content.title}
          kicker={tCaseStudy('kicker', { number, type: content.type })}
          description={content.tagline}
          closeLabel={t('dialogClose')}
          titleClassName="font-strive"
          descriptionClassName="font-strive font-semibold not-italic"
        >
          <StriveCaseStudy meta={meta} content={content} />
        </ModalContent>
      </Modal>
    </BentoCard>
  );
}
