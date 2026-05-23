import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring select-none leading-none h-5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-sm',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground hover:bg-muted/50',
        success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-950/10',
        warning: 'border-amber-500/20 bg-amber-500/10 text-amber-500 dark:bg-amber-950/10',
        destructive: 'border-destructive/20 bg-destructive/10 text-destructive dark:bg-destructive/10',
        info: 'border-blue-500/20 bg-blue-500/10 text-blue-500 dark:bg-blue-950/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
