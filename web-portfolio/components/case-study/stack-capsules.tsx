import { materialClass, swatchClass } from '@/components/case-study/swatch';
import type { ProjectContent } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface StackCapsulesProps {
  groups: ProjectContent['engineering']['stack'];
}

export function StackCapsules({ groups }: StackCapsulesProps) {
  return (
    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, index) => (
        <li
          key={group.label}
          className={cn('grid grid-cols-[2.75rem_1fr] gap-4', swatchClass(index))}
        >
          <span className={cn('capsule h-32', materialClass(index))} aria-hidden="true" />
          <div>
            <h4 className="font-display text-lg font-bold">{group.label}</h4>
            <ul className="mt-1.5 text-sm leading-relaxed text-foreground/85">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
