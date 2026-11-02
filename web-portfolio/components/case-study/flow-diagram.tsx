import { itemCode, swatchClass } from '@/components/case-study/swatch';
import { cn } from '@/lib/utils';

interface FlowDiagramProps {
  steps: string[];
  /** Printed before the step letter, e.g. the figure number: 02-A, 02-B… */
  code: string;
}

// A flow drawn as stitched leather labels joined by a seam. The list order
// carries the sequence for screen readers; the seams are decoration.
export function FlowDiagram({ steps, code }: FlowDiagramProps) {
  return (
    <ol className="stitch-seam grid md:auto-cols-fr md:grid-flow-col">
      {steps.map((step, index) => (
        <li
          key={step}
          className={cn(
            'stitched-label material material-leather flex min-h-24 flex-col px-3.5 pt-3.5 pb-3',
            swatchClass(index)
          )}
        >
          <span
            className="font-mono text-[9px] tracking-[0.12em] text-foreground/70"
            aria-hidden="true"
          >
            {itemCode(code, index)}
          </span>
          <span className="mt-auto pt-3 text-sm leading-snug font-medium">{step}</span>
        </li>
      ))}
    </ol>
  );
}
