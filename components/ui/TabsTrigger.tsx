'use client';

import * as React from 'react';
import { TabsTrigger as RadixTabsTrigger } from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixTabsTrigger> {}

const TabsTrigger = React.forwardRef<React.ElementRef<typeof RadixTabsTrigger>, TabsTriggerProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixTabsTrigger
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
          'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export { TabsTrigger };
