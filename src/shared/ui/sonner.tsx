"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react";
import { Loader } from "./loader";
import { cn } from "@/shared/lib/utils";

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastListeners: ((toast: Toast) => void)[] = [];

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
  loading: (message: string) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(7),
      message,
      type: 'loading',
    };
    toastListeners.forEach(listener => listener(newToast));
  },
};

export function SimpleToaster({ position = 'bottom-right' }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
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

  const toastStyles: Record<ToastType, string> = {
    success: theme === 'dark'
      ? 'bg-emerald-900 text-white border-emerald-500'
      : 'bg-emerald-50 text-emerald-900 border-emerald-500',
    error: theme === 'dark'
      ? 'bg-red-900 text-white border-red-500'
      : 'bg-red-50 text-red-900 border-red-500',
    info: theme === 'dark'
      ? 'bg-blue-900 text-white border-blue-500'
      : 'bg-blue-50 text-blue-900 border-blue-500',
    warning: theme === 'dark'
      ? 'bg-amber-900 text-white border-amber-500'
      : 'bg-amber-50 text-amber-900 border-amber-500',
    loading: theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-600'
      : 'bg-gray-50 text-gray-900 border-gray-400',
  };

  const positions = {
    'top-left': 'top-4 left-4 items-start',
    'top-right': 'top-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'bottom-right': 'bottom-4 right-4 items-end',
  };

  return (
    <div className={cn(
      'fixed z-[9999] flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)]',
      positions[position],
    )}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
            'shadow-lg border animate-toast-in',
            toastStyles[toast.type],
          )}
        >
          {icons[toast.type]}
          <span>{toast.message}</span>
        </div>
      ))}

      <style jsx>{`
        @keyframes toast-in {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}