'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/error/error-page';
import { DocumentShell } from '@/components/document-shell';
import messages from '@/messages/en.json';

const t = messages.ErrorPage;

// Replaces the root layout when it crashes: no intl, so static English.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <DocumentShell lang="en">
      <ErrorPage
        code="500"
        title={t.errorTitle}
        body={t.errorBody}
        home={{ href: '/', label: t.home }}
        retry={{ label: t.retry, onRetry: unstable_retry }}
        reference={error.digest && `${t.reference} ${error.digest}`}
      />
    </DocumentShell>
  );
}
