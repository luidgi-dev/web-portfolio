import type { Metadata } from 'next';
import { ErrorPage } from '@/components/error/error-page';
import { StaticErrorDocument } from '@/components/error/static-error-document';
import messages from '@/messages/en.json';

const t = messages.ErrorPage;

export const metadata: Metadata = { title: t.notFoundTitle };

// Reached only by paths the proxy skips (e.g. with a file extension): the others get the localized page.
export default function RootNotFound() {
  return (
    <StaticErrorDocument>
      <ErrorPage
        code="404"
        title={t.notFoundTitle}
        body={t.notFoundBody}
        home={{ href: '/', label: t.home }}
      />
    </StaticErrorDocument>
  );
}
