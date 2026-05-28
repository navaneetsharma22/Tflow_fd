import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Folder,
  CheckSquare,
  Users,
  Sparkles,
  Settings,
  Terminal,
  ShieldAlert,
  Moon,
  Sun,
  MessageSquare,
  Hash
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.jsx';
import { useToast } from './Toast.jsx';
import { cn } from '../../lib/utils.js';

const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items = [
    // Pages
    { id: 'dash', name: 'Go to Dashboard', type: 'Page', icon: Terminal, action: () => navigate('/') },
    { id: 'proj', name: 'Go to Projects', type: 'Page', icon: Folder, action: () => navigate('/projects') },
    { id: 'tasks', name: 'Go to Tasks (Kanban)', type: 'Page', icon: CheckSquare, action: () => navigate('/tasks') },
    { id: 'team', name: 'Go to Team Management', type: 'Page', icon: Users, action: () => navigate('/team') },
    { id: 'ai', name: 'Go to AI Analytics Services', type: 'Page', icon: Sparkles, action: () => navigate('/ai') },
    { id: 'settings', name: 'Go to Settings', type: 'Page', icon: Settings, action: () => navigate('/settings') },

    // Actions
    { id: 'theme', name: 'Toggle Dark / Light Theme', type: 'Action', icon: isDark ? Sun : Moon, action: () => toggleTheme() },
  ];

  // Filter items based on query
  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-lg border border-border bg-card shadow-2xl z-10 overflow-hidden soft-shadow"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 border-b border-border bg-muted/10">
              <Search className="h-4.5 w-4.5 text-muted-foreground mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, tasks, users, comments..."
                className="w-full h-12 bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/40"
              />
              <span className="text-[10px] font-bold text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded uppercase select-none">
                ESC
              </span>
            </div>

            {/* Results list */}
            <div className="max-h-72 overflow-y-auto p-2 space-y-0.5 select-none">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all',
                        isSelected ? 'bg-orange-500/10 text-orange-500' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0',
                        isSelected ? 'border-orange-500/30 bg-orange-500/10 text-orange-500' : 'border-border bg-muted text-muted-foreground'
                      )}>
                        {item.type}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground animate-fadeIn">
                  <ShieldAlert className="h-8 w-8 text-muted-foreground/60 mb-2" />
                  <p className="text-xs font-medium">No matching commands found.</p>
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className="px-4 py-2 bg-muted/30 border-t border-border/40 text-[10px] text-muted-foreground flex items-center gap-4">
              <span>↑↓ Arrow Navigation</span>
              <span>⏎ Enter to Select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
