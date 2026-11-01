import type { ReactNode } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ContactTiles } from '@/components/bento/contact-tiles';
import { BreezeBlockSunlight } from '@/components/bento/decor/breeze-block-sunlight';
import { bodyText } from '@/components/case-study/case-study-shell';
import { ChapterHeading, type ChapterInfo } from '@/components/case-study/chapter-heading';
import { Plate } from '@/components/case-study/figure-plate';
import {
  ambiancePhotos,
  directionShots,
  pairPhotos,
  type Photo,
} from '@/components/case-study/portfolio-visuals';
import { SampleChips } from '@/components/case-study/sample-chips';
import { SectionLabel } from '@/components/case-study/section-label';
import { ErrorPoster } from '@/components/error/error-poster';
import type { DirectionId, PairId, PortfolioContent, Stat } from '@/lib/projects';
import { themes } from '@/lib/themes';
import { cn, toOrdinal } from '@/lib/utils';

// Read from inside each ambiance's own theme class, so all four palettes show at once.
const swatchTokens = ['bg-background', 'bg-card', 'bg-secondary', 'bg-primary', 'bg-accent'];

interface DesignChapterProps {
  chapter: ChapterInfo;
  design: PortfolioContent['design'];
  // The case study's own figures, shown on the paint chips they inspired.
  numbers: Stat[];
}

export function DesignChapter({ chapter, design, numbers }: DesignChapterProps) {
  const t = useTranslations('CaseStudy');
  const locale = useLocale();
  const { references, ambiances, pairs, dropped } = design;
  const figureLabel = (index: number) => `${t('figureLabel')} ${toOrdinal(index)}`;
  const credit = (photo: Photo) => {
    if (!photo.credit) return null;
    return photo.credit === 'public-domain'
      ? t('posterCredit')
      : t('photoCredit', { name: photo.credit.pexels });
  };

  // Each reference next to the component it led to, rendered live in the current ambiance.
  const live: Record<PairId, { frame: string; component: ReactNode }> = {
    sunlight: {
      frame: 'aspect-[4/3]',
      component: (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-border bg-card">
          <BreezeBlockSunlight />
        </div>
      ),
    },
    bauhaus: { frame: 'aspect-[3/4]', component: <ErrorPoster code="404" reference="/404" /> },
    tiles: {
      frame: 'aspect-[4/3]',
      component: (
        <div className="rounded-[2px] border border-border bg-card p-4">
          <ContactTiles />
        </div>
      ),
    },
    wood: {
      frame: 'aspect-[4/3]',
      component: <div className="aspect-[4/3] rounded-[2px] bg-texture-teak" />,
    },
    paintChips: {
      frame: 'aspect-[4/3]',
      component: (
        <SampleChips items={numbers.slice(0, 2)} code={chapter.number} className="md:grid-cols-2" />
      ),
    },
  };
  const pairIds = Object.keys(pairs.items) as PairId[];
  const directionIds = Object.keys(dropped.items) as DirectionId[];

  return (
    <>
      <SectionLabel>{references.heading}</SectionLabel>
      <p className="mt-3 max-w-3xl font-display text-xl leading-snug font-bold tracking-tight md:text-2xl">
        {references.body}
      </p>

      <div className="mt-12">
        <SectionLabel>{ambiances.heading}</SectionLabel>
        <p className={cn('mt-3 max-w-3xl', bodyText)}>{ambiances.body}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => {
            const photo = ambiancePhotos[theme.id];
            const { caption, alt } = ambiances.items[theme.id];

            return (
              <Plate
                key={theme.id}
                label={`${theme.number} · ${locale === 'fr' ? theme.nameFr : theme.nameEn}`}
                caption={<Captioned caption={caption} credit={credit(photo)} />}
              >
                <PhotoFrame
                  photo={photo}
                  alt={alt}
                  className="aspect-[4/5]"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
                />
                <div
                  className={cn(theme.id, 'mt-2.5 grid grid-cols-5 gap-1 rounded-[2px] p-1.5')}
                  aria-hidden="true"
                >
                  {swatchTokens.map((token) => (
                    <span
                      key={token}
                      className={cn('h-6 rounded-[2px] border border-border', token)}
                    />
                  ))}
                </div>
              </Plate>
            );
          })}
        </div>
      </div>

      <div className="mt-12">
        <ChapterHeading chapter={chapter}>{pairs.heading}</ChapterHeading>
        <p className={cn('mt-6 max-w-3xl', bodyText)}>{pairs.body}</p>
        <div className="mt-8 grid gap-10">
          {pairIds.map((id, index) => (
            <div key={id} className="grid items-start gap-5 md:grid-cols-2">
              <Plate label={figureLabel(index * 2)} caption={credit(pairPhotos[id])}>
                <PhotoFrame
                  photo={pairPhotos[id]}
                  alt={pairs.items[id].alt}
                  className={live[id].frame}
                  sizes="(min-width: 768px) 40vw, 90vw"
                />
              </Plate>
              <Plate label={figureLabel(index * 2 + 1)} caption={pairs.items[id].caption}>
                {live[id].component}
              </Plate>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionLabel>{dropped.heading}</SectionLabel>
        <p className={cn('mt-3 max-w-3xl', bodyText)}>{dropped.body}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {directionIds.map((id, index) => (
            <Plate
              key={id}
              label={figureLabel(pairIds.length * 2 + index)}
              caption={
                <Captioned
                  caption={dropped.items[id].caption}
                  credit={credit(directionShots[id])}
                />
              }
            >
              <PhotoFrame
                photo={directionShots[id]}
                alt={dropped.items[id].alt}
                className="aspect-[16/11]"
                sizes="(min-width: 640px) 45vw, 90vw"
              />
            </Plate>
          ))}
        </div>
      </div>
    </>
  );
}

function Captioned({ caption, credit }: { caption: string; credit: string | null }) {
  return (
    <>
      {caption}
      {credit && <span className="ml-1.5 text-muted-foreground">{credit}</span>}
    </>
  );
}

interface PhotoFrameProps {
  photo: Photo;
  alt: string;
  className: string;
  sizes: string;
}

function PhotoFrame({ photo, alt, className, sizes }: PhotoFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-[2px] border border-border', className)}>
      <Image
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        className="size-full object-cover"
      />
    </div>
  );
}
