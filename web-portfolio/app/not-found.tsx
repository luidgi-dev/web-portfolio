import { ErrorPage } from '@/components/error/error-page';
import { DocumentShell } from '@/components/document-shell';
import messages from '@/messages/en.json';

const t = messages.ErrorPage;

// Reached only by paths the proxy skips (e.g. with a file extension): the others get the localized page.
export default function RootNotFound() {
  return (
    <DocumentShell lang="en">
      <ErrorPage
        code="404"
        title={t.notFoundTitle}
        body={t.notFoundBody}
        home={{ href: '/', label: t.home }}
      />
    </DocumentShell>
  );
}
