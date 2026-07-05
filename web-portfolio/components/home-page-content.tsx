import { MockNarrowCard } from '@/components/bento/cards/mock-narrow-card';
import { MockWideCard } from '@/components/bento/cards/mock-wide-card';
import { ThemeCard } from '@/components/bento/cards/theme-card';

export function HomePageContent() {
  return (
    <div className="flex flex-1 flex-col bg-background px-4 py-10 md:px-8 md:py-16">
      <main className="bento-grid mx-auto w-full max-w-6xl" data-testid="bento-grid" role="main">
        <MockWideCard />
        <MockNarrowCard />
        <ThemeCard />
      </main>
    </div>
  );
}
