import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils.js';

const Dropdown = ({ trigger, children, className, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button Slot */}
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Floating Menu items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute mt-2 w-56 rounded-lg border border-border bg-card shadow-xl z-50 overflow-hidden soft-shadow',
              align === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            <div className="py-1" onClick={() => setIsOpen(false)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({ className, children, onClick, active, destructive }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-semibold transition-colors text-left cursor-pointer',
        active ? 'bg-orange-500/10 text-orange-500' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        destructive && 'text-rose-500 hover:text-rose-500 hover:bg-rose-500/5 border-t border-border/40',
        className
      )}
    >
      {children}
    </button>
  );
};

const DropdownSeparator = () => <div className="h-[1px] bg-border/50 my-1" />;

export { Dropdown, DropdownItem, DropdownSeparator };
