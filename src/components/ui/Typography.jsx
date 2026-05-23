import React from 'react';
import { cn } from '../../lib/utils.js';

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

export { Heading1, Heading2, Heading3, Heading4, Paragraph, MutedText, CodeText };
