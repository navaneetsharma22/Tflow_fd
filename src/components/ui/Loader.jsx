import React from 'react';
import { cn } from '../../lib/utils.js';

const Loader = ({ variant = 'spinner', className, size = 'default' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  // 1. Spinning Circle Loader
  if (variant === 'spinner') {
    return (
      <div
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  // 2. Full Page Overlay Loader
  if (variant === 'page') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-10 w-10" />
          <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  // 3. Pulse Skeleton Block (lazy loader mockup blocks)
  if (variant === 'skeleton') {
    return (
      <div
        className={cn(
          'animate-pulse rounded-xl bg-muted/50 w-full min-h-[1.5rem]',
          className
        )}
      />
    );
  }

  // 4. Dot Bouncing Loader
  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-1.5 justify-center py-2', className)}>
        <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
      </div>
    );
  }

  return null;
};

export { Loader };
