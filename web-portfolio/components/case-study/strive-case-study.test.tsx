import { fireEvent, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { StriveCaseStudy } from './strive-case-study';
import { projects, type Locale } from '@/lib/projects';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

const { meta, content } = projects.strive;
const messages = { en: enMessages, fr: frMessages };

function renderCaseStudy(locale: Locale = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <StriveCaseStudy meta={meta} content={content[locale]} />
    </NextIntlClientProvider>
  );
}

function openChapter(name: string) {
  fireEvent.click(screen.getByRole('tab', { name }));
  return screen.getByRole('tabpanel');
}

describe('StriveCaseStudy', () => {
  it('renders four labelled chapters with Overview selected', () => {
    renderCaseStudy();

    const tablist = screen.getByRole('tablist', { name: 'Case study chapters' });
    expect(within(tablist).getAllByRole('tab')).toHaveLength(4);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    for (const name of ['Product', 'Engineering', 'Build log']) {
      expect(screen.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'false');
    }
  });

  it('opens on the overview with the facts and the live link', () => {
    renderCaseStudy();

    const panel = screen.getByRole('tabpanel');
    const { overview } = content.en;
    expect(within(panel).getByText(overview.lead)).toBeInTheDocument();

    const terms = within(panel)
      .getAllByRole('term')
      .map((term) => term.textContent);
    expect(terms).toEqual(['Role', 'Timeline', 'Platform', 'Status', 'Availability']);
    expect(within(panel).getByText(overview.facts.role)).toBeInTheDocument();
    expect(within(panel).getByText('striveapp.cc')).toBeInTheDocument();

    const liveLink = within(panel).getByRole('link', { name: /Open the live app/ });
    expect(liveLink).toHaveAttribute('href', meta.url);
    expect(liveLink).toHaveAttribute('target', '_blank');
  });

  it('lists the three pillars as headed steps', () => {
    renderCaseStudy();

    const panel = screen.getByRole('tabpanel');
    const { pillars } = content.en.overview;
    expect(within(panel).getByRole('heading', { name: pillars.heading })).toBeInTheDocument();
    for (const pillar of pillars.items) {
      expect(within(panel).getByRole('heading', { name: pillar.title })).toBeInTheDocument();
    }
  });

  it('shows a captioned plate per screen in the product chapter', () => {
    renderCaseStudy();

    const panel = openChapter('Product');
    // One plate per screen, then the Insight cards plate.
    const plates = within(panel).getAllByRole('figure');
    expect(plates).toHaveLength(meta.figures.length + 1);

    meta.figures.forEach((figure, index) => {
      const { alt, caption } = content.en.product.figures[figure.id];
      // Light and dark variants both render; the theme decides which one shows.
      expect(within(plates[index]).getAllByRole('img', { name: alt })).toHaveLength(2);
      expect(plates[index]).toHaveTextContent(`Fig. 0${index + 1}`);
      expect(plates[index]).toHaveTextContent(caption);
    });
  });

  it('shows the Insight cards in the product chapter', () => {
    renderCaseStudy();

    const panel = openChapter('Product');
    const { insights } = content.en.product;
    const insightsPlate = within(panel).getAllByRole('figure').at(-1)!;
    expect(insightsPlate).toHaveTextContent(`Fig. 0${meta.figures.length + 1}`);
    for (const card of insights.cards) {
      expect(within(insightsPlate).getByText(card.title)).toBeInTheDocument();
    }
  });

  it('lays out the engineering chapter from the content', () => {
    renderCaseStudy();

    const panel = openChapter('Engineering');
    const { engineering } = content.en;
    for (const item of [...engineering.pipeline.steps, ...engineering.decisions]) {
      expect(within(panel).getByRole('heading', { name: item.title })).toBeInTheDocument();
    }
    for (const group of engineering.stack) {
      expect(within(panel).getByRole('heading', { name: group.label })).toBeInTheDocument();
      for (const tech of group.items) {
        expect(within(panel).getByText(tech)).toBeInTheDocument();
      }
    }
    engineering.numbers.forEach((number, index) => {
      expect(within(panel).getByText(number.label)).toBeInTheDocument();
      expect(within(panel).getByText(number.note)).toBeInTheDocument();
      expect(within(panel).getByText(`03-${'ABCD'[index]}`)).toBeInTheDocument();
    });
    expect(
      within(panel).getByRole('heading', { name: engineering.pipeline.heading })
    ).toBeInTheDocument();
    expect(within(panel).getByText('Chapter 03 · Engineering')).toBeInTheDocument();
  });

  it('tells the build log with numbers, the rebuild and the lessons', () => {
    renderCaseStudy();

    const panel = openChapter('Build log');
    const { buildLog } = content.en;
    buildLog.stats.forEach((stat, index) => {
      expect(within(panel).getByText(stat.value)).toBeInTheDocument();
      expect(within(panel).getByText(stat.note)).toBeInTheDocument();
      expect(within(panel).getByText(`04-${'ABCD'[index]}`)).toBeInTheDocument();
    });
    expect(within(panel).getByText(buildLog.story.quote)).toBeInTheDocument();
    buildLog.results.forEach((result, index) => {
      expect(within(panel).getByText(result)).toBeInTheDocument();
      expect(within(panel).getByText(`No. 0${index + 1}`)).toBeInTheDocument();
    });
    for (const lesson of buildLog.lessons) {
      expect(within(panel).getByRole('heading', { name: lesson.title })).toBeInTheDocument();
    }
  });

  it('renders French chapters and content', () => {
    renderCaseStudy('fr');

    for (const name of ['Aperçu', 'Produit', 'Technique', 'Journal de bord']) {
      expect(screen.getByRole('tab', { name })).toBeInTheDocument();
    }
    expect(screen.getByText(content.fr.overview.lead)).toBeInTheDocument();
  });
});
