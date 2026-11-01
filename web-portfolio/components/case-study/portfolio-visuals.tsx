import type { DirectionId, PairId } from '@/lib/projects';
import type { ThemeId } from '@/lib/themes';

export interface Photo {
  src: string;
  width: number;
  height: number;
  // Screenshots of my own work carry no credit.
  credit?: { pexels: string } | 'public-domain';
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
    src: '/portfolio/refs/chocolate.jpg',
    width: 1000,
    height: 667,
    credit: { pexels: 'Stephen Leonardi' },
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
    src: '/portfolio/refs/tiles.jpg',
    width: 1000,
    height: 1777,
    credit: { pexels: 'Sami Abdullah' },
  },
  wood: {
    src: '/portfolio/refs/wood.jpg',
    width: 1000,
    height: 1500,
    credit: { pexels: 'Diana' },
  },
  paintChips: {
    src: '/portfolio/refs/paint-chips.jpg',
    width: 1000,
    height: 667,
    credit: { pexels: 'Tima Miroshnichenko' },
  },
};

export const directionShots: Record<DirectionId, Photo> = {
  nelson: { src: '/portfolio/directions/nelson.jpg', width: 1000, height: 688 },
  caseStudyHouse: { src: '/portfolio/directions/case-study-house.jpg', width: 1000, height: 688 },
  brassMirror: { src: '/portfolio/directions/brass-mirror.jpg', width: 1000, height: 688 },
  pillMirrors: {
    src: '/portfolio/refs/pill-mirrors.jpg',
    width: 1000,
    height: 1500,
    credit: { pexels: 'Shojol Islam' },
  },
};

export const evidenceShots: Record<'before' | 'after', Photo> = {
  before: { src: '/portfolio/before-after/moodboard.jpg', width: 1000, height: 496 },
  after: { src: '/portfolio/before-after/hero.jpg', width: 1000, height: 598 },
};
