'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Scrolls sideways on narrow screens. The baseline is an inset shadow because
        // overflow clips anything drawn outside the list, like a negative margin.
        'flex items-end gap-1.5 overflow-x-auto overscroll-x-contain shadow-[inset_0_-1px_0_var(--border-strong)] [scrollbar-width:none]',
        className
      )}
      {...props}
    />
  );
}

// Folder tabs: the active tab merges with the card surface below it.
function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        'min-h-11 shrink-0 rounded-t-lg border border-border border-b-(--border-strong) bg-[color-mix(in_srgb,var(--foreground)_4%,var(--card))] px-3 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase transition-colors duration-200 ease-out sm:px-4 sm:tracking-[0.3em]',
        'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset',
        'data-active:border-(--border-strong) data-active:border-b-card data-active:bg-card data-active:text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn(
        'animate-in duration-200 ease-out fade-in-0 slide-in-from-bottom-1',
        'outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsPanel };
