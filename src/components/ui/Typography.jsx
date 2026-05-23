import React from 'react';
import { cn } from '../../lib/utils.js';

const TaskFlowLogo = React.forwardRef(
  (
    {
      className,
      variant = 'stacked',
      size = 'md',
      showTagline = true,
      wordmarkClassName,
      taglineClassName,
      iconClassName,
    },
    ref
  ) => {
    const uniqueId = React.useId();

    const sizeClasses = {
      xs: 'h-8 w-8',
      sm: 'h-10 w-10',
      md: 'h-14 w-14',
      lg: 'h-20 w-20',
      xl: 'h-28 w-28',
    };

    const icon = (
      <div className={cn('relative shrink-0', sizeClasses[size] || sizeClasses.md, iconClassName)}>
        <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${uniqueId}-top`} x1="48" y1="44" x2="196" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="52%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-flow`} x1="72" y1="106" x2="168" y2="188" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="46%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-dot1`} x1="44" y1="114" x2="66" y2="114" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-dot2`} x1="44" y1="154" x2="66" y2="154" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#93C5FD" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-dot3`} x1="44" y1="194" x2="66" y2="194" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
          </defs>

          <path
            d="M74 56h128c8 0 14 6 14 14 0 5-3 10-7 12L124 130c-7 4-15 4-22 0L67 90c-5-3-8-8-8-14 0-11 9-20 20-20Z"
            fill={`url(#${uniqueId}-top)`}
          />
          <path
            d="M118 130c6-3 12-3 18 0l32 17c8 4 12 13 9 22l-21 57c-4 10-15 16-26 15H105c-12-1-20-13-16-24l13-42c2-7 0-15-5-21l-17-19c-5-6-6-15-2-22l16-29c3-6 10-10 17-10h16c9 0 13 11 8 18l-9 14c-2 4-1 9 3 12Z"
            fill={`url(#${uniqueId}-flow)`}
            opacity="0.98"
          />
          <circle cx="52" cy="114" r="10" fill={`url(#${uniqueId}-dot1)`} />
          <circle cx="52" cy="154" r="10" fill={`url(#${uniqueId}-dot2)`} />
          <circle cx="52" cy="194" r="10" fill={`url(#${uniqueId}-dot3)`} />
          <rect x="74" y="108" width="54" height="14" rx="7" fill={`url(#${uniqueId}-dot1)`} opacity="0.8" />
          <rect x="74" y="148" width="54" height="14" rx="7" fill={`url(#${uniqueId}-dot2)`} opacity="0.75" />
          <rect x="74" y="188" width="54" height="14" rx="7" fill={`url(#${uniqueId}-dot3)`} opacity="0.72" />
        </svg>
      </div>
    );

    const wordmark = (
      <div className="flex flex-col gap-1 leading-none">
        <div className={cn('font-extrabold tracking-tight', wordmarkClassName || 'text-foreground')}>
          <span className="text-inherit">Task</span>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">Flow</span>
        </div>
        {showTagline && (
          <div className={cn('text-[10px] font-semibold uppercase tracking-[0.32em]', taglineClassName || 'text-muted-foreground')}>
            Assign. Track. Achieve.
          </div>
        )}
      </div>
    );

    if (variant === 'icon') {
      return (
        <div ref={ref} className={cn('inline-flex items-center justify-center', className)}>
          {icon}
        </div>
      );
    }

    if (variant === 'inline') {
      return (
        <div ref={ref} className={cn('inline-flex items-center gap-3', className)}>
          {icon}
          {wordmark}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col items-center text-center gap-3', className)}>
        {icon}
        {wordmark}
      </div>
    );
  }
);
TaskFlowLogo.displayName = 'TaskFlowLogo';

const Heading1 = React.forwardRef(({ className, children, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
    {...props}
  >
    {children}
  </h1>
));
Heading1.displayName = 'Heading1';

const Heading2 = React.forwardRef(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('scroll-m-20 border-b border-border/40 pb-2 text-3xl font-extrabold tracking-tight first:mt-0', className)}
    {...props}
  >
    {children}
  </h2>
));
Heading2.displayName = 'Heading2';

const Heading3 = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('scroll-m-20 text-2xl font-bold tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
));
Heading3.displayName = 'Heading3';

const Heading4 = React.forwardRef(({ className, children, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn('scroll-m-20 text-xl font-bold tracking-tight', className)}
    {...props}
  >
    {children}
  </h4>
));
Heading4.displayName = 'Heading4';

const Paragraph = React.forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('leading-relaxed text-sm text-foreground/80 [&:not(:first-child)]:mt-4', className)}
    {...props}
  >
    {children}
  </p>
));
Paragraph.displayName = 'Paragraph';

const MutedText = React.forwardRef(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-xs text-muted-foreground leading-normal', className)}
    {...props}
  >
    {children}
  </span>
));
MutedText.displayName = 'MutedText';

const CodeText = React.forwardRef(({ className, children, ...props }, ref) => (
  <code
    ref={ref}
    className={cn('relative rounded bg-muted/40 px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold text-foreground/90 border border-border/30', className)}
    {...props}
  >
    {children}
  </code>
));
CodeText.displayName = 'CodeText';

export { Heading1, Heading2, Heading3, Heading4, Paragraph, MutedText, CodeText, TaskFlowLogo };
