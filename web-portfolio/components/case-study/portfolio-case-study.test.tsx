import { fireEvent, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { PortfolioCaseStudy } from './portfolio-case-study';
import { projects, type Locale } from '@/lib/projects';
import { themes } from '@/lib/themes';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

const { meta, content } = projects.portfolio;
const messages = { en: enMessages, fr: frMessages };

function renderCaseStudy(locale: Locale = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <PortfolioCaseStudy meta={meta} content={content[locale]} />
    </NextIntlClientProvider>
  );
}

function openChapter(name: string) {
  fireEvent.click(screen.getByRole('tab', { name }));
  return screen.getByRole('tabpanel');
}

describe('PortfolioCaseStudy', () => {
  it('renders four chapters with Design second and Overview selected', () => {
    renderCaseStudy();

    const tabs = within(screen.getByRole('tablist', { name: 'Case study chapters' })).getAllByRole(
      'tab'
    );
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      '01Overview',
      '02Design',
      '03Engineering',
      '04Build log',
    ]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('links to the repository from the overview', () => {
    renderCaseStudy();

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText(content.en.overview.lead)).toBeInTheDocument();
    expect(within(panel).getByText('github.com')).toBeInTheDocument();

    const codeLink = within(panel).getByRole('link', { name: /View the code/ });
    expect(codeLink).toHaveAttribute('href', 'https://github.com/luidgi-dev/web-portfolio');
    expect(codeLink).toHaveAttribute('target', '_blank');
  });

  it('shows each ambiance with its photo, credit and own palette', () => {
    renderCaseStudy();

    const panel = openChapter('Design');
    const { ambiances } = content.en.design;
    for (const theme of themes) {
      const plate = within(panel).getByText(`${theme.number} · ${theme.nameEn}`).closest('figure')!;
      expect(within(plate).getByRole('img', { name: ambiances.items[theme.id].alt })).toBeVisible();
      expect(plate).toHaveTextContent(ambiances.items[theme.id].caption);
      expect(plate).toHaveTextContent(/Photo: .+, Pexels/);
      // The swatches resolve the tokens of this ambiance, whatever the active one.
      expect(plate.querySelector(`.${theme.id}`)).not.toBeNull();
    }
  });

  it('pairs every reference photo with the live component it led to', () => {
    renderCaseStudy();

    const panel = openChapter('Design');
    const { pairs } = content.en.design;
    for (const pair of Object.values(pairs.items)) {
      expect(within(panel).getByRole('img', { name: pair.alt })).toBeInTheDocument();
      expect(within(panel).getByText(pair.caption)).toBeInTheDocument();
    }
    expect(within(panel).getByText('Joost Schmidt, 1923, public domain')).toBeInTheDocument();
    expect(within(panel).getByRole('navigation', { name: 'Get in touch' })).toBeInTheDocument();
    expect(within(panel).getByText('/404')).toBeInTheDocument();
  });

  it('shows the three dropped directions next to the mirror reference', () => {
    renderCaseStudy();

    const panel = openChapter('Design');
    const { dropped } = content.en.design;
    expect(within(panel).getByRole('heading', { name: dropped.heading })).toBeInTheDocument();
    for (const direction of Object.values(dropped.items)) {
      expect(within(panel).getByRole('img', { name: direction.alt })).toBeInTheDocument();
    }
  });

  it('tells the audit with the moodboard and the hero today', () => {
    renderCaseStudy();

    const panel = openChapter('Build log');
    const { story } = content.en.buildLog;
    expect(within(panel).getByText(story.quote)).toBeInTheDocument();
    for (const caption of [story.before, story.after]) {
      expect(within(panel).getByText(caption)).toBeInTheDocument();
    }
    const sources = Array.from(panel.querySelectorAll('img')).map((img) => img.getAttribute('src'));
    expect(sources.some((src) => src?.includes('moodboard.jpg'))).toBe(true);
    expect(sources.some((src) => src?.includes('hero.jpg'))).toBe(true);
  });

  it('renders French chapters and credits', () => {
    renderCaseStudy('fr');

    for (const name of ['Aperçu', 'Design', 'Technique', 'Journal de bord']) {
      expect(screen.getByRole('tab', { name })).toBeInTheDocument();
    }
    const panel = openChapter('Design');
    expect(within(panel).getByText('01 · Plâtre Blanc')).toBeInTheDocument();
    expect(within(panel).getAllByText(/Photo : .+, Pexels/).length).toBeGreaterThan(0);
  });
});
