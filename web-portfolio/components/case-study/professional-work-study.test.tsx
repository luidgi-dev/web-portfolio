import { fireEvent, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { ProfessionalWorkStudy } from './professional-work-study';
import { experience } from '@/lib/experience';
import type { Locale } from '@/lib/projects';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

const messages = { en: enMessages, fr: frMessages };

function renderStudy(locale: Locale = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <ProfessionalWorkStudy content={experience[locale]} />
    </NextIntlClientProvider>
  );
}

function openChapter(name: string) {
  fireEvent.click(screen.getByRole('tab', { name }));
  return screen.getByRole('tabpanel');
}

describe('ProfessionalWorkStudy', () => {
  it('renders four chapters with Overview selected', () => {
    renderStudy();

    const tabs = within(screen.getByRole('tablist', { name: 'Case study chapters' })).getAllByRole(
      'tab'
    );
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      '01Overview',
      '02Projects',
      '03Method',
      '04Takeaways',
    ]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('opens on the lead and the four facts', () => {
    renderStudy();

    const panel = screen.getByRole('tabpanel');
    const { overview } = experience.en;
    expect(within(panel).getByText(overview.lead)).toBeInTheDocument();
    for (const [label, value] of [
      ['Role', overview.facts.role],
      ['Timeline', overview.facts.timeline],
      ['Teams', overview.facts.teams],
      ['Stack', overview.facts.stack],
    ]) {
      expect(within(panel).getByText(label)).toBeInTheDocument();
      expect(within(panel).getByText(value)).toBeInTheDocument();
    }
  });

  it('shows the card figures, every project and the two flows', () => {
    renderStudy();

    const panel = openChapter('Projects');
    for (const figure of ['1,100+', '~1,500', '~450', '4']) {
      expect(within(panel).getByText(figure)).toBeInTheDocument();
    }
    for (const project of experience.en.projects) {
      expect(within(panel).getByRole('heading', { name: project.title })).toBeInTheDocument();
      expect(within(panel).getByText(project.result)).toBeInTheDocument();
    }

    const flows = within(panel).getAllByRole('figure');
    expect(flows).toHaveLength(2);
    expect(within(flows[1]).getByText('Fig. 02')).toBeInTheDocument();
    expect(
      within(flows[1])
        .getAllByRole('listitem')
        .map((step) => step.textContent)
    ).toEqual([
      '02-AOrder step',
      '02-BPython job on Cloud Run',
      '02-CEmail or text message',
      '02-DPayment link',
    ]);
  });

  it('explains the method and the tool choices', () => {
    renderStudy();

    const panel = openChapter('Method');
    const { method } = experience.en;
    expect(within(panel).getByText(method.delivery.body)).toBeInTheDocument();
    expect(within(panel).getByText('Chapter 03 · Method')).toBeInTheDocument();
    for (const choice of method.choices.items) {
      expect(within(panel).getByRole('heading', { name: choice.title })).toBeInTheDocument();
    }
  });

  it('numbers the four takeaways', () => {
    renderStudy();

    const panel = openChapter('Takeaways');
    const items = within(panel).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    experience.en.takeaways.forEach((item, index) => {
      expect(within(items[index]).getByText(String(index + 1))).toBeInTheDocument();
      expect(within(items[index]).getByRole('heading', { name: item.title })).toBeInTheDocument();
    });
  });

  it('renders in French with French number formatting', () => {
    renderStudy('fr');

    expect(screen.getByRole('tab', { name: 'Bilan' })).toBeInTheDocument();
    const panel = openChapter('Projets');
    expect(within(panel).getByText(/^1\s100\+$/)).toBeInTheDocument();
  });
});
