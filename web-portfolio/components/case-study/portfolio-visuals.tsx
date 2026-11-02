import type { DirectionId, PairId } from '@/lib/projects';
import type { ThemeId } from '@/lib/themes';

export interface Photo {
  src: string;
  width: number;
  height: number;
  // Screenshots of my own work carry no credit.
  credit?: { pexels: string } | 'public-domain';
  // Where the cover crop anchors when the subject sits off-center.
  position?: 'object-bottom';
}

// Files and credits of the Design chapter; captions and alt text live in
// content/projects.json. Sources: design/portfolio-case-study-images.md.
export const ambiancePhotos: Record<ThemeId, Photo> = {
  'theme-01': {
    src: '/portfolio/refs/plaster.jpg',
    width: 1000,
    height: 1498,
    credit: { pexels: 'Ksenia Chernaya' },
  },
  'theme-02': {
    src: '/portfolio/refs/terracotta.jpg',
    width: 1000,
    height: 735,
    credit: { pexels: 'Moussa Idrissi' },
  },
  'theme-03': {
    src: '/portfolio/refs/amber-room.jpg',
    width: 1000,
    height: 1777,
    credit: { pexels: 'B.M Shah-e-mulk' },
  },
  'theme-04': {
    src: '/portfolio/refs/oxblood.jpg',
    width: 1000,
    height: 1510,
    credit: { pexels: 'Tiffany Christie Freeman' },
  },
};

export const pairPhotos: Record<PairId, Photo> = {
  sunlight: {
    src: '/portfolio/refs/sunlight.jpg',
    width: 1000,
    height: 1500,
    credit: { pexels: 'wal_ 172619' },
  },
  bauhaus: {
    src: '/portfolio/refs/bauhaus-poster.jpg',
    width: 409,
    height: 530,
    credit: 'public-domain',
  },
  tiles: {
    src: '/portfolio/refs/green-mosaic.jpg',
    width: 1000,
    height: 1500,
    credit: { pexels: 'Andrew Neel' },
  },
  wood: {
    src: '/portfolio/refs/wood.jpg',
    width: 1000,
    height: 1500,
    credit: { pexels: 'Diana' },
  },
  paintChips: {
    src: '/portfolio/refs/colour-cards.jpg',
    width: 1000,
    height: 1494,
    credit: { pexels: 'Olga Kovalski' },
  },
};

// Each mockup next to the reference it came from.
export const directionShots: Record<DirectionId, { reference: Photo; mockup: Photo }> = {
  nelson: {
    reference: {
      src: '/portfolio/directions/nelson-sideboard.jpg',
      width: 1000,
      height: 1500,
      credit: { pexels: 'Charlotte May' },
      position: 'object-bottom',
    },
    mockup: { src: '/portfolio/directions/nelson.jpg', width: 1000, height: 688 },
  },
  caseStudyHouse: {
    reference: {
      src: '/portfolio/directions/magazine.jpg',
      width: 1000,
      height: 750,
      credit: { pexels: 'cottonbro studio' },
    },
    mockup: { src: '/portfolio/directions/case-study-house.jpg', width: 1000, height: 688 },
  },
  brassMirror: {
    reference: {
      src: '/portfolio/refs/pill-mirrors.jpg',
      width: 1000,
      height: 1500,
      credit: { pexels: 'Shojol Islam' },
    },
    mockup: { src: '/portfolio/directions/brass-mirror.jpg', width: 1000, height: 688 },
  },
};

export const evidenceShots: Record<'before' | 'after', Photo> = {
  before: { src: '/portfolio/before-after/moodboard.jpg', width: 1000, height: 496 },
  after: { src: '/portfolio/before-after/hero.jpg', width: 1000, height: 598 },
};
