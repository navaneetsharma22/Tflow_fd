import React from 'react';
import { cn } from '../../lib/utils.js';

const Input = React.forwardRef(({ className, type = 'text', label, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-muted-foreground pointer-events-none">
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border border-border bg-muted/20 px-4 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-11',
            error && 'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[11px] font-medium text-destructive leading-none block">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
