import { notFound } from 'next/navigation';

// Unknown paths under a locale would otherwise skip the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
