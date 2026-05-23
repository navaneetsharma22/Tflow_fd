import React, { useState } from 'react';
import { cn } from '../../lib/utils.js';

const Avatar = ({ src, alt = '', name = '', size = 'default', status, className }) => {
  const [imageFailed, setImageFailed] = useState(false);

  // 1. Size mapping
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };

  // 2. Status ring color mapping
  const statusColors = {
    online: 'bg-emerald-500 ring-2 ring-background',
    away: 'bg-amber-500 ring-2 ring-background',
    busy: 'bg-rose-500 ring-2 ring-background',
    offline: 'bg-muted-foreground ring-2 ring-background',
  };

  // 3. Name initials builder
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // 4. Generate deterministic gradient background based on initials to look extremely premium!
  const getGradient = (fullName) => {
    const hash = fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      'from-orange-500 to-amber-500 text-white',
      'from-blue-600 to-indigo-500 text-white',
      'from-emerald-500 to-teal-500 text-white',
      'from-rose-500 to-red-600 text-white',
      'from-violet-500 to-purple-600 text-white',
    ];
    return gradients[hash % gradients.length];
  };

  return (
    <div className="relative inline-block shrink-0 select-none">
      <div
        className={cn(
          'relative flex items-center justify-center rounded-lg border border-border/20 overflow-hidden font-bold uppercase tracking-wide',
          sizeClasses[size],
          className
        )}
      >
        {src && !imageFailed ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              'h-full w-full flex items-center justify-center bg-gradient-to-tr',
              getGradient(name || 'TF')
            )}
          >
            {getInitials(name || 'TF')}
          </div>
        )}
      </div>

      {/* Dynamic Status Ring */}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

export { Avatar };
