'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
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
  description?: string;
  closeLabel: string;
}

function ModalContent({
  title,
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
          'fixed inset-0 z-40 bg-background/40 backdrop-blur-md transition-opacity duration-200 ease-out',
          'data-starting-style:opacity-0 data-ending-style:opacity-0'
        )}
      />
      <DialogPrimitive.Popup
        data-slot="modal-content"
        className={cn(
          'fixed inset-0 z-40 m-auto flex h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-[var(--shadow-modal)] outline-none md:h-[80dvh] md:w-[80vw]',
          // Tailwind v4 scale utilities set the `scale` property, not `transform`.
          'transition-[opacity,scale] duration-200 ease-out',
          'data-starting-style:scale-[0.96] data-starting-style:opacity-0',
          'data-ending-style:scale-[0.96] data-ending-style:opacity-0',
          className
        )}
        {...props}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-4 py-3 md:px-8 md:py-4">
          <div className="min-w-0">
            <DialogPrimitive.Title className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="mt-1 font-sans text-sm text-foreground/80">
                {description}
              </DialogPrimitive.Description>
            ) : null}
          </div>
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-8 md:py-6">{children}</div>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export { Modal, ModalTrigger, ModalContent };
