"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react";
import { Loader } from "./loader";

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Global toast store
let toastListeners: ((toast: Toast) => void)[] = [];

// Keep the same API as Sonner
export const toast = {
  success: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'success',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  error: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'error',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  info: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'info',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  warning: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'warning',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  // Add these methods if you use them
  warn: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'warning',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  loading: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'loading',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  // For promise support (if you use it)
  promise: (promise: Promise<any>, options: any) => {
    toast.loading(options.loading || 'Loading...');

    promise
      .then(() => {
        toast.success(options.success || 'Success!');
      })
      .catch(() => {
        toast.error(options.error || 'Error!');
      });
  },

  // For dismiss support (if you use it)
  dismiss: () => {
    // Simply ignore, toasts auto-dismiss themselves
  },

  // For message support (if you use it)
  message: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'info',
    };
    toastListeners.forEach(listener => listener(newToast));
  },

  // For custom support (if you use it)
  custom: (element: React.ReactNode) => {
    // Simple implementation
    toast.info('Notification');
  },
};

export function SimpleToaster() {
  const { theme = "system" } = useTheme();
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (toast: Toast) => {
      setToasts(prev => [...prev, toast]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    };

    toastListeners.push(handleToast);

    return () => {
      toastListeners = toastListeners.filter(l => l !== handleToast);
    };
  }, []);

  if (toasts.length === 0) return null;

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CircleCheckIcon className="size-4" />,
    info: <InfoIcon className="size-4" />,
    warning: <TriangleAlertIcon className="size-4" />,
    error: <OctagonXIcon className="size-4" />,
    loading: <Loader className="size-4" />,
  };

  const styles: Record<ToastType, React.CSSProperties> = {
    success: {
      background: theme === 'dark' ? '#065f46' : '#d1fae5',
      color: theme === 'dark' ? '#ffffff' : '#065f46',
      border: '1px solid #10b981',
    },
    error: {
      background: theme === 'dark' ? '#7f1d1d' : '#fee2e2',
      color: theme === 'dark' ? '#ffffff' : '#991b1b',
      border: '1px solid #ef4444',
    },
    info: {
      background: theme === 'dark' ? '#1e3a8a' : '#dbeafe',
      color: theme === 'dark' ? '#ffffff' : '#1e40af',
      border: '1px solid #3b82f6',
    },
    warning: {
      background: theme === 'dark' ? '#78350f' : '#fef3c7',
      color: theme === 'dark' ? '#ffffff' : '#92400e',
      border: '1px solid #f59e0b',
    },
    loading: {
      background: theme === 'dark' ? '#374151' : '#f3f4f6',
      color: theme === 'dark' ? '#ffffff' : '#111827',
      border: '1px solid #6b7280',
    },
  };

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth: '24rem',
      width: 'calc(100% - 2rem)',
    }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            animation: 'toast-in 0.3s ease',
            ...styles[toast.type],
          }}
        >
          {icons[toast.type]}
          <span>{toast.message}</span>
        </div>
      ))}

      <style jsx>{`
        @keyframes toast-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}