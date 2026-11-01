import { useTranslations } from 'next-intl';
import { Modal, ModalContent, ModalTrigger } from '@/components/ui/modal';

// The "See how it works" line at the bottom of a card that opens a case study.
export function CaseStudyCta() {
  const t = useTranslations('HomePage');

  return (
    <p
      className="mt-4 inline-flex items-center gap-2 text-foreground/80 transition-colors group-hover:text-primary"
      aria-hidden="true"
    >
      <span className="font-mono text-[9px] tracking-widest uppercase">{t('caseStudyCta')}</span>
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </p>
  );
}

interface CaseStudyModalProps {
  openLabel: string;
  title: string;
  kicker: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children: React.ReactNode;
}

// Makes the whole card the trigger of the case study modal; the card needs
// `relative` and `interactive`.
export function CaseStudyModal({ openLabel, children, ...content }: CaseStudyModalProps) {
  const t = useTranslations('HomePage');

  return (
    <Modal>
      <ModalTrigger
        aria-label={openLabel}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
      />
      <ModalContent closeLabel={t('dialogClose')} {...content}>
        {children}
      </ModalContent>
    </Modal>
  );
}
