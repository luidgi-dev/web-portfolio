import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Modal, ModalContent, ModalTrigger } from './modal';

function renderDialog() {
  render(
    <>
      <button type="button">Outside</button>
      <Modal>
        <ModalTrigger aria-label="Open case study" />
        <ModalContent
          title="Strive"
          kicker="Case study No. 01"
          description="Find your rhythm."
          closeLabel="Close"
        >
          <button type="button">Inside</button>
        </ModalContent>
      </Modal>
    </>
  );

  return screen.getByRole('button', { name: 'Open case study' });
}

function openDialog() {
  const trigger = renderDialog();
  fireEvent.click(trigger);
  return { trigger, dialog: screen.getByRole('dialog') };
}

describe('Modal', () => {
  it('is closed by default', () => {
    renderDialog();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the trigger with an accessible name and description', () => {
    const { dialog } = openDialog();

    expect(dialog).toHaveAccessibleName('Strive');
    expect(dialog).toHaveAccessibleDescription('Find your rhythm.');
  });

  it('renders the optional kicker inside the dialog', () => {
    const { dialog } = openDialog();

    expect(dialog).toContainElement(screen.getByText('Case study No. 01'));
  });

  it('moves focus inside the dialog when opened', async () => {
    const { dialog } = openDialog();

    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
  });

  it('hides the rest of the page from assistive technology while open', async () => {
    openDialog();

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Outside' })).not.toBeInTheDocument()
    );
  });

  it('closes via the close button and restores focus to the trigger', async () => {
    const { trigger } = openDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    const { trigger, dialog } = openDialog();
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
