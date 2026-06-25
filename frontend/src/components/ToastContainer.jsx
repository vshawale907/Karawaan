import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let iconColor = 'text-blue-500';
          let borderClass = 'border-blue-500/20';
          let bgClass = 'bg-white dark:bg-[#0D1117]';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            iconColor = 'text-emerald-500';
            borderClass = 'border-emerald-500/20 dark:border-emerald-500/10';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-rose-500';
            borderClass = 'border-rose-500/20 dark:border-rose-500/10';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderClass} ${bgClass} shadow-xl`}
            >
              <div className={`mt-0.5 ${iconColor}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-white leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-0.5 rounded"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
