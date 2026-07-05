import { AtelierCard } from '@/components/bento/cards/atelier-card';
import { BauhausGeometryCard } from '@/components/bento/cards/bauhaus-geometry-card';
import { ContactCard } from '@/components/bento/cards/contact-card';
import { HeroCard } from '@/components/bento/cards/hero-card';
import { LanguageCard } from '@/components/bento/cards/language-card';
import { ProfessionalWorkCard } from '@/components/bento/cards/professional-work-card';
import { ProfileCard } from '@/components/bento/cards/profile-card';
import { StackCard } from '@/components/bento/cards/stack-card';
import { StriveCard } from '@/components/bento/cards/strive-card';
import { ThemeCard } from '@/components/bento/cards/theme-card';

export function HomePageContent() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background px-4 py-5 md:px-6 md:py-8">
      <main className="bento-grid mx-auto w-full max-w-none" data-testid="bento-grid" role="main">
        <HeroCard />
        <LanguageCard />
        <StriveCard />
        <ProfileCard />
        <ContactCard />
        <AtelierCard />
        <StackCard />
        <ThemeCard />
        <BauhausGeometryCard />
        <ProfessionalWorkCard />
      </main>
    </div>
  );
}
