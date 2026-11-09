import type { MetadataRoute } from 'next';
import enMessages from '@/messages/en.json';

const AMBER_CHOCOLATE_BACKGROUND = '#271608';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: enMessages.Metadata.title,
    short_name: 'Luidgi',
    description: enMessages.Metadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: AMBER_CHOCOLATE_BACKGROUND,
    theme_color: AMBER_CHOCOLATE_BACKGROUND,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
