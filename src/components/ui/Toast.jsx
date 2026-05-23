import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 4000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 w-full max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((t) => {
            let Icon = Info;
            let themeClass = 'border-border bg-card text-foreground';

            if (t.variant === 'success') {
              Icon = CheckCircle;
              themeClass = 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500 dark:bg-emerald-950/10';
            } else if (t.variant === 'destructive') {
              Icon = AlertCircle;
              themeClass = 'border-rose-500/20 bg-rose-500/5 text-rose-500 dark:bg-rose-950/10';
            } else if (t.variant === 'warning') {
              Icon = AlertTriangle;
              themeClass = 'border-amber-500/20 bg-amber-500/5 text-amber-500 dark:bg-amber-950/10';
            } else if (t.variant === 'primary') {
              Icon = CheckCircle;
              themeClass = 'border-primary/20 bg-primary/5 text-primary dark:bg-primary/10';
            }

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`p-4 rounded-2xl border backdrop-blur-md shadow-lg pointer-events-auto flex items-start justify-between gap-3 ${themeClass}`}
              >
                <div className="flex gap-3">
                  <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    {t.title && <p className="text-sm font-bold leading-tight">{t.title}</p>}
                    {t.description && <p className="text-xs opacity-90 leading-tight">{t.description}</p>}
                  </div>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be wrapped inside a ToastProvider provider.');
  }
  return context;
};
