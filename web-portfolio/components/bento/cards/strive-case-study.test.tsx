import { fireEvent, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';
import { StriveCaseStudy } from './strive-case-study';
import { siteLinks } from '@/lib/site';
import enMessages from '@/messages/en.json';
import frMessages from '@/messages/fr.json';

function renderCaseStudy(locale = 'en', messages: typeof enMessages = enMessages) {
  render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <StriveCaseStudy />
    </NextIntlClientProvider>
  );
}

describe('StriveCaseStudy', () => {
  it('renders a labelled tablist with Visuals selected by default', () => {
    renderCaseStudy();

    const tablist = screen.getByRole('tablist', { name: 'Case study sections' });
    expect(within(tablist).getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByRole('tab', { name: 'Visuals' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Technical details' })).toHaveAttribute(
      'aria-selected',
      'false'
    );

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText(enMessages.HomePage.striveVisualsHint)).toBeInTheDocument();
    expect(within(panel).getAllByRole('img', { name: 'Strive logo' })).toHaveLength(2);
    expect(within(panel).getAllByRole('figure')).toHaveLength(2);
    expect(within(panel).getByText('Logo, dark')).toBeInTheDocument();
    expect(within(panel).getByText('Logo, light')).toBeInTheDocument();
  });

  it('switches to the technical panel with a spec table and the live site link', () => {
    renderCaseStudy();

    fireEvent.click(screen.getByRole('tab', { name: 'Technical details' }));

    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText(enMessages.HomePage.striveDescription)).toBeInTheDocument();
    expect(within(panel).queryByText(enMessages.HomePage.striveVisualsHint)).toBeNull();

    const terms = within(panel)
      .getAllByRole('term')
      .map((term) => term.textContent);
    expect(terms).toEqual(['Type', 'Project tags', 'Availability']);
    expect(within(panel).getByText('Personal work')).toBeInTheDocument();
    expect(within(panel).getByText('striveapp.cc')).toBeInTheDocument();

    const liveLink = within(panel).getByRole('link', { name: /Open the live app/ });
    expect(liveLink).toHaveAttribute('href', siteLinks.strive);
    expect(liveLink).toHaveAttribute('target', '_blank');
  });

  it('renders French labels', () => {
    renderCaseStudy('fr', frMessages);

    expect(screen.getByRole('tab', { name: 'Visuels' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Détails techniques' })).toBeInTheDocument();
  });
});
