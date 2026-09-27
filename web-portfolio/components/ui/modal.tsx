'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { HeroArcOrnament } from '@/components/bento/decor/hero-arc-ornament';
import { cn } from '@/lib/utils';

function Modal(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />;
}

function ModalTrigger({ className, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger
      data-slot="modal-trigger"
      className={cn('cursor-pointer', className)}
      {...props}
    />
  );
}

interface ModalContentProps extends DialogPrimitive.Popup.Props {
  title: string;
  kicker?: string;
  description?: string;
  closeLabel: string;
}

function ModalContent({
  title,
  kicker,
  description,
  closeLabel,
  className,
  children,
  ...props
}: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        className={cn(
          'fixed inset-0 z-40 bg-background/60 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,var(--glow-color-strong),transparent_70%)] backdrop-blur-md',
          'transition-opacity duration-200 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0'
        )}
      />
      <DialogPrimitive.Popup
        data-slot="modal-content"
        className={cn(
          'fixed inset-0 z-40 m-auto flex h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-(--border-strong) bg-card text-foreground shadow-(--shadow-modal) outline-none md:h-[80dvh] md:w-[80vw]',
          // Inner mat, like a framed print.
          'before:pointer-events-none before:absolute before:inset-3 before:rounded-[10px] before:border before:border-border',
          // Tailwind v4 translate utilities set the `translate` property, not `transform`.
          'transition-[opacity,translate] duration-200 ease-out',
          'data-starting-style:-translate-y-2.5 data-starting-style:opacity-0',
          'data-ending-style:-translate-y-2.5 data-ending-style:opacity-0',
          className
        )}
        {...props}
      >
        <HeroArcOrnament className="pointer-events-none absolute -right-10 -bottom-10 size-64" />
        <header className="flex shrink-0 items-start justify-between gap-4 px-6 pt-8 pb-4 md:px-10 md:pt-10">
          <div className="min-w-0">
            {kicker ? (
              <p className="mb-3 font-mono text-[9px] tracking-[0.4em] text-muted-foreground uppercase">
                {kicker}
              </p>
            ) : null}
            <DialogPrimitive.Title className="font-display text-4xl leading-none font-bold tracking-tight md:text-[44px]">
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="mt-2 font-display text-lg text-foreground/80 italic">
                {description}
              </DialogPrimitive.Description>
            ) : null}
          </div>
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="modal-knob inline-flex size-11 shrink-0 items-center justify-center text-foreground/80 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>
        </header>
        <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-6 pt-2 pb-8 md:px-10 md:pb-10">
          {children}
        </div>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export { Modal, ModalTrigger, ModalContent };
